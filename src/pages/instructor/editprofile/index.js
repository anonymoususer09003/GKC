import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { Navbar, TutorNavbar, Footer } from '../../../components';
import { MdEmail, MdLocationOn, MdArrowForwardIos } from 'react-icons/md';
import { BsCheck2Circle } from 'react-icons/bs';
import Image from 'next/image';
import { MultiSelect } from 'react-multi-select-component';
import { useRouter } from 'next/router';
import { withRole } from '../../../utils/withAuthorization';
import { connect } from 'react-redux';
import { fetchUser } from '../../../store/actions/userActions';
import { apiClient } from '../../../api/client';
import { AiOutlineEdit } from 'react-icons/ai';
import { CountryCodes } from '@/utils/countryCodes';
function EditProfile({ userInfo, loading, error, fetchUser }) {
  //protection starts
  const nav = useRouter();
  // checking if user logged in starts
  if (typeof window !== 'undefined') {
    // here we check if global object successfully loaded

    useEffect(() => {
      if (
        JSON.parse(window.localStorage.getItem('gkcAuth')).role === undefined
      ) {
        //here we check if user signed in
        nav.push('/');
      } else {
        if (
          JSON.parse(window.localStorage.getItem('gkcAuth')).role !==
          'Instructor'
        ) {
          //here we check if user has role Instructor
          nav.push('/');
        }
      }
    }, []);
  }
  // checking if user logged in ends

  //protection ends
  const navigation = useRouter();
  const [selected, setSelected] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [bio, setBio] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [deliveryModes, setDeliveryModes] = useState([]);
  const [acceptInterviewRequest, setAcceptInterviewRequest] = useState(false);
  const [grades, setGrades] = useState([]);
  const [proficiency, setProficiency] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lang, setLang] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedLang, setSelectedLang] = useState([]);
  const fileInputRef = useRef(null);
  const videoFileInputRef = useRef(null);
  const videoEditInputRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isImageTooLarge, setIsImageTooLarge] = useState(false);
  const [isVideoTooLarge, setIsVideoTooLarge] = useState(false);
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const defaultImage =
    'https://img.freepik.com/premium-photo/top-view-abstract-paper-texture-background_225709-2718.jpg?w=2000';

  const onContinue = () => {
    navigation.push('/instructor/settingprofile');
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
    getCountries();
    // getStates();
    // getCities();
  }, []);

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

  const handleSelectCourseChange = (selected) => {
    console.log(selected);
    setSelectedCourses(
      selected &&
        selected.map((option) => ({
          label: option.label,
          value: option.value,
          proficiencies:
            option?.proficiencies !== undefined
              ? [...option.proficiencies]
              : [{ value: 1, label: 'Beginner' }],
        }))
    );
  };

  const proficiencyOrder = {
    Beginner: 1,
    Intermediate: 2,
    'Semi-expert': 3,
  };

  // useEffect(()=>{
  //   console.log("see", selectedCourses[0].proficiencies);
  // },[selectedCourses])

  const handleProficiencySelection = (selectedOptions, optionIndex) => {
    setSelectedCourses((prevData) => {
      const newData = [...prevData];
      newData[optionIndex].proficiencies = selectedOptions.sort(
        (a, b) => proficiencyOrder[a] - proficiencyOrder[b]
      );
      return newData;
    });
  };

  // const handleProficiencySelection = (selectedOptions, optionIndex) => {
  //   setSelectedCourses((prevData) => {
  //     const newData = [...prevData];
  //     newData[optionIndex].proficiencies = selectedOptions;
  //     return newData;
  //   });
  // };

  const handleCheckboxChange = (event) => {
    const itemId = parseInt(event.target.value);
    const updatedItems = deliveryModes.map((item) => {
      if (item.id === itemId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setDeliveryModes(updatedItems);
    console.log(deliveryModes);
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

  const onSubmit = async () => {
    var modes = [];
    deliveryModes.map((v) => {
      if (v.checked) {
        modes.push(v.label);
      }
    });

    var langs = [];
    selectedLang.map((v) => {
      langs.push(v.value);
    });

    var course = [];
    console.log('selectedCourses', selectedCourses);
    selectedCourses.map((v) => {
      course.push({
        courseId: v.value,
        proficienciesId: v.proficiencies.map((val) => {
          return val.value;
        }),
      });
    });

    var gradess = [];
    grades.map((v) => {
      if (v.checked) {
        gradess.push(v.id);
      }
    });

    console.log({
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
      instructorBio: bio,
      hourlyRate: hourlyRate,
      acceptInterviewRequest: acceptInterviewRequest == 'Yes' ? true : false,
      deliveryModes: modes,
      gradesIdToTutor: gradess,
      languagesIdPreference: langs,
      courseToTeachAndProficiency: course,
    });

    try {
      let dial_code = CountryCodes.find(
        (item) => item.name === selectedCountry
      ).dial_code;
      var typ = JSON.parse(window.localStorage.getItem('gkcAuth'));
      const response = await apiClient.put('/user/instructor/update', {
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
        phoneNumber: dial_code + '-' + phoneNumber,
      });
      {
      }
      navigation.push('/instructor/settingprofile');
    } catch (error) {
      console.error(error);
    }
  };
  const getLang = async () => {
    try {
      const response = await apiClient.get(
        `/public/register/get-all-languages`
      );
      var arr = [];
      response.data.map((v) => {
        arr.push({ value: v.id, label: v.name });
      });

      console.log(response);
      setLang(arr);
    } catch (error) {
      console.error(error);
    }
  };

  const getCourses = async () => {
    try {
      const response = await apiClient.get(`/public/course/get-all-courses`);

      var technologyList = [];

      response.data.map((v) => {
        technologyList.push({ value: v.id, label: v.name });
      });
      setCourses(technologyList);
    } catch (error) {
      console.error(error);
    }
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
      setHourlyRate(userInfo.hourlyRate);
      setBio(userInfo.instructorBio);
      setAcceptInterviewRequest(userInfo.acceptInterviewRequest ? 'Yes' : 'No');
      let lanArr = [];
      userInfo.languagePreference.forEach((v) => {
        lanArr.push({ value: v.id, label: v.name });
      });

      setSelectedLang(lanArr);

      let delArr = [];
      userInfo.deliveryModes.forEach((v) => {
        delArr.push({ value: v.id, label: v.name, checked: false });
      });
      console.log(delArr);

      const uniqueCourseIds = new Set();
      // Filter and add unique objects to the result array
      const uniqueCourseList = userInfo.coursesToTutorAndProficiencies.filter(
        (object) => {
          if (!uniqueCourseIds.has(object.course.id)) {
            uniqueCourseIds.add(object.course.id);
            return true;
          }
          return false;
        }
      );
      let courseArr = [];
      uniqueCourseList.forEach((v) => {
        let avalue = v.course.id;
        let alabel = v.course.name;
        let prof = [];
        v.proficiencies.forEach((val) => {
          prof.push({ value: val.id, label: val.name });
        });
        courseArr.push({ value: avalue, label: alabel, proficiencies: prof });
      });
      setPhoneNumber(
        userInfo.phoneNumber?.split('-')[1] || userInfo?.phoneNumber
      );

      setSelectedCourses(courseArr);
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setAddress1(userInfo.address1);
      setAddress2(userInfo.address2);
      setSelectedCity(userInfo.city);
      setSelectedState(userInfo.state);
      setSelectedCountry(userInfo.country);
      setZipCode(userInfo.zipCode);
      setImage(userInfo.instructorPhoto);
      setVideo(userInfo.video);

      let modes = [
        { checked: false, id: 1, label: 'In-Person' },
        { checked: false, id: 2, label: 'Online' },
      ];
      let delMode = [];
      userInfo.deliveryModes.forEach((v) => {
        delMode.push({ checked: true, id: v.id, label: v.name });
      });

      const newArray = modes.map((item) => {
        const matchingItem = delMode.find((elem) => elem.id === item.id);
        if (matchingItem) {
          return matchingItem; // Replace the item from array2
        } else {
          return item; // Keep the item from array1
        }
      });

      console.log(newArray);

      setDeliveryModes(newArray);

      let gradess = [
        { checked: false, id: 1, label: 'Elementary <=10yrs' },
        { checked: false, id: 2, label: 'Middle School 11yrs - 13yrs' },
        { checked: false, id: 3, label: 'High School 14yrs - 18yrs' },
        { checked: false, id: 4, label: 'College & Beyond >18yrs' },
      ];
      let selectGrades = [];
      userInfo.gradesToTutor.forEach((v) => {
        selectGrades.push({
          checked: true,
          id: v.id,
          label: v.name + ' ' + v.description,
        });
      });
      const newGradesArray = gradess.map((item) => {
        const matchingItem = selectGrades.find((elem) => elem.id === item.id);
        if (matchingItem) {
          return matchingItem; // Replace the item from array2
        } else {
          return item; // Keep the item from array1
        }
      });

      setGrades(newGradesArray);
    }
  }, [userInfo]);

  const handleImageUpload = async (e) => {
    const selectedFile = e.target.files[0];

    const selectedFileSizeInBytes = selectedFile.size;
    const fileSizeInKB = selectedFileSizeInBytes / 1024;

    if (fileSizeInKB > 3072) {
      setIsImageTooLarge(true);
      return;
    } else {
      setIsImageTooLarge(false);
    }

    const file = new FormData();
    file.append('file', selectedFile);
    try {
      const response = await apiClient.post(
        '/aws/upload-instructor-photo',
        file,
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      fetchUser();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleVideoUpload = async (e) => {
    const selectedFile = e.target.files[0];

    const selectedFileSizeInBytes = selectedFile.size;
    const fileSizeInMB = selectedFileSizeInBytes / (1024 * 1024);

    if (fileSizeInMB > 10) {
      setIsVideoTooLarge(true);
      return;
    } else {
      setIsVideoTooLarge(false);
    }
    const file = new FormData();
    file.append('file', selectedFile);
    try {
      const response = await apiClient.post(
        '/aws/upload-instructor-video',
        file,
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      fetchUser();
    } catch (error) {
      console.log(error.response);
    }
  };

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
      <main className="container-fluid" style={{ color: '#48494B' }}>
        <div
          className="p-5 "
          style={{ minHeight: '90vh', maxWidth: '1700px', margin: 'auto' }}
        >
          <div className="row">
            <div className="col-12 col-md-4 position-relative">
              <div className="shadow rounded-10 bg-white py-4">
                <div className="px-4">
                  <div className="tw-flex mb-5 tw-relative tw-justify-end tw-gap-3 tw-items-center">
                    <div>
                      <div
                        className="bg_primary rounded-circle position-absolute d-flex justify-content-center align-items-center"
                        style={{
                          top: '-50px',
                          left: '0px',
                          width: '105px',
                          height: '105px',
                        }}
                      >
                        <Image
                          src={image || defaultImage}
                          unoptimized={true}
                          alt="profile image"
                          width={100}
                          height={100}
                          className="rounded-circle bg-light"
                        />
                      </div>
                      <div className="tw-absolute tw-top-[20px] tw-left-[18%]">
                        <AiOutlineEdit
                          onClick={() => {
                            fileInputRef.current.click();
                          }}
                          className="tw-cursor-pointer tw-w-5 tw-h-5"
                        />
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            handleImageUpload(e);
                            // setImage(URL.createObjectURL(e.target.files[0]));
                          }}
                          style={{ display: 'none' }}
                        />
                      </div>
                      {isImageTooLarge && (
                        <p className="tw-text-center tw-absolute tw-top-14 tw-left-0 tw-text-[15px] tw-text-red-500 tw-font-sm">
                          Max allowed size is 3MB
                        </p>
                      )}
                    </div>
                    <div className="tw-flex tw-gap-2 tw-flex-col tw-items-end">
                      <p className="bg_secondary m-0 text-white p-1 rounded fw-bold">
                        <MdEmail style={{ fontSize: '20px' }} />
                        {userInfo?.email}
                      </p>
                      <div className="tw-mx-auto">
                        {video === null ? (
                          <>
                            <button
                              onClick={() => {
                                videoFileInputRef.current.click();
                              }}
                              className="btn_primary mx-auto p-1 tw-w-32 fw-bold text-white rounded text-decoration-none"
                            >
                              Upload video
                            </button>
                            <input
                              ref={videoFileInputRef}
                              type="file"
                              accept="video/*"
                              onChange={(e) => handleVideoUpload(e)}
                              style={{ display: 'none' }}
                            />
                          </>
                        ) : (
                          <div className="tw-relative">
                            <video
                              width="200"
                              height="200"
                              muted
                              controls
                              loop
                              autoPlay
                              src={video}
                            ></video>
                            <div className="tw-absolute tw-top-0 tw-right-0">
                              <AiOutlineEdit
                                onClick={() => {
                                  videoEditInputRef.current.click();
                                }}
                                className="tw-cursor-pointer tw-w-5 tw-h-5"
                              />
                              <input
                                ref={videoEditInputRef}
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleVideoUpload(e)}
                                style={{ display: 'none' }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      {isVideoTooLarge && (
                        <p className="tw-text-center tw-w-full tw-text-red-500 tw-font-sm">
                          Max allowed size is 10MB
                        </p>
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    className="border-0 h4 p-1 border-bottom w-100 mb-1"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="border-0 h4 p-1 border-bottom w-100 mb-3"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {/* 
                  <div className="d-flex gap-1 gap-2 pb-3 ">
                    <MdLocationOn className="h5 p-0 m-0" />
                  </div> */}
                  <label>Address</label>
                  <input
                    type="text"
                    className="border-0 border-bottom w-100 mb-2"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                  <div className="d-flex align-items-center gap-3 py-2">
                    <select
                      className="w-25 flex-fill p-2 rounded outline-0 border border_gray "
                      value={selectedCountry}
                      onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        setSelectedState('');
                        setSelectedCity('');
                      }}
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
                  </div>
                  <div className="d-flex align-items-center gap-3 py-2">
                    <select
                      className="w-25 flex-fill p-2 rounded outline-0 border border_gray "
                      value={selectedState}
                      onChange={(e) => {
                        setSelectedCity('');
                        setSelectedState(e.target.value);
                      }}
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
                  </div>

                  <label>Zip Code</label>
                  <input
                    type="text"
                    className="border-0 border-bottom w-100 mb-2"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />

                  <div style={{ display: 'flex' }}>
                    <input
                      type="text"
                      style={{ width: '100px', marginRight: 10 }}
                      className="p-2 rounded outline-0 border border_gray   mb-3"
                      placeholder="CountryCode"
                      name="countryCode"
                      value={
                        selectedCountry
                          ? CountryCodes.find(
                              (item) => item.name === selectedCountry
                            )?.dial_code
                          : ''
                      }
                      readOnly
                    />
                    <input
                      type="text"
                      className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <hr className="bg_secondary" />
                  <h4 className="p-0 m-0 py-2 fw-bold">Bio</h4>
                  <div>
                    <textarea
                      className="border-0 border-bottom w-100"
                      rows="8"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="d-flex gap-2 justify-content-center py-3 pt-5">
                    <button
                      className="w-50 btn btn-success text-light p-2 rounded fw-bold d-flex align-items-center justify-content-center gap-2"
                      onClick={() => onSubmit()}
                    >
                      <BsCheck2Circle /> Save Profile
                    </button>
                  </div>
                  <div className="d-flex gap-2 justify-content-center">
                    <a
                      href="/instructor/settingprofile"
                      className="w-50 btn btn-dark text-light p-2 rounded fw-bold d-flex align-items-center justify-content-center gap-2"
                      onClick={() => onSubmit()}
                    >
                      Exit
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8 py-2">
              <div className="shadow rounded-10 p-5 bg-white">
                <div className="row">
                  <div className="col-3">
                    <h5 className="fw-bold ">Hourly Rate</h5>
                    <p className="fw-bold">
                      $
                      <input
                        type="text"
                        value={hourlyRate}
                        className="fw-bold border-0 border-bottom w-25"
                        onChange={(e) => setHourlyRate(e.target.value)}
                      />
                      /hr
                    </p>
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
                    {grades.map((v, i) => {
                      return (
                        <div className="form-check pt-2" key={v.id}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckChecked"
                            checked={v.checked}
                            value={v.id}
                            onChange={handleChangeGrade}
                          />
                          <label
                            className="form-check-label fw-bold"
                            for="flexCheckChecked"
                          >
                            {v.label}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <>
                  {/* <div className="col pt-5">
                    <h5 className="fw-bold m-0 p-0">
                      Spoken Language Preference:
                    </h5>
                    <MultiSelect
                      options={lang}
                      value={selectedLang}
                      onChange={handleLangSelectChange}
                      labelledBy={"Select Lang"}
                      isCreatable={true}
                      hasSelectAll={false}
                    />
                                      <div className="container">
                    <div className="row d-flex justify-content-center py-4">

                    {
                      selectedLang.map((v,ind)=>{
                        return (
                          <>
                            <div className="col-md-4 item">
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
                  </div> */}

                  <div className="d-flex gap-5 w-100 align-items-center pt-5">
                    <div className="w-50">
                      <h4 className="fw-bold">Spoken Language Preference</h4>

                      <MultiSelect
                        options={lang}
                        value={selectedLang}
                        onChange={handleLangSelectChange}
                        labelledBy={'Select Lang'}
                        isCreatable={true}
                        hasSelectAll={false}
                        overrideStrings={{
                          // selectSomeItems: "Select Some items...",
                          allItemsAreSelected: 'All proficiencies selected',
                          // selectAll: "Select All",
                          // search: "Search",
                        }}
                      />
                    </div>
                    <div className="w-50">
                      <h5 className="fw-bold">Accept Interview Request</h5>
                      <div className="d-flex gap-4 py-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            checked={acceptInterviewRequest === 'No'}
                            value="No"
                            onChange={(e) =>
                              setAcceptInterviewRequest(e.target.value)
                            }
                          />
                          <label
                            className="form-check-label"
                            for="flexRadioDefault1"
                          >
                            No
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked={acceptInterviewRequest === 'Yes'}
                            value="Yes"
                            onChange={(e) =>
                              setAcceptInterviewRequest(e.target.value)
                            }
                          />
                          <label
                            className="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Yes
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex py-4">
                    {selectedLang.map((v, ind) => {
                      return (
                        <>
                          <div className="ms-3 d-flex primary-list py-1">
                            <li className="fw-bold h7 fw-lighter">{v.label}</li>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              </div>

              <div className="shadow rounded-10 p-5 bg-white  my-4">
                <div className="p-4 w-50 m-auto">
                  <h4 className="fw-bold m-0 p-0 pb-3 text-center">
                    Course List:
                  </h4>

                  <MultiSelect
                    options={courses}
                    value={selectedCourses}
                    onChange={handleSelectCourseChange}
                    labelledBy={'Select Course'}
                    isCreatable={true}
                    overrideStrings={{
                      // selectSomeItems: "Select Some items...",
                      allItemsAreSelected: 'All proficiencies selected',
                      // selectAll: "Select All",
                      // search: "Search",
                    }}
                  />
                </div>

                <div className="row m-0 p-0 ">
                  <div className="col ">
                    <h4 className="fw-bold m-0 p-0">Course/s you teach</h4>
                  </div>
                  <div className="col ">
                    <p className="fw-bold h5 m-0 p-0">
                      Proficiency of students you'd rather teach
                    </p>
                  </div>
                  {selectedCourses.map((v, i) => {
                    return (
                      <div className="row m-0 p-0 pt-4">
                        <div className="col d-flex align-items-center gap-2 primary-list">
                          <li className="fw-bold m-0 p-0 fw-lighter">
                            {v.label}
                          </li>
                        </div>
                        <div className="col ">
                          <MultiSelect
                            options={proficiency}
                            value={v.proficiencies}
                            onChange={(selectedOptions) =>
                              handleProficiencySelection(selectedOptions, i)
                            }
                            labelledBy={'Select Proficiency'}
                            isCreatable={true}
                            overrideStrings={{
                              // selectSomeItems: "Select Some items...",
                              allItemsAreSelected: 'All proficiencies selected',
                              // selectAll: "Select All",
                              // search: "Search",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
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
  'Instructor',
]);
