import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Navbar, Footer } from './../../../components';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdEmail, MdArrowForwardIos } from 'react-icons/md';
import { MultiSelect } from 'react-multi-select-component';
import { useRouter } from 'next/router';
import { withRole } from '../../../utils/withAuthorization';
import { connect } from 'react-redux';
import { fetchUser } from '../../../store/actions/userActions';
import axios from 'axios';
import styles from '../../../styles/Home.module.css';
import { apiClient } from '../../../api/client';

function EditProfile({ userInfo, loading, error, fetchUser }) {
  const [selected, setSelected] = useState([]);
  const [grade, setGrade] = useState('');
  const [parent1, setParent1] = useState('');
  const [parent2, setParent2] = useState('');
  const [courses, setCourses] = useState([]);
  const [lang, setLang] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [dependents, setDependents] = useState([]);
  const [selectedLang, setSelectedLang] = useState([]);
  const [proficiency, setProficiency] = useState([]);

  let isValidForm =
    selectedCourses.length > 0 && selectedLang.length > 0 && grade;

  const navigation = useRouter();
  // const onSaveProfile = () => {
  //   navigation.push("/student/settingprofile")
  // }
  useEffect(() => {
    console.log(parent1, parent2);
  }, [parent1, parent2]);

  const handleSubmit = async () => {
    const aa = [];
    const ln = [];

    selectedLang.forEach((v) => {
      ln.push(v.value);
    });
    selectedCourses.forEach((v, i) => {
      aa.push({ courseId: v.value, proficiencyId: v.proficiencyId.id });
    });
    try {
      const response = await apiClient.put('/user/student/update', {
        userId: userInfo.id,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        address1: userInfo.address1,
        address2: userInfo.address2,
        country: userInfo.country,
        state: userInfo.state,
        city: userInfo.city,
        zipCode: userInfo.zipCode,
        savePaymentFutureUse: userInfo.savePaymentFutureUse,
        // Here is hardcoded
        whoPaysEmail: userInfo.email,
        emailParent1: parent1 ?? '',
        emailParent2: parent2 ?? '',
        gradeId: grade,
        courseOfInterestAndProficiency: aa,
        languagePreferencesId: ln,
      });
      console.log(response);
      // setCountries(response.data);
      navigation.push('/student/settingprofile');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLangSelectChange = (selected) => {
    setSelectedLang(
      selected &&
        selected.map((option) => ({
          label: option.label,
          value: option.value,
          proficiencyId: { id: 1, name: 'Beginner' },
        }))
    );
  };

  // const handleCourseSelectChange = (selected) => {
  //   setSelectedCourses(
  //     selected &&
  //       selected.map((option) => ({
  //         label: option.label,
  //         value: option.value,
  //         proficiencyId: { id: 1, name: 'Beginner' },
  //       }))
  //   );
  // };

  const handleCourseSelectChange = (selected) => {
    setSelectedCourses((prevSelectedCourses) =>
      selected.map((option) => {
        const existingCourse = prevSelectedCourses.find(
          (course) => course.value === option.value
        );
        return {
          label: option.label,
          value: option.value,
          proficiencyId: existingCourse
            ? existingCourse.proficiencyId
            : { id: 1, name: 'Beginner' },
        };
      })
    );
  };

  console.log(selectedCourses);
  console.log(selectedLang);

  const getLang = async () => {
    try {
      const response = await axios.get(
        `http://34.227.65.157/public/register/get-all-languages`
      );
      var arr = [];
      console.log(response.data);
      response.data.map((v) => {
        arr.push({ value: v.id, label: v.name });
      });
      setLang(arr);
    } catch (error) {
      console.error(error);
    }
  };

  const getCourses = async () => {
    try {
      const response = await axios.get(
        `http://34.227.65.157/public/course/get-all-courses`
      );

      var technologyList = [];

      response.data.map((v) => {
        technologyList.push({ value: v.id, label: v.name });
      });
      console.log(technologyList);
      setCourses(technologyList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLang();
    getCourses();
    getProficiency();
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (userInfo) {
      setGrade(userInfo?.grade.id);
      let lanArr = [];
      userInfo.languagePreference.forEach((v) => {
        lanArr.push({ value: v.id, label: v.name });
      });

      setSelectedLang(lanArr);

      let courseOfInterestAndProficiencyArr = [];
      userInfo.courseOfInterestAndProficiency.forEach((v) => {
        courseOfInterestAndProficiencyArr.push({
          label: v.course.name,
          value: v.course.id,
          proficiencyId: v.proficiency,
        });
      });
      setSelectedCourses(courseOfInterestAndProficiencyArr);
      // console.log(courseOfInterestAndProficiencyArr)

      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setAddress1(userInfo.address1);
      setAddress2(userInfo.address2);
      setSelectedCountry(userInfo.country);
      setSelectedState(userInfo.state);
      setSelectedCity(userInfo.city);
      setZipCode(userInfo.zipCode);
      setDependents(userInfo.dependents);
      setParent1(userInfo.parents[0]?.email);
      setParent2(userInfo.parents[1]?.email);
    }
  }, [userInfo]);
  console.log(userInfo);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // const handleProficiencySelection = (e, i) => {
  //   setSelectedCourses((prevData) => {
  //     const newData = [...prevData];
  //     // newData[optionIndex].proficiencies = selectedOptions;
  //     console.log('newData:', newData);
  //     return newData;
  //   });
  // };

  const handleProficiencySelection = (e, i) => {
    const { value } = e.target;

    const proficiencyIdMap = {
      Beginner: 1,
      Intermediate: 2,
      'Semi-expert': 3,
    };

    setSelectedCourses((prevCourses) => {
      const newCourses = [...prevCourses];
      newCourses[i].proficiencyId.id = proficiencyIdMap[value];
      newCourses[i].proficiencyId.name = value;
      console.log('bo', selectedCourses);
      return newCourses;
    });
  };

  const getProficiency = async () => {
    try {
      const response = await apiClient.get(
        `/public/course/get-all-proficiencies`
      );
      var arr = [];
      response.data.map((v) => {
        arr.push({ value: v.id, label: v.name });
      });
      arr.sort((a, b) => {
        const proficiencyOrder = {
          Beginner: 0,
          Intermediate: 1,
          'Semi-expert': 2,
        };
        return proficiencyOrder[a.label] - proficiencyOrder[b.label];
      });
      setProficiency(arr);
    } catch (error) {
      console.error(error);
    }
  };

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
      <Navbar isLogin={true} />
      <main className="container-fluid">
        <div
          className={`p-5 ${styles.editProfileWrapper}`}
          style={{ minHeight: '90vh', maxWidth: '1700px', margin: 'auto' }}
        >
          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="shadow rounded-10 bg-white py-4">
                <div className="px-4">
                  <h5 className="fw-bold py-3">
                    {userInfo?.firstName} {userInfo?.lastName}
                  </h5>

                  <p className="w-75 bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                    <MdEmail style={{ fontSize: '22px' }} />
                    {userInfo?.email}
                  </p>

                  <p className="p-0 m-0 py-2 fw-bold">Parent1/guardian1</p>
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="Parent1/guardian1"
                    value={parent1}
                    onChange={(e) => setParent1(e.target.value)}
                  />
                  <p className="p-0 m-0 py-2 fw-bold">Parent2/guardian2</p>
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="Parent2/guardian2"
                    value={parent2}
                    onChange={(e) => setParent2(e.target.value)}
                  />
                  <hr className="bg_secondary" />

                  <div></div>

                  <div className="d-flex gap-2 justify-content-center py-3">
                    <button
                      className="px-4 btn btn-success text-light p-2 rounded fw-bold d-flex align-items-center justify-content-center gap-2"
                      onClick={() => handleSubmit()}
                      disabled={!isValidForm}
                    >
                      <BsCheck2Circle className="h3 m-0 p-0" /> Save Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8 py-2">
              <div className="shadow rounded-10 p-5 bg-white">
                <div className="row">
                  <div className="col">
                    <h4 className="fw-bold">Grade:</h4>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="1"
                        id="flexCheckDefault"
                        name="grades"
                        checked={grade == 1}
                        onChange={(e) => setGrade(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Elementry &#40;&#60;10yrs&#41;
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="2"
                        id="flexCheckDefault"
                        name="grades"
                        checked={grade == 2}
                        onChange={(e) => setGrade(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Middle School &#40;11yrs - 13yrs&#41;
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="3"
                        id="flexCheckDefault"
                        name="grades"
                        checked={grade == 3}
                        onChange={(e) => setGrade(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        High School &#40;14yrs - 18yrs&#41;
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="4"
                        id="flexCheckChecked"
                        name="grades"
                        checked={grade == 4}
                        onChange={(e) => setGrade(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        College & Beyond &#40;&gt;18yrs&#41;
                      </label>
                    </div>
                  </div>
                  <div className="col tw-max-w-[40%] border-start px-4 border_primary">
                    <h4 className="fw-bold">Languages Preference:</h4>
                    <MultiSelect
                      options={lang}
                      value={selectedLang}
                      onChange={handleLangSelectChange}
                      labelledBy={'Select Lang'}
                      isCreatable={true}
                      hasSelectAll={false}
                    />

                    <ul className="m-0 primary-list">
                      {selectedLang.map((v, ind) => {
                        return <li className="fw-bold m-0 p-0">{v.label}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="shadow rounded-10 pt-2 pb-5 bg-white my-4">
                <div className="p-4 w-50 m-auto">
                  <h4 className="fw-bold m-0 p-0 pb-3 text-center">
                    Courses List
                  </h4>

                  <MultiSelect
                    options={courses}
                    value={selectedCourses}
                    onChange={handleCourseSelectChange}
                    labelledBy={'Select Course'}
                    isCreatable={true}
                    hasSelectAll={false}
                  />
                </div>

                <div className="row m-0 p-0 w-75 d-flex mx-auto">
                  <div className="col ">
                    <h4 className="fw-bold m-0 p-0">Courses</h4>
                  </div>
                  <div className="col tw-ml-60">
                    <p className="fw-bold h5 m-0 p-0">Proficiency</p>
                  </div>
                  {selectedCourses.map((v, i) => {
                    return (
                      <div className="">
                        <div className="row m-0 pl-0 pt-3">
                          <div className="col d-flex align-items-center gap-2 primary-list">
                            <li className="fw-bold m-0 p-0 fw-lighter">
                              {v.label}
                            </li>
                          </div>
                          <div className="col-md-4 item">
                            <select
                              className="w-100 p-2 rounded outline-0 border border_gray"
                              value={v.proficiencyId.name}
                              onChange={(e) => handleProficiencySelection(e, i)}
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Semi-expert">Semi-expert</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {/* </div>
                  </div> */}
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
  'Student',
]);
