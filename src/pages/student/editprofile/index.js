import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Navbar, Footer } from "./../../../components";
import { BsCheck2Circle } from "react-icons/bs";
import { MdEmail, MdArrowForwardIos } from "react-icons/md";
import { MultiSelect } from "react-multi-select-component";
import { useRouter } from "next/router";
import { withRole } from '../../../utils/withAuthorization';
import { connect } from "react-redux";
import { fetchUser } from "../../../store/actions/userActions";
import axios from "axios"
import styles from "../../../styles/Home.module.css"


function EditProfile({ userInfo, loading, error, fetchUser }) {
  const [selected, setSelected] = useState([]);
  const [grade, setGrade] = useState('');
  const [parent1,setParent1] = useState('');
  const [parent2, setParent2] = useState('');
  const [courses, setCourses] = useState([]);
  const [lang, setLang] = useState([]);
  
  const [selectedCourses,   setSelectedCourses] = useState([]);
  const [selectedLang, setSelectedLang] = useState([]);

  let isValidForm = selectedCourses.length > 0 && selectedLang.length > 0 && grade && parent1 && parent2 
  
  const navigation = useRouter();
  // const onSaveProfile = () => {
  //   navigation.push("/student/settingprofile")
  // }


  const handleSubmit =async () => {
    const aa = [];
    const ln = [];

    selectedLang.forEach(v=>{
      ln.push(v.value)
    })
    selectedCourses.forEach(v=>{
      aa.push({courseId: v.value, proficiencyId: v.proficiencyId.id})
    })
    try {
      var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
      const response = await axios.put(
        "http://34.227.65.157/user/student/update",
        {
          userId: userInfo.id,
          email: userInfo.email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          address1: userInfo.address1,
          address2:userInfo.address2,
          country: userInfo.country,
          state: userInfo.state,
          city: userInfo.city,
          zipCode: userInfo.zipCode,
          savePaymentFutureUse: userInfo.savePaymentFutureUse,
          // Here is hardcoded
          whoPaysEmail: 'dileepwork8@gmail.com',
          emailParent1: parent1,
          emailParent2: parent2,
          gradeId: grade,
          courseOfInterestAndProficiency: aa,
          languagePreferencesId: ln,
        },
        {
          headers: {
            Authorization: `Bearer ${typ.accessToken}`,
        },
        }
      );
      // console.log(response);
      // setCountries(response.data);
      navigation.push("/student/settingprofile")
    } catch (error) {
      // console.error(error);
    }
  }

  const handleLangSelectChange = (selected) => {
    setSelectedLang(
      selected && selected.map((option) => ({
        label: option.label,
        value: option.value,
        proficiencyId: {id: 1, name: 'Beginner'}
      }))
    )
  };


  const handleCourseSelectChange = (selected) => {
    setSelectedCourses(
      selected && selected.map((option) => ({
        label: option.label,
        value: option.value,
        proficiencyId: {id: 1, name: 'Beginner'}
      }))
    );
  };
  
  const handleAddOrUpdate = (id, newData) => {
    // Check if the ID exists in the data array
    const dataIndex = selectedCourses.findIndex(
      (item) => item.courseId === id
    );

    // if (dataIndex === -1) {
    //   // ID not found, add the new data to the array
    //   setSelectedCourses([
    //     ...selectedCourses,
    //     { id, ...newData },
    //   ]);
    // } else {
      // ID found, update the data at the specified index
      const updatedData = [...selectedCourses];
      updatedData[dataIndex] = { ...updatedData[dataIndex], ...newData };
      setSelectedCourses(updatedData);
    // }

  };
  console.log(selectedCourses)
  console.log(selectedLang)


  const getLang = async () => {
    try {
      const response = await axios.get(
        `http://34.227.65.157/public/register/get-all-languages`
      );
      var arr = [];
      console.log(response.data)
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
    getCourses()
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);


  useEffect(() => {
    if (userInfo) {
      setGrade(userInfo?.grade.id)
      let lanArr = [];
      userInfo.languagePreference.forEach(v=>{
        lanArr.push({ value: v.id, label: v.name });
      });

      setSelectedLang(lanArr);

      let courseOfInterestAndProficiencyArr = [];
      userInfo.courseOfInterestAndProficiency.forEach(v=>{      
       courseOfInterestAndProficiencyArr.push({ 
        label: v.course.name,
        value: v.course.id,
        proficiencyId: v.proficiency
      });
      })
      setSelectedCourses(courseOfInterestAndProficiencyArr)
      // console.log(courseOfInterestAndProficiencyArr)

      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setAddress1(userInfo.address1);
      setAddress2(userInfo.address2);
      setSelectedCountry(userInfo.country);
      setSelectedState(userInfo.state);
      setSelectedCity(userInfo.city);
      setZipCode(userInfo.zipCode);
      setDependents(userInfo.dependents)
    }
  }, [userInfo]);
  console.log(userInfo)

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

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
          style={{ minHeight: "90vh", maxWidth: "1700px", margin: "auto" }}
        >
          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="shadow rounded-10 bg-white py-4">
                <div className="px-4">
                  <h5 className="fw-bold py-3">{userInfo?.firstName} {userInfo?.lastName}</h5>

                  <p className="w-75 bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                    <MdEmail style={{ fontSize: "22px" }} />
                    {userInfo?.email}
                  </p>

                  <p className="p-0 m-0 py-2 fw-bold">Parent1/guardian1</p>

                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="Parent1/guardian1"
                    value={parent1}
                    onChange={(e)=>setParent1(e.target.value)}
                  />
                  <p className="p-0 m-0 py-2 fw-bold">Parent2/guardian2</p>
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="Parent2/guardian2"
                    value={parent2}
                    onChange={(e)=>setParent2(e.target.value)}
                  />
                  <hr className="bg_secondary" />

                  <div></div>

                  <div className="d-flex gap-2 justify-content-center py-3">
                    <button 
                      className="px-4 btn btn-success text-light p-2 rounded fw-bold d-flex align-items-center justify-content-center gap-2" 
                      onClick={()=> handleSubmit()}
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
                  <div className="col-12 col-md-6">
                    <h4 className="fw-bold">Grade:</h4>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="1"
                        id="flexCheckDefault"
                        name="grades"
                        checked={grade == 1}
                        onChange={(e)=> setGrade(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
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
                        onChange={(e)=> setGrade(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Middle School &#40;&#60;11yrs - 13yrs&#41;
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
                        onChange={(e)=> setGrade(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        High School &#40;&#60;14yrs - 18yrs&#41;
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
                        onChange={(e)=> setGrade(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="flexCheckChecked">
                        College & Beyond &#40;&gt;18yrs&#41;
                      </label>
                    </div>
                  </div>
                  {/* <div className="col-12 col-md-4 border-start px-4 border_primary">
                    <h4 className="fw-bold">Delivery Mode:</h4>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        In person
                      </label>
                    </div>{" "}
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Online
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>

            <div className="shadow rounded-10 pt-2 pb-5 bg-white my-4">
                <div className="p-4 w-50 m-auto">
                  <h4 className="fw-bold m-0 p-0 pb-3 text-center">
                    Languages List
                  </h4>

                  <MultiSelect
                      options={lang}
                      value={selectedLang}
                      onChange={handleLangSelectChange}
                      labelledBy={"Select Lang"}
                      isCreatable={true}
                      hasSelectAll={false}
                    />
                </div>

                <div className="row m-0 p-0 w-100">
                  <div className="col d-flex justify-content-center">
                    <h4 className="fw-bold m-0 p-0">Langs</h4>
                  </div>
                  <div className="col d-flex justify-content-start">
                    <h4 className="fw-bold m-0 p-0">Proficiency</h4>
                  </div>

                  
                  <div className="container">
                    <div className="row d-flex justify-content-center py-4">

                    {
                      selectedLang.map((v,ind)=>{
                        return (
                          <>
                            <div className="col-md-4 item">
                              {/* <MdArrowForwardIos className="text_primary h4 p-0 m-0" /> */}
                              <li className="fw-bold m-0 p-0 h5 fw-lighter">{v.label}</li>
                            </div>
                            <div className="col-md-4 item">
                              <select className="w-100 p-2 rounded outline-0 border border_gray" value={v.proficiencyId.id} onChange={(e) => {
                                const selectedProficiencyId = Number(e.target.value);
                                const selectedProficiencyName = e.target.selectedOptions[0].label;

                                const updatedLangs = selectedLang.map((lang) => {
                                  if (lang.value === v.value) {
                                    return {
                                      ...lang,
                                      proficiencyId: { id: selectedProficiencyId, name: selectedProficiencyName },
                                    };
                                  }
                                  return lang;
                                });

                                setSelectedLang(updatedLangs)
                                // console.log(updatedLangs)
                              }}>
                                <option value={1}>Beginner</option>
                                <option value="2">Intermediate</option>
                                <option value={3}>Semi-Expert</option>
                              </select>
                            </div>
                        </>
                      )})
                    }
                    </div>
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
                      labelledBy={"Select Course"}
                      isCreatable={true}
                      hasSelectAll={false}
                    />
                </div>

                <div className="row m-0 p-0 w-100">
                  <div className="col d-flex justify-content-center">
                    <h4 className="fw-bold m-0 p-0">Courses</h4>
                  </div>
                  <div className="col d-flex justify-content-start">
                    <h4 className="fw-bold m-0 p-0">Proficiency</h4>
                  </div>

                  
                  <div className="container">
                    <div className="row d-flex justify-content-center py-4">

                    {
                      selectedCourses.map((v,ind)=>{
                        return (
                          <>
                            <div className="col-md-4 item">
                              {/* <MdArrowForwardIos className="text_primary h4 p-0 m-0" /> */}
                              <li className="fw-bold m-0 p-0 h5 fw-lighter">{v.label}</li>
                            </div>
                            <div className="col-md-4 item">
                              <select className="w-100 p-2 rounded outline-0 border border_gray" value={v.proficiencyId.id} onChange={(e) => {
                                const selectedProficiencyId = Number(e.target.value);
                                const selectedProficiencyName = e.target.selectedOptions[0].label;

                                const updatedCourses = selectedLang.map((lang) => {
                                  if (lang.value === v.value) {
                                    return {
                                      ...lang,
                                      proficiencyId: { id: selectedProficiencyId, name: selectedProficiencyName },
                                    };
                                  }
                                  return lang;
                                });

                                setSelectedLang(updatedCourses)
                                // console.log(updatedLangs)
                              }}>
                                <option value={1}>Beginner</option>
                                <option value="2">Intermediate</option>
                                <option value={3}>Semi-Expert</option>
                              </select>
                            </div>
                        </>
                      )})
                    }
                    </div>
                  </div>
                  
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

export default withRole(connect(mapStateToProps, { fetchUser })(EditProfile), ['Student']);

