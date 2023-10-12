import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { apiClient, base_url } from '@/api/client';
import axios from 'axios';
import { CourseChart } from '@/components/admin/CoursesChart';
import { useRouter } from 'next/router';
import moment from 'moment';
import useDebounce from '@/hooks/use-debounce';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Courses = () => {
  const [search, setSearch] = useState('');
  const debouncedInputValue = useDebounce(search, 300); //
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState('Select Country');
  const [state, setState] = useState('Select State');
  const [city, setCity] = useState('Select City');
  const [startDate, setStartDate] = useState(new Date('2023-09-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [coursesWithInstructors, setCoursesWithInstructors] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('Select Course');
  const [languagesWithInstructors, setLanguagesWithInstructors] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('Select Language');
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('Select Grades');
  const [allSkillLevels, setAllSkillLevels] = useState([]);
  const [selectedSkillLevel, setSelectedSkillLevel] =
    useState('Select Proficiency');
  const [allCourses, setAllCourses] = useState([]);
  const [allCoursesFiltered, setAllCoursesFiltered] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [newCourseName, setNewCourseName] = useState();
  const [selectedCourseFromListId, setSelectedCourseFromListId] = useState();
  const [selectedCourseId, setSelectedCourseId] = useState();
  const [selectedLanguageId, setSelectedLanguageId] = useState();
  const [selectedGradeId, setSelectedGradeId] = useState();
  const [selectedSkillLevelId, setSelectedSkillLevelId] = useState();
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    const filtered = allCourses.filter((item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (searchTerm) {
      setAllCoursesFiltered(filtered);
    } else setAllCoursesFiltered([...allCourses]);
  };

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
      setState('Select State');
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
      setAllCoursesFiltered(response.data);
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
      setCity('Select City');
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
    idSetter(selectedObject?.id);
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
      // Add one day to the date
      const newDate = moment(endDate).add(1, 'days').format('YYYY-MM-DD');
      const filterData = {
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: newDate,
      };
      const queryString = new URLSearchParams(filterData);
      country != 'Select Country' && queryString.append('country', country);
      state != 'Select State' && queryString.append('state', state);
      city != 'Select City' && queryString.append('city', city);
      selectedGradeId && queryString.append('gradeId', selectedGradeId);
      selectedLanguageId &&
        queryString.append('languageId', selectedLanguageId);
      selectedCourseId && queryString.append('courseId', selectedCourseId);

      const response = await apiClient.get(
        `${base_url}/admin/course/count-of-classes?${queryString.toString()}`,
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
        <select value={selectedCourse} onChange={handleCourseChange}>
          <option>Select Course</option>
          {coursesWithInstructors.map((course, index) => (
            <option key={index} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
        <select
          disabled={selectedCourseId ? false : true}
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setState('Select State');
            setCity('Select City');
          }}
        >
          <option>Select Country</option>
          {countries.map((country, index) => (
            <option value={country.name} key={index}>
              {country.name}
            </option>
          ))}
        </select>
        <select
          disabled={selectedCourseId ? false : true}
          value={state}
          onChange={(e) => {
            setState(e.target.value);

            setCity('Select City');
          }}
        >
          <option>Select State</option>
          {states.map((state, index) => (
            <option value={state.name} key={index}>
              {state.name}
            </option>
          ))}
        </select>
        <select
          disabled={selectedCourseId ? false : true}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option>Select City</option>
          {cities.map((city, index) => (
            <option value={city.name} key={index}>
              {city.name}
            </option>
          ))}
        </select>

        <select
          disabled={selectedCourseId ? false : true}
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option>Select language</option>
          {languagesWithInstructors.map((language, index) => (
            <option key={index}>{language.name}</option>
          ))}
        </select>
        <select
          disabled={selectedCourseId ? false : true}
          value={selectedGrade}
          onChange={handleGradeChange}
        >
          <option>Select Grade</option>
          {allGrades.map((grade, index) => (
            <option key={index}>{grade.name}</option>
          ))}
        </select>
        <select
          disabled={selectedCourseId ? false : true}
          value={selectedSkillLevel}
          onChange={handleProficiencyChange}
        >
          <option>Select Proficiency</option>
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
            {!search && (
              <MagnifyingGlassIcon
                className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-1 tw-h-full tw-w-5 tw-text-gray-400"
                aria-hidden="true"
              />
            )}
            <input
              id="tw-search-field"
              className="tw-block tw-h-full tw-w-full tw-border-0 tw-py-0 tw-pr-0 tw-text-gray-900 placeholder:tw-text-gray-400 focus:tw-ring-0 sm:tw-text-sm"
              placeholder="Search..."
              type="search"
              name="search"
              value={search}
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <RiDeleteBin6Line
            onClick={deleteCourse}
            className="tw-flex tw-justify-end tw-ml-auto tw-h-5 tw-w-5 tw-cursor-pointer tw-my-1"
          />
          <div className="!tw-border-2 tw-cst-pf tw-overflow-y-auto tw-h-[80vh] tw-w-full !tw-border-gray-500">
            {allCoursesFiltered.map((course) => (
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
