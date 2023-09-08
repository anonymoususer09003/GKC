import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { base_url } from '@/api/client';
import axios from 'axios';
import { CourseChart } from '@/components/admin/CoursesChart';

const Courses = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

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

  useEffect(() => {
    getCountries();
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
      <div className="tw-flex tw-space-x-5">
        <select onChange={(e) => setCountry(e.target.value)} className=" ">
          <option value="">Select Country</option>
          {countries.map((country, i) => {
            return (
              <option value={country.name} key={i}>
                {country.name}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => setState(e.target.value)} className=" ">
          <option value="">Select State</option>
          {states.map((v, i) => {
            return (
              <option value={v.name} key={i}>
                {v.name}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => setCity(e.target.value)} className="">
          <option value="">Select City</option>
          {cities.map((v, i) => {
            return (
              <option value={v.name} key={i}>
                {v.name}
              </option>
            );
          })}
        </select>
        <select className="">
          <option disabled selected value="">
            Select Language
          </option>
        </select>
        <select className="">
          <option disabled selected value="">
            Age Group
          </option>
        </select>
        <select className="">
          <option disabled selected value="">
            Skill Level
          </option>
        </select>
      </div>
      {/* <div className="divide-y p-3 w-full h-full divide-gray-200 overflow-hidden rounded-lg  shadow sm:grid sm:grid-cols-5 gap-x-5 sm:divide-y-0">
        <div className="relative w-full">
          <div className="relative border-2 border-black h-12 w-full">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <MagnifyingGlassIcon
              className="pointer-events-none absolute inset-y-0 right-1 h-full w-5 text-gray-400"
              aria-hidden="true"
            />
            <input
              id="search-field"
              className="block h-full w-full border-0 py-0 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Search..."
              type="search"
              name="search"
            />
          </div>
          <RiDeleteBin6Line className="ml-auto h-5 w-5 cursor-pointer my-1" />
          <div className="border-2 overflow-y-auto h-[80vh] w-full border-gray-500">
            <p className=""></p>
          </div>
          <div className="mt-3 gap-x-4 flex mx-auto">
            <input
              type="text"
              placeholder="Enter New Course Name"
              className="text-[13px] rounded-md  px-2 py-1.5 text-sm font-semibold leading-6 text-black !border-2 !border-black shadow-sm "
            />

            <button
              type="button"
              className=" !bg-[#f48342] text-[13px] rounded-md  px-2 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 "
            >
              Update
            </button>
          </div>
        </div>
        <div className="col-span-4 p-4 rounded-3xl ">
          <CourseChart />;
        </div>
      </div> */}
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
          <RiDeleteBin6Line className="tw-flex tw-justify-end tw-ml-auto tw-h-5 tw-w-5 tw-cursor-pointer tw-my-1" />
          <div className="!tw-border-2 tw-cst-pf tw-overflow-y-auto tw-h-[80vh] tw-w-full !tw-border-gray-500">
            <p className=""></p>
          </div>
          <div className="tw-mt-3 tw-gap-x-4 tw-flex tw-mx-auto">
            <input
              type="text"
              placeholder="Enter New Course Name"
              className="tw-text-[13px] tw-rounded-md tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-leading-6 tw-text-black !tw-border-2 !tw-border-black tw-shadow-sm"
            />
            <button
              type="button"
              className="!tw-bg-[#f48342] tw-text-[13px] tw-rounded-md tw-px-2 tw-py-1.5 tw-text-center tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2"
            >
              Update
            </button>
          </div>
        </div>
        <div className="tw-col-span-4 tw-p-4 tw-rounded-3xl">
          <CourseChart />
        </div>
      </div>
    </div>
  );
};

export default Courses;
