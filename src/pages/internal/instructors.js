import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { InstructorsCharts } from '@/components/admin/InstructorsCharts';
import { apiClient, base_url } from '@/api/client';
import 'react-datepicker/dist/react-datepicker.css';
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Instructors = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState();
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [endDate, setEndDate] = useState();
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState();
  const [selectedUserData, setSelectedUserData] = useState();
  const [languagesWithInstructors, setLanguagesWithInstructors] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState();
  const [allSkillLevels, setAllSkillLevels] = useState([]);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState();
  const [selectedInstructorCourses, setSelectedInstructorCourses] = useState(
    []
  );
  const [selectedLanguageId, setSelectedLanguageId] = useState();
  const [selectedGradeId, setSelectedGradeId] = useState();
  const [selectedSkillLevelId, setSelectedSkillLevelId] = useState();
  const [classesByCourses, setClassesByCourses] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [weekyPayments, setWeekyPayments] = useState([]);
  const [complaintsCount, setComplaintsCount] = useState([]);

  const [isInitialRender, setIsInitialRender] = useState(true);

  const handleSelectedInstructor = (instructor) => {
    setSelectedInstructorId(instructor.id);
  };

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

  const handleInputChange = (e, setFunction, dataArray, idSetter) => {
    const newSelectedValue = e.target.value;
    setFunction(newSelectedValue);
    const selectedObject = dataArray.find(
      (item) => item.name === newSelectedValue
    );
    idSetter(selectedObject.id);
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

  useEffect(() => {
    getAllInstructors();
  }, [currentPage]);

  const getAllInstructors = async () => {
    try {
      const body = {
        page: currentPage - 1,
        size: 20,
        sort: ['ASC'],
      };
      const queryString = new URLSearchParams(body).toString();
      const url = `${base_url}/admin/instructor/get-all?${queryString}`;
      const response = await apiClient.get(url);
      setInstructors(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    selectedInstructorId ? getInstructorData() : null;
  }, [selectedInstructorId]);

  const getInstructorData = async () => {
    try {
      const response = await apiClient.get(
        `${base_url}/admin/instructor/${selectedInstructorId}`
      );
      setSelectedUserData(response.data);
      setSelectedInstructorCourses(
        response.data.coursesToTutorAndProficiencies.map((item) => ({
          id: item.course.id,
          name: item.course.name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDailyClasses = async () => {
    const responses = [];
    for (const selectedInstructorCourse of selectedInstructorCourses) {
      try {
        const response = await apiClient.get(
          `${base_url}/admin/instructor/count-classes/${selectedInstructorId}/${selectedInstructorCourse.id}`
        );
        const responseDataWithCourseName = {
          className: selectedInstructorCourse.name,
          classData: response.data,
        };
        responses.push(responseDataWithCourseName);
      } catch (error) {
        console.error(
          `Error fetching data for course ${selectedInstructorCourse.name}:`,
          error
        );
      }
    }
    setClassesByCourses(responses);
  };

  const getFilterData = async () => {
    try {
      const filterData = {
        // startDate,
        // endDate,
      };
      fetchDailyClasses();
      const dailyRevenueResponse = await apiClient.get(
        `${base_url}/admin/instructor/net-revenue/${selectedInstructorId}`
      );
      const weekyPaymentsResponse = await apiClient.get(
        `${base_url}/admin/instructor/weekly-withdrawal-amount/${selectedInstructorId}`
      );
      const complaintsCountResponse = await apiClient.get(
        `${base_url}/admin/count-complaints`
      );
      setDailyRevenue(dailyRevenueResponse.data);
      setWeekyPayments(weekyPaymentsResponse.data);
      setComplaintsCount(complaintsCountResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCountries();
    getAllInstructors();
    getLanguagesWithInstructors();
    getAllGrades();
    getAllProficiencies();
  }, []);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      getStates();
    }
  }, [country]);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      getCities();
    }
  }, [state]);
  return (
    <div className="tw-cst-pf tw-w-full">
      <div className="tw-cst-pf tw-flex tw-justify-center tw-space-x-5">
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
        <button
          onClick={getFilterData}
          type="button"
          className="tw-block tw-w-28  !tw-bg-[#f48342] tw-rounded-md  tw-px-3 tw-py-1.5 tw-text-center tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
        >
          Search
        </button>
      </div>
      <div className="tw-divide-y tw-p-3 tw-w-full tw-h-full tw-divide-gray-200 tw-overflow-hidden tw-rounded-lg tw-shadow sm:tw-grid sm:tw-grid-cols-5 tw-gap-x-5 sm:tw-divide-y-0">
        <div className="tw-relative tw-space-y-5">
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
          <div className="tw-relative tw-pb-10 tw-cst-pf !tw-border-2 !tw-border-gray-500">
            <label className="tw-absolute tw--top-2 tw-left-4 tw-inline-block tw-bg-white tw-px-1 tw-text-xs tw-font-medium tw-text-gray-900">
              Users
            </label>
            <div className="tw-h-[80vh] tw-overflow-y-auto">
              {instructors.map((instructor) => (
                <ul className="!tw-flex tw-flex-col tw-text-lg tw-mt-2 !tw-list-disc tw-mb-0">
                  <li
                    onClick={() => handleSelectedInstructor(instructor)}
                    className={classNames(
                      instructor.id === selectedInstructorId
                        ? '!tw-text-orange-600 tw-rounded-xl tw-ml-1'
                        : '',
                      '!tw-cst-pf mt-1 tw-w-[50%] tw-cursor-pointer'
                    )}
                  >
                    {instructor.fullName}
                  </li>
                </ul>
              ))}
            </div>
            <nav className="tw-absolute tw-bottom-4 tw-w-full tw-border-t tw-border-gray-200 tw-px-4 sm:tw-px-0">
              <div className="tw-hidden md:tw--mt-px md:tw-flex">
                <div className="tw--mt-px tw-flex tw-w-0 tw-flex-1">
                  <a className="tw-inline-flex tw-cursor-pointer tw-items-center tw-cst-pf !tw-border-t-2 !tw-border-transparent tw-pr-1 tw-pt-4 tw-text-sm tw-font-medium tw-text-gray-500 hover:tw-border-gray-300 hover:tw-text-gray-700">
                    <ArrowLongLeftIcon
                      className="tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400"
                      aria-hidden="true"
                      onClick={() =>
                        currentPage >= 2
                          ? setCurrentPage((prevCurr) => prevCurr - 1)
                          : null
                      }
                    />
                    {/* Previous */}
                  </a>
                </div>
                {Array.from({ length: 5 }, (_, index) => (
                  <a
                    onClick={() => setCurrentPage(index + 1)}
                    className={classNames(
                      currentPage === index + 1
                        ? '!tw-text-indigo-600'
                        : 'tw-text-gray-500 hover:tw-border-gray-300 hover:tw-text-gray-700',
                      'tw-inline-flex tw-cursor-pointer tw-justify-center tw-items-center tw-cst-pf !tw-border-t-2 !tw-border-transparent tw-px-4 tw-pt-4 tw-text-sm tw-font-medium'
                    )}
                  >
                    {index + 1}
                  </a>
                ))}

                <div className="tw--mt-px tw-flex tw-w-0 tw-flex-1 tw-justify-end">
                  <a className="tw-inline-flex tw-cursor-pointer tw-items-center tw-cst-pf !tw-border-t-2 !tw-border-transparent tw-pl-1 tw-pt-4 tw-text-sm tw-font-medium tw-text-gray-500 hover:tw-border-gray-300 hover:tw-text-gray-700">
                    {/* Next */}
                    <ArrowLongRightIcon
                      className="tw-ml-3 tw-h-5 tw-w-5 tw-text-gray-400"
                      aria-hidden="true"
                      onClick={() =>
                        currentPage <= 4
                          ? setCurrentPage((prevCurr) => prevCurr + 1)
                          : null
                      }
                    />
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="tw-col-span-4 tw-cst-pf !tw-border-2 !tw-border-black tw-p-3 tw-rounded-3xl  ">
          <div className="tw-grid tw-h-full tw-grid-cols-3 tw-gap-y-7">
            {selectedUserData && (
              <div className="tw-flex tw-justify-between tw-col-span-3">
                <div className="tw-cst-pf tw-space-y-2">
                  <p className="tw-cst-pf">
                    Hourly Rate: ${selectedUserData.hourlyRate}
                  </p>
                  <p className="tw-cst-pf">
                    Country: {selectedUserData.country}
                  </p>
                  {/* <p className="tw-cst-pf">Skill</p> */}
                </div>
                <div className="tw-space-y-2">
                  <p className="tw-cst-pf"> Email: {selectedUserData.email}</p>
                  <p className="tw-cst-pf">State: {selectedUserData.state}</p>
                  <div className="tw-flex">
                    <label className="tw-cst-pf">Delivery Mode:</label>
                    {selectedUserData.deliveryModes?.map((mode, index) => (
                      <div className="tw-ml-2">{mode.name}</div>
                    ))}
                  </div>
                </div>
                <div className="tw-space-y-2">
                  <p className="tw-cst-pf">
                    Accepts Interviews:
                    {selectedUserData.acceptInterviewRequest === false
                      ? ' No'
                      : ' Yes'}
                  </p>
                  <p className="tw-cst-pf">City: {selectedUserData.city}</p>
                  <div className="tw-flex">
                    <label className="tw-cst-pf">Languages:</label>
                    {selectedUserData.languagePreference?.map(
                      (language, index) => (
                        <div className="tw-ml-2">{language.name}</div>
                      )
                    )}
                  </div>
                </div>
                <div className="tw-space-y-2">
                  <img
                    className="tw-w-40 tw-h-40 tw-object-cover tw-rounded-full"
                    src={
                      selectedUserData.instructorPhoto ||
                      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2831&q=80'
                    }
                  />
                </div>
              </div>
            )}
            <div className="tw-relative">
              <label className="tw-absolute tw--top-2 tw-left-2 tw-z-40 tw-inline-block tw-bg-white tw-px-1 tw-text-xs tw-font-medium tw-text-gray-900">
                Course List
              </label>

              <ul className="tw-cst-pf !tw-border-2 tw-relative !tw-list-decimal !tw-list-inside tw-overflow-y-auto tw-w-[40%] tw-h-48 !tw-p-2 !tw-border-gray-500">
                {selectedInstructorCourses.map((course, index) => (
                  <li
                    // onClick={() => handleSelectedCourse(course)}
                    key={index}
                    className="tw-mt-2 tw-cursor-pointer"
                  >
                    {course.name}
                  </li>
                ))}
              </ul>
            </div>
            <InstructorsCharts
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              classesByCourse={classesByCourses}
              dailyRevenue={dailyRevenue}
              weekyPayments={weekyPayments}
              complaintsCount={complaintsCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructors;
