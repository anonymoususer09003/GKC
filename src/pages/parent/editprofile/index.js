import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ParentNavbar, Footer } from './../../../components';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdEmail, MdDelete } from 'react-icons/md';
import { withRole } from '../../../utils/withAuthorization';
import { connect } from 'react-redux';
import { fetchUser } from '../../../store/actions/userActions';
import { useRouter } from 'next/router';
import { apiClient } from '../../../api/client';

function EditProfile({ userInfo, loading, error, fetchUser }) {
    //protection starts
    const nav = useRouter()
    // checking if user logged in starts
      if(typeof window !== 'undefined'){ // here we check if global object successfully loaded
        console.log('lol')
        useEffect(()=>{

          if(JSON.parse(window.localStorage.getItem('gkcAuth')).role === undefined) { //here we check if user signed in
            nav.push('/') 
          } else{
            if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Instructor') { //here we check if user has role Instructor
              nav.push('/')
            }
          }

        },[])
      }
    // checking if user logged in ends

    //protection ends
  const navigation = useRouter();

  const [updated, setUpdated] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [newDependentEmail, setNewDependentEmail] = useState('');
  const [dependents, setDependents] = useState([]);
  const [dependentsEmails, setDependentsEmails] = useState([]);
  const [dependentsEmailsAfterDelete, setDependentsEmailsAfterDelete] =
    useState([]);

  const handleSubmit = async () => {
    try {
      const response = await apiClient.put('/user/parent/update', {
        userId: userInfo.id,
        firstName: firstName,
        lastName: lastName,
        email: userInfo.email,
        address1: address1,
        address2: address2,
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        zipCode: zipCode,
        dependentsId: dependents,
      });
      console.log(response);
      navigation.push('/parent/settingprofile');
      // setCountries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCountries = async () => {
    try {
      const response = await apiClient.get('/public/location/get-countries');
      console.log(response.data);
      setCountries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getStates = async () => {
    try {
      const response = await apiClient.get(
        `/public/location/get-states?countryName=${selectedCountry}`
      );
      setStates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCities = async () => {
    try {
      const response = await apiClient.get(
        `/public/location/get-cities?countryName=${selectedCountry}&stateName=${selectedState}`
      );
      setCities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setAddress1(userInfo.address1);
      setAddress2(userInfo.address2);
      setSelectedCountry(userInfo.country);
      setSelectedState(userInfo.state);
      setSelectedCity(userInfo.city);
      setZipCode(userInfo.zipCode);
      setDependents(userInfo.dependents);
    }
  }, [userInfo]);

  useEffect(() => {
    getCountries();
    getStates();
    getCities();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      getCities();
    }
  }, [selectedState]);

  useEffect(() => {
    const emailArray = [];
    userInfo?.dependents.forEach((item) => {
      const email = item.email;
      emailArray.push(email);
    });
    setDependentsEmails(emailArray);
  }, [userInfo]);

  const handleDependentEmailChange = (e) => {
    setNewDependentEmail(e.target.value);
  };

  const addDependent = async () => {
    try {
      const response = await apiClient.put('/user/parent/update', {
        userId: userInfo.id,
        firstName: firstName,
        lastName: lastName,
        address1: address1,
        address2: address2,
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        zipCode: zipCode,
        savePaymentFutureUse: true,
        dependentsEmail: [...dependentsEmails, newDependentEmail],
      });
      setNewDependentEmail('');
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDependent = (dependentEmail) => {
    const updatedDependentsEmails = dependentsEmails.filter(
      (email) => email !== dependentEmail
    );
    setDependentsEmailsAfterDelete(updatedDependentsEmails);
  };

  useEffect(() => {
    handleDeleteDependent();
  }, [dependentsEmailsAfterDelete]);

  const handleDeleteDependent = async () => {
    try {
      const response = await apiClient.put('/user/parent/update', {
        userId: userInfo.id,
        firstName: firstName,
        lastName: lastName,
        address1: address1,
        address2: address2,
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        zipCode: zipCode,
        savePaymentFutureUse: true,
        dependentsEmail: dependentsEmailsAfterDelete,
      });
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <Head>
        <title>Profile Edit Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParentNavbar isLogin={true} />
      <main className="container-fluid">
        <div
          className="p-5 "
          style={{ minHeight: '90vh', maxWidth: '1700px', margin: 'auto' }}
        >
          <div className="row">
            <div className="col-4">
              <div className="shadow rounded-10 bg-white py-4">
                <div className="px-4">
                  {/* <h5 className="fw-bold py-3">John Doe</h5> */}

                  <p className="w-75 bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                    <MdEmail style={{ fontSize: '22px' }} />
                    {userInfo?.email}
                  </p>

                  <div className="d-flex align-items-center gap-3 py-2">
                    <input
                      type="text"
                      className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />

                    <input
                      type="text"
                      className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <p className="p-0 m-0 py-2 fw-bold">Address 1</p>

                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="1234, Smith Street"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                  <p className="p-0 m-0 py-2 fw-bold">Address 2</p>
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="Apt. 2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />

                  <div className="d-flex align-items-center gap-3 py-2">
                    <select
                      className="w-25 flex-fill p-2 rounded outline-0 border border_gray "
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                      <option>Select Country</option>
                      {countries.map((v, i) => {
                        return (
                          <option value={v.name} key={i}>
                            {v.name}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      className="w-25 flex-fill p-2 rounded outline-0 border border_gray "
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                    >
                      <option>Select State</option>
                      {states.map((v, i) => {
                        return (
                          <option value={v.name} key={i}>
                            {v.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="d-flex align-items-center gap-3 py-2">
                    <select
                      className="w-25 flex-fill p-2 rounded outline-0 border border_gray "
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option>Select City</option>
                      {cities.map((v, i) => {
                        return (
                          <option value={v.name} key={i}>
                            {v.name}
                          </option>
                        );
                      })}
                    </select>

                    <input
                      type="text"
                      className="w-25 flex-fill p-2 rounded outline-0 border border_gray "
                      placeholder="Zip/State Code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <hr className="bg_secondary" />

                  <div></div>

                  <div className="d-flex gap-2 justify-content-center py-3">
                    <button
                      className="px-4 btn btn-success text-light p-2 rounded fw-bold d-flex align-items-center justify-content-center gap-2"
                      onClick={() => handleSubmit()}
                    >
                      <BsCheck2Circle className="h3 m-0 p-0" /> Save Profile
                    </button>
                    <a
                      href="/parent/settingprofile"
                      className="px-4 btn btn-dark text-light p-2 rounded fw-bold d-flex align-items-center justify-content-center gap-2"
                      onClick={() => handleSubmit()}
                    >
                      Exit
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="shadow tw-flex tw-items-start rounded-10 p-5 bg-white">
                <div className="col px-4 border_primary">
                  <h4 className="fw-bold">Dependents:</h4>
                  <div className="mt-4 w-50">
                    {dependents.length == 0 ? (
                      <div>
                        <p className="fw-bold tw-w-80">
                          You currently don't have any dependent added
                        </p>
                      </div>
                    ) : (
                      dependents?.map((dependent, index) => {
                        return (
                          <div
                            key={index}
                            className="d-flex justify-content-between my-2"
                          >
                            <p className="p-0 m-0">
                              <span className="me-3">Name:</span>
                              <span className="me-2">
                                {dependent.firstName}
                              </span>
                              <span>{dependent.lastName}</span>
                            </p>
                            <MdDelete
                              role="button"
                              onClick={() => deleteDependent(dependent.email)}
                              style={{ fontSize: '24px' }}
                            />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
                <div className="tw-flex tw-flex-col">
                  <button
                    onClick={() => {
                      addDependent();
                    }}
                    className="btn_primary p-1 fw-bold text-white rounded text-decoration-none"
                  >
                    Add dependent
                  </button>
                  <input
                    value={newDependentEmail}
                    onChange={(e) => handleDependentEmailChange(e)}
                    placeholder="Enter email address"
                    className="mt-3 fw-bold border-2 border-dark p-1"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  loading: state.user.loading,
  error: state.user.error,
});

export default withRole(connect(mapStateToProps, { fetchUser })(EditProfile), [
  'Parent',
]);
