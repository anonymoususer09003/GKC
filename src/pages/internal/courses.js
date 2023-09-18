import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { apiClient, base_url } from '@/api/client';
import axios from 'axios';
import { CourseChart } from '@/components/admin/CoursesChart';
import { useRouter } from 'next/router';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Courses = () => {
  //protection starts
  const nav = useRouter()
    // checking if user logged in starts
      if(typeof window !== 'undefined' && nav.isReady){
        useEffect(()=>{

          if(JSON.parse(window.localStorage.getItem('gkcAuth')).role === undefined) {
            nav.push('/')
          }

          // if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Student') {
          //   setIfSignedUser(true)
          // } else {
          //   //redirect
          // }
          // if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Parent') {
          //   setIfSignedUser(true)
          // }
          // if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Instructor') {
          //   setIfSignedUser(true)
          // }

        },[])
      }
    // checking if user logged in ends

    // checking if user is admin starts

    const isAdmin = async () =>{
      try {
        const res = await apiClient('/admin/roles/all-admins')
      } catch (err) {
        console.log(err.response.status)
          nav.push('/')
      }
    }

    useEffect(()=>{
      isAdmin()
    }, [])
    // checking if user is admin ends

  //protection ends

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState();
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [coursesWithInstructors, setCoursesWithInstructors] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [languagesWithInstructors, setLanguagesWithInstructors] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState();
  const [allSkillLevels, setAllSkillLevels] = useState([]);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState();
  const [allCourses, setAllCourses] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [newCourseName, setNewCourseName] = useState();
  const [selectedCourseFromListId, setSelectedCourseFromListId] = useState();
  const [selectedCourseId, setSelectedCourseId] = useState();
  const [selectedLanguageId, setSelectedLanguageId] = useState();
  const [selectedGradeId, setSelectedGradeId] = useState();
  const [selectedSkillLevelId, setSelectedSkillLevelId] = useState();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getCountries();
    getAllCourses();
    getCoursesWithInstructors();
    getLanguagesWithInstructors();
    getAllGrades();
    getAllProficiencies();
  }, []);

  const getCountries = async () => {
    try {
      const response = await axios.get(
        `${base_url}/public/location/get-countries`
      );
      setCountries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCoursesWithInstructors = async () => {
    try {
      const response = await axios.get(
        `${base_url}/public/course/with-instructors`
      );
      setCoursesWithInstructors(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getLanguagesWithInstructors = async () => {
    try {
      const response = await axios.get(
        `${base_url}/public/language/with-instructors`
      );
      setLanguagesWithInstructors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllGrades = async () => {
    try {
      const response = await axios.get(
        `${base_url}/public/register/get-all-grades`
      );
      setAllGrades(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProficiencies = async () => {
    try {
      const response = await axios.get(
        `${base_url}/public/course/get-all-proficiencies`
      );
      setAllSkillLevels(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCourses = async () => {
    try {
      const response = await axios.get(
        `${base_url}/public/course/get-all-courses`
      );
      setAllCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getStates = async () => {
    try {
      const response = await axios.get(
        `${base_url}/public/location/get-states?countryName=${country}`
      );
      setStates(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getCities = async () => {
    try {
      const response = await axios.get(
        `${base_url}/public/location/get-cities?countryName=${country}&stateName=${state}`
      );
      setCities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addCourse = async () => {
    try {
      const cousreData = {
        name: newCourseName,
        description: newCourseName,
      };
      const response = await apiClient.post(
        `${base_url}/admin/course/add`,
        cousreData
      );
      setNewCourseName('');
      getAllCourses();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e, setFunction, dataArray, idSetter) => {
    const newSelectedValue = e.target.value;
    setFunction(newSelectedValue);
    const selectedObject = dataArray.find(
      (item) => item.name === newSelectedValue
    );
    idSetter(selectedObject.id);
  };

  const handleCourseChange = (e) => {
    handleInputChange(
      e,
      setSelectedCourse,
      coursesWithInstructors,
      setSelectedCourseId
    );
  };

  const handleLanguageChange = (e) => {
    handleInputChange(
      e,
      setSelectedLanguage,
      languagesWithInstructors,
      setSelectedLanguageId
    );
  };

  const handleGradeChange = (e) => {
    handleInputChange(e, setSelectedGrade, allGrades, setSelectedGradeId);
  };

  const handleProficiencyChange = (e) => {
    handleInputChange(
      e,
      setSelectedSkillLevel,
      allSkillLevels,
      setSelectedSkillLevelId
    );
  };

  const deleteCourse = async () => {
    try {
      const response = await apiClient.delete(
        `${base_url}/admin/course/${selectedCourseFromListId}`
      );
      setSelectedCourseFromListId(null);
      getAllCourses();
    } catch (error) {
      console.error(error);
    }
  };

  const getFilterData = async () => {
    try {
      const filterData = {
        country,
        state,
        city,
        gradeId: selectedGradeId,
        languageId: selectedLanguageId,
        proficiencyId: selectedSkillLevelId,
        courseId: selectedCourseId,
        startDate,
        endDate,
      };
      const response = await apiClient.get(
        `${base_url}/admin/course/count-of-classes`,
        filterData
      );
      setFilteredData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      getStates();
    }
  }, [country]);

  const handleSelectedCourseFromList = (course) => {
    setSelectedCourseFromListId(course.id);
  };

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      getCities();
    }
  }, [state]);

  return (
    <div>
      <div className="tw-flex tw-space-x-5">
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option disabled selected>
            Select Country
          </option>
          {countries.map((country, index) => (
            <option value={country.name} key={index}>
              {country.name}
            </option>
          ))}
        </select>
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option disabled selected>
            Select State
          </option>
          {states.map((state, index) => (
            <option value={state.name} key={index}>
              {state.name}
            </option>
          ))}
        </select>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option disabled selected>
            Select City
          </option>
          {cities.map((city, index) => (
            <option value={city.name} key={index}>
              {city.name}
            </option>
          ))}
        </select>
        <select value={selectedCourse} onChange={handleCourseChange}>
          <option disabled selected>
            Select Course
          </option>
          {coursesWithInstructors.map((course, index) => (
            <option key={index} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option disabled selected>
            Select language
          </option>
          {languagesWithInstructors.map((language, index) => (
            <option key={index}>{language.name}</option>
          ))}
        </select>
        <select value={selectedGrade} onChange={handleGradeChange}>
          <option disabled selected>
            Select Grade
          </option>
          {allGrades.map((grade, index) => (
            <option key={index}>{grade.name}</option>
          ))}
        </select>
        <select value={selectedSkillLevel} onChange={handleProficiencyChange}>
          <option disabled selected>
            Select Skill Level
          </option>
          {allSkillLevels.map((skill, index) => (
            <option key={index}>{skill.name}</option>
          ))}
        </select>
      </div>
      <div className="tw-divide-y tw-p-3 tw-w-full tw-h-full tw-divide-gray-200 tw-overflow-hidden tw-rounded-lg tw-shadow sm:tw-grid sm:tw-grid-cols-5 tw-gap-x-5 sm:tw-divide-y-0">
        <div className="tw-relative tw-w-full">
          <div className="tw-relative tw-cst-pf !tw-border-2 !tw-border-black tw-h-12 tw-w-full">
            <label htmlFor="search-field" className="tw-sr-only">
              Search
            </label>
            <MagnifyingGlassIcon
              className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-1 tw-h-full tw-w-5 tw-text-gray-400"
              aria-hidden="true"
            />
            <input
              id="tw-search-field"
              className="tw-block tw-h-full tw-w-full tw-border-0 tw-py-0 tw-pr-0 tw-text-gray-900 placeholder:tw-text-gray-400 focus:tw-ring-0 sm:tw-text-sm"
              placeholder="Search..."
              type="search"
              name="search"
            />
          </div>
          <RiDeleteBin6Line
            onClick={deleteCourse}
            className="tw-flex tw-justify-end tw-ml-auto tw-h-5 tw-w-5 tw-cursor-pointer tw-my-1"
          />
          <div className="!tw-border-2 tw-cst-pf tw-overflow-y-auto tw-h-[80vh] tw-w-full !tw-border-gray-500">
            {allCourses.map((course) => (
              <ul className="!tw-flex tw-text-lg tw-mt-2 !tw-list-disc tw-mb-0">
                <li
                  onClick={() => handleSelectedCourseFromList(course)}
                  className={classNames(
                    course.id === selectedCourseFromListId
                      ? '!tw-text-orange-600 tw-rounded-xl tw-ml-1'
                      : '',
                    '!tw-cst-pf mt-1 tw-w-[50%] tw-cursor-pointer'
                  )}
                >
                  {course.name}
                </li>
              </ul>
            ))}
            <p className=""></p>
          </div>
          <div className="tw-mt-3 tw-gap-x-4 tw-flex tw-mx-auto">
            <input
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              type="text"
              placeholder="Enter New Course Name"
              className="tw-text-[13px] tw-rounded-md tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-leading-6 tw-text-black !tw-border-2 !tw-border-black tw-shadow-sm"
            />
            <button
              onClick={addCourse}
              type="button"
              className="!tw-bg-[#f48342] tw-text-[13px] tw-rounded-md tw-px-2 tw-py-1.5 tw-text-center tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2"
            >
              Update
            </button>
          </div>
        </div>
        <div className="tw-col-span-4 tw-p-4 tw-rounded-3xl">
          <CourseChart
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            getFilterData={getFilterData}
            filteredData={filteredData}
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;
