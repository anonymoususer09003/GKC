import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { apiClient, base_url } from '@/api/client';
import axios from 'axios';
import { StudentsCharts } from '@/components/admin/StudentsCharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useRouter } from 'next/router';
import moment from 'moment';
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid';
import useDebounce from '@/hooks/use-debounce';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Students = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const size = 30;
  const [search, setSearch] = useState('');
  const debouncedInputValue = useDebounce(search, 300); //
  const [startDate, setStartDate] = useState(new Date('2023-09-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState('Select Country');
  const [state, setState] = useState('Select State');
  const [city, setCity] = useState('Select City');
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState();
  const [selectedUserData, setSelectedUserData] = useState();
  const [languagesWithInstructors, setLanguagesWithInstructors] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('Select Language');
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('Select Grade');
  const [allSkillLevels, setAllSkillLevels] = useState([]);
  const [selectedSkillLevel, setSelectedSkillLevel] =
    useState('Select Proficiency');
  const [selectedStudentCourses, setSelectedStudentCourses] = useState([]);
  const [classesByCourses, setClassesByCourses] = useState([]);
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [weekyExpenses, setWeekyExpenses] = useState([]);
  const [complaintsCount, setComplaintsCount] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);
  console.log('slected user data', selectedUserData);
  const handleSelectedStudent = (student) => {
    setSelectedStudentId(student.id);
  };

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

  const getStates = async () => {
    try {
      const response = await axios.get(
        `${base_url}/public/location/get-states?countryName=${country}`
      );
      setCity('Select City');
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
    getAllStudents(debouncedInputValue);
  }, [currentPage, debouncedInputValue]);
  console.log(
    'slected prof',
    selectedGrade,
    selectedLanguage,
    selectedSkillLevel
  );
  const getAllStudents = async (debouncedInputValue) => {
    try {
      const body = {
        page: currentPage - 1,
        size: 20,
        sort: ['ASC'],
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).add(1, 'days').format('YYYY-MM-DD'),
      };
      const queryString = new URLSearchParams(body);
      debouncedInputValue && queryString.append('name', debouncedInputValue);
      country != 'Select Country' && queryString.append('country', country);
      state != 'Select State' && queryString.append('state', state);
      city != 'Select City' && queryString.append('city', city);
      selectedLanguage &&
        queryString.append(
          'languageId',
          languagesWithInstructors.find(
            (item) => (item.name = selectedLanguage)
          )?.id
        );
      selectedSkillLevel &&
        queryString.append(
          'proficiencyId',
          allSkillLevels.find((item) => (item.name = selectedSkillLevel))?.id
        );
      selectedGrade &&
        queryString.append(
          'gradeId',
          allGrades.find((item) => (item.name = selectedGrade))?.id
        );

      const url = `${base_url}/admin/student/?${queryString.toString()}`;
      const response = await apiClient.get(url);
      setStudents(response.data.content);
      const totalRecords = response?.data?.totalElements; // Replace with the actual total number of records
      const recordsPerPage = size; // Replace with the number of records shown on each page

      const totalPages = Math.ceil(totalRecords / recordsPerPage);

      setTotalCount(totalPages);
=
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

  useEffect(() => {
    if (selectedStudentId) fetchDailyClasses();
  }, [selectedStudentCourses, startDate, endDate, selectedStudentId]);

  const fetchDailyClasses = async () => {
    const responses = [];
    let temp = {};

    try {
      let startdate = moment(startDate).format('YYYY-MM-DD');
      const enddate = moment(endDate).add(1, 'days').format('YYYY-MM-DD');
      let url = `${base_url}/admin/student/count-classes/${selectedStudentId}?&startDate=${startdate}&endDate=${enddate}`;
      selectedStudentCourses.map((item, index) => {
        url = url + `&coursesId=${item?.id}`;
      });

      // coursesId=8&coursesId=9
      const response = await apiClient.get(url);

      response?.data?.map((item, index) => {
        let course = selectedStudentCourses?.find(
          (item1) => item1.id == item.courseId
        );

        if (temp[item?.courseId]) {
          let tempValue = { ...temp[item?.courseId] };
          tempValue.classData = [...tempValue?.classData, item];
          temp[item?.courseId] = tempValue;
        } else {
          temp[item?.courseId] = {
            className: course?.name,
            classData: [item],
          };
        }
      });
      selectedStudentCourses.map((item) => {
        if (!temp[item?.id]) {
          temp[item?.id] = {
            className: item?.name,
            classData: [],
          };
        }
      });

      const responseDataWithCourseName = {
        className: selectedStudentCourses.name,
        classData: response.data,
      };
      responses.push(responseDataWithCourseName);
      let tempArr = [];
      Object.keys(temp).map((key) => {
        tempArr.push(temp[key]);
      });
      setClassesByCourses(tempArr);
    } catch (error) {
      console.error(
        `Error fetching data for course ${selectedStudentCourses.name}:`,
        error
      );
    }
  };

  // const fetchDailyClasses = async () => {
  //   const responses = [];
  //   for (const selectedStudentCourse of selectedStudentCourses) {
  //     try {
  //       const response = await apiClient.get(
  //         `${base_url}/admin/student/count-classes/${selectedStudentId}/${selectedStudentCourse.id}`
  //       );
  //       const responseDataWithCourseName = {
  //         className: selectedStudentCourse.name,
  //         classData: response.data,
  //       };
  //       responses.push(responseDataWithCourseName);
  //     } catch (error) {
  //       console.error(
  //         `Error fetching data for course ${selectedStudentCourse.name}:`,
  //         error
  //       );
  //     }
  //   }
  //   setClassesByCourses(responses);
  // };

  const getFilterData = async () => {
    try {
      const filterData = {
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).add(1, 'days').format('YYYY-MM-DD'),
      };
      const queryParams = new URLSearchParams(filterData);

      const dailyExpensesResponse = await apiClient.get(
        `${base_url}/admin/student/daily-expense-amount/${selectedStudentId}/?${queryParams.toString()}`
      );
      const weekyExpensesResponse = await apiClient.get(
        `${base_url}/admin/student/weekly-expense-amount/${selectedStudentId}/?${queryParams.toString()}`
      );
      const complaintsCountResponse = await apiClient.get(
        `${base_url}/admin/count-complaints/?${queryParams.toString()}`
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

  useEffect(() => {
    if (true || selectedStudentId) getFilterData();
  }, [startDate, endDate, selectedStudentId]);

  return (
    <div>
      <div className="tw-flex tw-justify-center tw-space-x-5">
        <select
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
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option>Select City</option>
          {cities.map((city, index) => (
            <option value={city.name} key={index}>
              {city.name}
            </option>
          ))}
        </select>
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option>Select language</option>
          {languagesWithInstructors.map((language, index) => (
            <option key={index}>{language.name}</option>
          ))}
        </select>
        <select value={selectedGrade} onChange={handleGradeChange}>
          <option>Select Grade</option>
          {allGrades.map((grade, index) => (
            <option key={index}>{grade.name}</option>
          ))}
        </select>
        <select value={selectedSkillLevel} onChange={handleProficiencyChange}>
          <option>Select Proficiency</option>
          {allSkillLevels.map((skill, index) => (
            <option key={index}>{skill.name}</option>
          ))}
        </select>
        <button
          onClick={() => getAllStudents()}
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
              onChange={(e) => setSearch(e.target.value)}
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
                    {student?.firstName} {student?.lastName}
                  </li>
                </ul>
              ))}
            </div>
            <nav className="tw-absolute tw-bottom-4 tw-w-full tw-border-t tw-border-gray-200 tw-px-4 sm:tw-px-0">
              <div className="tw-hidden md:tw--mt-px md:tw-flex">
                {totalCount > 1 && (
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
                )}
                {Array.from({ length: totalCount }, (_, index) => (
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

                {totalCount > 1 && (
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
                )}
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
                  <p className="tw-cst-pf">
                    Parent1:{' '}
                    {selectedUserData?.parents?.length > 0 &&
                      selectedUserData?.parents[0]?.firstName +
                        ' ' +
                        selectedUserData?.parents[0]?.lastName}
                  </p>
                  <p className="tw-cst-pf">
                    Country: {selectedUserData.country}
                  </p>
                  <p className="tw-cst-pf">
                    Age Group: {selectedUserData.grade.name}
                  </p>
                </div>
                <div className="tw-space-y-2">
                  <p className="tw-cst-pf">
                    Parent1 Email:{' '}
                    {selectedUserData?.parents?.length > 0 &&
                      selectedUserData?.parents[0]?.email}
                  </p>
                  <p className="tw-cst-pf">State: {selectedUserData.state}</p>
                </div>
                <div className="tw-space-y-2">
                  <p className="tw-cst-pf">
                    Parent2:{' '}
                    {selectedUserData?.parents?.length > 1 &&
                      selectedUserData?.parents[1]?.firstName +
                        ' ' +
                        selectedUserData?.parents[1]?.lastName}
                  </p>
                  <p className="tw-cst-pf">City: {selectedUserData.city}</p>
                </div>
                <div className="tw-space-y-2">
                  <p className="tw-cst-pf">
                    Parent2 Email:{' '}
                    {selectedUserData?.parents?.length > 1 &&
                      selectedUserData?.parents[1]?.email}
                  </p>
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
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
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
