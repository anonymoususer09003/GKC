import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { apiClient, base_url } from '@/api/client';
import axios from 'axios';
import { StudentsCharts } from '@/components/admin/StudentsCharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Students = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState();
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState();
  const [selectedUserData, setSelectedUserData] = useState();
  const [languagesWithInstructors, setLanguagesWithInstructors] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState();
  const [allSkillLevels, setAllSkillLevels] = useState([]);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState();
  const [selectedStudentCourses, setSelectedStudentCourses] = useState([]);
  const [classesByCourses, setClassesByCourses] = useState([]);
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [weekyExpenses, setWeekyExpenses] = useState([]);
  const [complaintsCount, setComplaintsCount] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const handleSelectedStudent = (student) => {
    setSelectedStudentId(student.id);
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

  const handleInputChange = (e, setFunction) => {
    setFunction(e.target.value);
  };

  const handleLanguageChange = (e) => {
    handleInputChange(e, setSelectedLanguage);
  };

  const handleGradeChange = (e) => {
    handleInputChange(e, setSelectedGrade);
  };

  const handleProficiencyChange = (e) => {
    handleInputChange(e, setSelectedSkillLevel);
  };

  useEffect(() => {
    getAllStudents();
  }, [currentPage]);

  const getAllStudents = async () => {
    try {
      const body = {
        page: currentPage - 1,
        size: 20,
        sort: ['ASC'],
      };
      const queryString = new URLSearchParams(body).toString();
      const url = `${base_url}/admin/student/get-all?${queryString}`;
      const response = await apiClient.get(url);
      setStudents(response.data.content);
      console.log('res', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    selectedStudentId ? getStudentData() : null;
  }, [selectedStudentId]);

  const getStudentData = async () => {
    try {
      const response = await apiClient.get(
        `${base_url}/admin/student/${selectedStudentId}`
      );

      setSelectedUserData(response.data);
      console.log('resr', response.data);
      setSelectedStudentCourses(
        response.data.courseOfInterestAndProficiency.map((item) => ({
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
    for (const selectedStudentCourse of selectedStudentCourses) {
      try {
        const response = await apiClient.get(
          `${base_url}/admin/student/count-classes/${selectedStudentId}/${selectedStudentCourse.id}`
        );
        const responseDataWithCourseName = {
          className: selectedStudentCourse.name,
          classData: response.data,
        };
        responses.push(responseDataWithCourseName);
      } catch (error) {
        console.error(
          `Error fetching data for course ${selectedStudentCourse.name}:`,
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
      const dailyExpensesResponse = await apiClient.get(
        `${base_url}/admin/student/daily-expense-amount/${selectedStudentId}`
      );
      const weekyExpensesResponse = await apiClient.get(
        `${base_url}/admin/student/weekly-expense-amount/${selectedStudentId}`
      );
      const complaintsCountResponse = await apiClient.get(
        `${base_url}/admin/count-complaints`
      );
      setDailyExpenses(dailyExpensesResponse.data);
      setWeekyExpenses(weekyExpensesResponse.data);
      setComplaintsCount(complaintsCountResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCountries();
    getAllStudents();
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
    <div>
      <div className="tw-flex tw-justify-center tw-space-x-5">
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
              {students.map((student) => (
                <ul className="!tw-flex tw-flex-col tw-text-lg tw-mt-2 !tw-list-disc tw-mb-0">
                  <li
                    onClick={() => handleSelectedStudent(student)}
                    className={classNames(
                      student.id === selectedStudentId
                        ? '!tw-text-orange-600 tw-rounded-xl tw-ml-1'
                        : '',
                      '!tw-cst-pf mt-1 tw-w-[50%] tw-cursor-pointer'
                    )}
                  >
                    {student.fullName}
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
        <div className="tw-cst-pf tw-col-span-4 !tw-border-2 !tw-border-black tw-p-3 tw-rounded-3xl">
          <div className="tw-grid tw-h-full tw-grid-cols-3 tw-gap-y-7">
            {selectedUserData && (
              <div className="tw-flex tw-justify-between tw-col-span-3">
                <div className="tw-space-y-2">
                  <p className="tw-cst-pf"> Email: {selectedUserData.email}</p>
                  <p className="tw-cst-pf">Parent1</p>
                  <p className="tw-cst-pf">
                    Country: {selectedUserData.country}
                  </p>
                  <p className="tw-cst-pf">
                    Age Group: {selectedUserData.grade.name}
                  </p>
                </div>
                <div className="tw-space-y-2">
                  <p className="tw-cst-pf">Parent1 Email</p>
                  <p className="tw-cst-pf">State: {selectedUserData.state}</p>
                  <p className="tw-cst-pf">Skill</p>
                </div>
                <div className="tw-space-y-2">
                  <p className="tw-cst-pf">Parent2</p>
                  <p className="tw-cst-pf">City: {selectedUserData.city}</p>
                  <p className="tw-cst-pf">Delivery Mode</p>
                </div>
                <div className="tw-space-y-2">
                  <p className="tw-cst-pf">Parent2 Email</p>
                  <div className="tw-flex">
                    <label className="tw-cst-pf">Languages:</label>
                    {selectedUserData.languagePreference?.map(
                      (language, index) => (
                        <div key={index} className="tw-ml-2">
                          {language.name}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="tw-relative">
              <label className="tw-absolute tw--top-2 tw-left-2 tw-z-40 tw-inline-block tw-bg-white tw-px-1 tw-text-xs tw-font-medium tw-text-gray-900">
                Course List
              </label>
              <ul className="tw-cst-pf !tw-border-2 tw-relative !tw-list-decimal !tw-list-inside tw-overflow-y-auto tw-w-[40%] tw-h-48 !tw-p-2 !tw-border-gray-500">
                {selectedStudentCourses.map((course, index) => (
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
            <StudentsCharts
              classesByCourses={classesByCourses}
              dailyExpenses={dailyExpenses}
              weekyExpenses={weekyExpenses}
              complaintsCount={complaintsCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
