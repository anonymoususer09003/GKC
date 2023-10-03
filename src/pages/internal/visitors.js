import { VisitorsCharts } from '@/components/admin/VisitorsCharts';
import { VisitorsPieCharts } from '@/components/admin/VisitorsPieCharts';
import React, { useState, useEffect } from 'react';
import { apiClient, base_url } from '@/api/client';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useRouter } from 'next/router';

const Visitors = () => {
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
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [ageGroupData, setAgeGroupData] = useState([]);
  const [skillLevelData, setSkillLevelData] = useState([]);
  const [deliveryModeData, setDeliveryModeData] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  const [studentsCountData, setStudentsCountData] = useState([]);
  const [instructorsCountData, setInstructorsCountData] = useState([]);
  const [classesCountData, setClassesCountData] = useState([]);
  const [complaintsCountData, setComplaintsCountData] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);

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
  function generateChartData(dataArr) {
    const chartData = {
      labels: dataArr.map((item) => item.groupingFilterName),
      datasets: [
        {
          data: dataArr.map((item) => item.count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderWidth: 1,
        },
      ],
    };
    return chartData;
  }
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

  const getCoursesWithInstructors = async () => {
    try {
      const response = await axios.get(
        `${base_url}/public/course/with-instructors`
      );
      setCoursesWithInstructors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getFilterData = async () => {
    try {
      const pieQueryParams = new URLSearchParams({
        courseId: selectedCourseId,
        // country,
        // state,
        // city,
      });
      const lineQueryParams = new URLSearchParams({
        // courseId: selectedCourseId,
        // country,
        // state,
        // city,
        // startDate,
        // endDate,
      });
      const ageGroupResponse = await apiClient.get(
        `${base_url}/admin/visitor/count-students-registered-by-age-group?${pieQueryParams.toString()}`
      );
      const skillLevelResponse = await apiClient.get(
        `${base_url}/admin/visitor/count-students-registered-by-proficiency?${pieQueryParams.toString()}`
      );
      const deliveryModeResponse = await apiClient.get(
        `${base_url}/admin/visitor/count-instructors-registered-by-delivery-mode?${pieQueryParams.toString()}`
      );
      const languagesResponse = await apiClient.get(
        `${base_url}/admin/visitor/count-students-registered-by-language?${pieQueryParams.toString()}`
      );
      const studentCountResponse = await apiClient.get(
        `${base_url}/admin/visitor/count-students-registered-by-age-group-and-date?${lineQueryParams.toString()}`
      );
      const instructorsCountResponse = await apiClient.get(
        `${base_url}/admin/visitor/count-instructors-registered?${lineQueryParams.toString()}`
      );
      const classesCountResponse = await apiClient.get(
        `${base_url}/admin/visitor/count-classes?${lineQueryParams.toString()}`
      );
      const complaintsCountResponse = await apiClient.get(
        `${base_url}/admin/count-complaints`
      );
      setAgeGroupData(ageGroupResponse.data);
      setSkillLevelData(skillLevelResponse.data);
      setDeliveryModeData(deliveryModeResponse.data);
      setLanguageData(languagesResponse.data);
      setStudentsCountData(studentCountResponse.data);
      setInstructorsCountData(instructorsCountResponse.data);
      setClassesCountData(classesCountResponse.data);
      setComplaintsCountData(complaintsCountResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCourseChange = (e) => {
    const newSelectedCourse = e.target.value;
    setSelectedCourse(newSelectedCourse);
    const selectedCourseObject = coursesWithInstructors.find(
      (course) => course.name === newSelectedCourse
    );
    setSelectedCourseId(selectedCourseObject.id);
  };

  useEffect(() => {
    getCountries();
    getCoursesWithInstructors();
    getFilterData();
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
  const languageCount = generateChartData(languageData);
  let backgroundCount = 0;
  return (
    <>
      <div className="tw-cst-pf tw-flex tw-space-x-5 tw-my-4 tw-justify-center">
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
        <div className="tw-relative">
          <DatePicker
            placeholderText="Select start date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <AiOutlineCalendar className="tw-absolute tw-right-1 tw-top-3 tw-h-5 tw-w-5" />
        </div>
        <div className="tw-relative">
          <DatePicker
            placeholderText="Select end date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
          <AiOutlineCalendar className="tw-absolute tw-right-1 tw-top-3 tw-h-5 tw-w-5" />
        </div>
        <button
          onClick={getFilterData}
          type="button"
          className="tw-block tw-w-28  !tw-bg-[#f48342] tw-rounded-md  tw-px-3 tw-py-1.5 tw-text-center tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
        >
          Search
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        <div>
          <VisitorsPieCharts
            ageGroupData={ageGroupData}
            skillLevelData={skillLevelData}
            deliveryModeData={deliveryModeData}
            languageData={languageData}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              height: '300px',
              maxHeight: '300px',
              overflow: 'scroll',
              marginTop: '300px',
              border: '2px solid black',
              marginRight: 10,
              borderRadius: 10,
            }}
          >
            {languageCount?.labels?.map((label, index) => {
              backgroundCount = backgroundCount > 4 ? 0 : backgroundCount + 1;

              const backgroundColor =
                languageCount?.datasets[0]?.backgroundColor[backgroundCount];
              return (
                <div
                  key={index}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  {label}
                  <div
                    style={{
                      marginLeft: '10px',
                      border: `1px solid black`,
                      backgroundColor: backgroundColor,
                      width: '50px',
                      height: '10px',
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="tw-cst-pf !tw-border-2 !tw-border-black tw-rounded-3xl">
            <VisitorsCharts
              studentsCountData={studentsCountData}
              instructorsCountData={instructorsCountData}
              classesCountData={classesCountData}
              complaintsCountData={complaintsCountData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Visitors;
