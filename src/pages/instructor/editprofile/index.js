import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar, TutorNavbar, Footer } from "../../../components";
import { MdEmail, MdLocationOn, MdArrowForwardIos } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import Image from "next/image";
import { MultiSelect } from "react-multi-select-component";
import {useRouter} from "next/router"
import { withRole } from '../../../utils/withAuthorization';
import { connect } from "react-redux";
import { fetchUser } from "../../../store/actions/userActions";
import axios from "axios"

 function EditProfile({ userInfo, loading, error, fetchUser }) {
   const navigation = useRouter();
  const options = [
    { label: "Grapes ", value: "grapes" },
    { label: "Mango ", value: "mango" },
    { label: "Strawberry ", value: "strawberry" },
    { label: "Watermelon ", value: "watermelon" },
    { label: "Pear ", value: "pear", disabled: true },
    { label: "Apple ", value: "apple" },
    { label: "Tangerine ", value: "tangerine" },
    { label: "Pineapple ", value: "pineapple" },
    { label: "Peach ", value: "peach" },
  ];
 
  const [selected, setSelected] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [bio, setBio] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [deliveryModes, setDeliveryModes] = useState([]);
  const [acceptInterviewRequest, setAcceptInterviewRequest] = useState(false);
  const [grades, setGrades] = useState([]);
  const [proficiency, setProficiency] = useState([]);
  
  const [courses,   setCourses] = useState([]);
  const [lang, setLang] = useState([]);
  
  
  const [selectedCourses, setSelectedCourses] = useState([])
  const [selectedLang, setSelectedLang] = useState([]);

  // const [hourlyRate, setHourlyRate] = useState('');

  const onContinue = () => {
    navigation.push("/instructor/settingprofile")
  }


  const handleSelectChange = (selected) => {
    setSelectedCourses(
      selected && selected.map((option) => ( {
        label: option.label,
        value: option.value,
        proficiencies: [{value: 1, label: 'Beginner'}]
      }))
    );

    console.log(selectedCourses)
  };
  

  const handleSelection = (selectedOptions, optionIndex) => {
    setSelectedCourses((prevData) => {
      const newData = [...prevData];
      newData[optionIndex].proficiencies = selectedOptions;
      return newData;
    });

    console.log(selectedCourses)
  };


  const handleCheckboxChange = (event) => {
    const itemId = parseInt(event.target.value);
    const updatedItems = deliveryModes.map((item) => {
      if (item.id === itemId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setDeliveryModes(updatedItems);
    console.log(deliveryModes)
  };

  const handleChangeGrade = (event) => {
    const itemId = parseInt(event.target.value);
    const updatedItems = grades.map((item) => {
      if (item.id === itemId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setGrades(updatedItems);
  };

  const onSubmit =async () => {
    var modes = [];
    deliveryModes.map((v) => {
      if(v.checked){
        modes.push(v.label);
      }
    });

    var langs= [];
    selectedLang.map((v) => {
      langs.push(v.value);
    });

    var course = [];
    selectedCourses.map((v) => {
      course.push({courseId: v.value,  proficienciesId:  v.proficiencies.map(val=>{
        return val.value
       })   });
    });

    var gradess = [];
    grades.map((v) => {
      if(v.checked){
        gradess.push(v.id);
      }
    });


    console.log(course)
    console.log(
      {
          userId: userInfo.id,
          firstName: firstName,
          lastName: lastName,
          email: userInfo.email,
          address1: address1,
          address2: address2,
          country: userInfo.country,
          state: userInfo.state,
          city: userInfo.city,
          zipCode: userInfo.zipCode,
          instructorBio: bio,
          hourlyRate: hourlyRate,
          acceptInterviewRequest: acceptInterviewRequest == 'Yes' ? true : false,
          deliveryModes: modes,
          gradesIdToTutor: gradess,
          languagesIdPreference: langs,
          courseToTeachAndProficiency: course,
      },
    )
    try {
      var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
      const response = await axios.put(
        "http://34.227.65.157/user/instructor/update",
        {
          userId: userInfo.id,
          firstName: firstName,
          lastName: lastName,
          email: userInfo.email,
          address1: address1,
          address2: address2,
          country: userInfo.country,
          state: userInfo.state,
          city: userInfo.city,
          zipCode: userInfo.zipCode,
          instructorBio: bio,
          hourlyRate: hourlyRate,
          acceptInterviewRequest: acceptInterviewRequest == 'Yes' ? true : false,
          deliveryModes: modes,
          gradesIdToTutor: gradess,
          languagesIdPreference: langs,
         courseToTeachAndProficiency: course,
        },
        {
          headers: {
            Authorization: `Bearer ${typ.accessToken}`,
        },
        }
      );
      console.log(response);
      navigation.push("/instructor/settingprofile")
    } catch (error) {
      console.error(error);
    }
  }
  const getLang = async () => {
    try {
      const response = await axios.get(
        `http://34.227.65.157/language/with-instructors`
      );
      var arr = [];
      response.data.map((v) => {
        arr.push({ value: v.id, label: v.name });
      });

      console.log(response)
      setLang(arr);
    } catch (error) {
      console.error(error);
    }
  };


  const getCourses = async () => {
    try {
      const response = await axios.get(
        `http://34.227.65.157/public/course/with-instructors`
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

  const getProficiency = async () => {
    try {
      const response = await axios.get(
        `http://34.227.65.157/public/course/get-all-proficiencies`
      );
      var arr = [];
      response.data.map((v) => {
        arr.push({ value: v.id, label: v.name });
      });
      setProficiency(arr);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLang();
    getCourses();
    getProficiency()
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  

  useEffect(() => {
    if (userInfo) {
      setHourlyRate(userInfo.hourlyRate);
      setBio(userInfo.instructorBio);
      setAcceptInterviewRequest(userInfo.acceptInterviewRequest ? 'Yes' : 'No');
      let lanArr = [];
      userInfo.languagePreference.forEach(v=>{
        lanArr.push({ value: v.id, label: v.name });
      });
      
      setSelectedLang(lanArr);

      let delArr = [];
      userInfo.deliveryModes.forEach(v=>{
        delArr.push({ value: v.id, label: v.name, checked: false });
      });
      console.log(delArr);

      let courseArr = [];
      userInfo?.coursesToTutorAndProficiencies.forEach(v=>{
       let avalue = v.course.id
       let alabel = v.course.name;

       let prof = [];
       v.proficiencies.forEach(val=>{
        prof.push({value: val.id, label: val.name})
       })

        courseArr.push({ value: avalue, label: alabel, proficiencies: prof });
      });
      setSelectedCourses(courseArr);
      console.log(courseArr)
      setFirstName(userInfo.firstName)
      setLastName(userInfo.lastName)
      setAddress1(userInfo.address1)
      setAddress2(userInfo.address2)


      let modes = [{checked: false, id  : 1,label: "In-Person"}, {checked  : false,   id :  2, label  : "Online"}]
      let delMode = [];
      userInfo.deliveryModes.forEach(v=>{
        delMode.push({ checked: true, id  : v.id,label   :   v.name})
      })

      const newArray = modes.map(item => {
        const matchingItem = delMode.find(elem => elem.id === item.id);
        if (matchingItem) {
          return matchingItem; // Replace the item from array2
        } else {
          return item; // Keep the item from array1
        }
      });
      
      console.log(newArray);

      setDeliveryModes(newArray);
    

      let gradess = [{checked: false, id  : 1,label: "Elementary <10yrs"}, {checked  : false,   id :  2, label  : "Middle School <10yrs - 13yrs"}, {checked  : false,   id :  3, label  : "High School <14yrs - 16yrs"},{checked  : false,   id : 4, label  : "College & Beyond >18yrs"}]
      let selectGrades = [];
      userInfo.gradesToTutor.forEach(v=>{
        selectGrades.push({ checked: true, id: v.id,label   :   v.name + " " + v.description})
      })
      const newGradesArray = gradess.map(item => {
        const matchingItem = selectGrades.find(elem => elem.id === item.id);
        if (matchingItem) {
          return matchingItem; // Replace the item from array2
        } else {
          return item; // Keep the item from array1
        }
      });
      
      setGrades(newGradesArray);

    }
  }, [userInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TutorNavbar isLogin={true} />
      <main className="container-fluid">
        <div
          className="p-5 "
          style={{ minHeight: "90vh", maxWidth: "1700px", margin: "auto" }}
        >
          <div className="row">
            <div className="col-12 col-md-3 position-relative">
              <div className="shadow rounded-10 bg-white py-4">
                <div className="px-4 ">
                  <div
                    className="bg_primary rounded-circle position-absolute d-flex justify-content-center align-items-center"
                    style={{ top: "-40px", width: "105px", height: "105px" }}
                  >
                    <Image
                      src="/assets/student-preview.png"
                      alt=""
                      width={100}
                      height={100}
                      priority
                      className="rounded-circle bg-light"
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <p className=" bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                      <MdEmail style={{ fontSize: "20px" }} />
                      {userInfo?.email}
                    </p>
                  </div>
                  <input type="text" className="border-0 h4 p-1 border-bottom w-100 mb-1" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                  <input type="text" className="border-0 h4 p-1 border-bottom w-100 mb-3"  value={lastName} onChange={(e)=> setLastName(e.target.value)}/>

                  <div className="d-flex gap-1 gap-2 pb-3 ">
                    <MdLocationOn className="h5 p-0 m-0" />
                    <input type="text" className="border-0 border-bottom w-100" value={address1} onChange={(e)=> setAddress1(e.target.value)} />
                  </div>
                    <input type="text" className="border-0 border-bottom w-100" value={address1} onChange={(e)=> setAddress1(e.target.value)} />
                  <hr className="bg_secondary" />
                  <h4 className="p-0 m-0 py-2 fw-bold">Bio</h4>
                  <div>
                  
                    <textarea  className="border-0 border-bottom w-100" rows="8" value={bio} onChange={(e)=> setBio(e.target.value)}>
               
                    </textarea>
                  </div>

                  <div className="d-flex gap-2 justify-content-center py-3 pt-5">
                    <button className="w-50 btn btn-success text-light p-2 rounded fw-bold d-flex align-items-center justify-content-center gap-2" onClick={()=> onSubmit()}>
                      <BsCheck2Circle /> Save Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="shadow rounded-10 p-5 bg-white">
                <div className="row">
                  <div className="col">
                    <h5 className="fw-bold ">Hourly Rate</h5>
                    <h2 className="fw-bold">
                    $<input type="text" value={hourlyRate} className="fw-bold border-0 border-bottom w-25" onChange={(e)=> setHourlyRate(e.target.value)} />       
                                 /hr</h2>
                  </div>

                  <div className="col-3 border-start px-4 border_primary">
                    <h5 className="fw-bold m-0 p-0">Delivery Mode:</h5>
                    {deliveryModes.map((v, i) => {
                      return (
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            value={v.id}
                            checked={v.checked}
                          />
                          <label
                            className="form-check-label fw-bold"
                            for="flexCheckDefault"
                          >
                            {v.label}
                          </label>
                        </div>
                      );
                    })}
                  
                  </div>

                  <div className="col-5 border-start px-4 border_primary">
                    <h5 className="fw-bold m-0 p-0">
                      Groups you have expertise to teach:
                    </h5>
                    {
                      grades.map((v,i)=> {
                        return  <div className="form-check pt-2" key={v.id}>
                      <input className="form-check-input" type="checkbox"  id="flexCheckChecked" checked={v.checked} value={v.id} onChange={handleChangeGrade}/>
                      <label className="form-check-label fw-bold" for="flexCheckChecked">
                      {v.label}
                      </label>
                    </div>
                      })
 }
                  </div>
                </div>
                <div className="row">
                  <div className="col pt-5">
                    <h5 className="fw-bold m-0 p-0">
                      Spoken Language Preference:
                    </h5>
                      <MultiSelect
                          options={lang}
                          value={selectedLang}
                          onChange={setSelectedLang}
                          labelledBy={"Select Language"}
                          isCreatable={true}
                        />
                  </div>

                  <div className="col pt-5">
                    <h5 className="fw-bold m-0 p-0">
                      Accept Interview Request
                    </h5>
                    <div className="d-flex gap-4 py-2">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={acceptInterviewRequest === 'No'} value='No' onChange={(e)=> setAcceptInterviewRequest(e.target.value)}/>
                      <label className="form-check-label" for="flexRadioDefault1" >
                      No
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={acceptInterviewRequest === 'Yes'}  value='Yes' onChange={(e)=> setAcceptInterviewRequest(e.target.value)}/>
                      <label className="form-check-label" for="flexRadioDefault2">
                      Yes
                      </label>
                    </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shadow rounded-10 p-5 bg-white  my-4">

              <div className="p-4 w-50 m-auto">
                  <h4 className="fw-bold m-0 p-0 pb-3 text-center">
                    Course List:
                  </h4>

                  <MultiSelect
                    options={courses}
                    value={selectedCourses}
                    onChange={handleSelectChange}
                    labelledBy={"Select Course"}
                    isCreatable={true}
                  />
                </div>

                <div className="row m-0 p-0 ">
                  <div className="col ">
                    <h4 className="fw-bold m-0 p-0">Course/s you teach</h4>
                  </div>
                  <div className="col ">
                    <p className="fw-bold text-muted m-0 p-0">
                      Profieiency of student you'd rather teach
                    </p>
                  </div>
                  {
                    selectedCourses.map((v,i)=>{
                      return   <div className="row m-0 p-0 py-2 pt-4">
                    <div className="col d-flex align-items-center gap-2">
                      <MdArrowForwardIos className="text_primary h4 p-0 m-0" />
                      <p className="fw-bold m-0 p-0 h5 fw-lighter">{v.label}</p>
                    </div>
                    <div className="col ">
                        <MultiSelect
                        options={proficiency}
                        value={v.proficiencies}
                        onChange={(selectedOptions) =>
                                 handleSelection(selectedOptions, i)
                           }
                        labelledBy={"Select Proficiency"}
                        isCreatable={true}
                      />
            
                    </div>
                  </div>
                    })
                  }
              
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

export default withRole(connect(mapStateToProps, { fetchUser })(EditProfile), ['Instructor']);