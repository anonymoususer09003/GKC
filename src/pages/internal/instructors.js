import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { base_url } from '@/api/client';
import axios from 'axios';
import { InstructorsCharts } from '@/components/admin/InstructorsCharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';

const Instructors = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

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
    <div className="tw-cst-pf tw-w-full">
      <div className="tw-cst-pf tw-flex tw-justify-center tw-space-x-5">
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
      <div className="tw-divide-y tw-p-3 tw-w-full tw-h-full tw-divide-gray-200 tw-overflow-hidden tw-rounded-lg tw-shadow sm:tw-grid sm:tw-grid-cols-5 tw-gap-x-5 sm:tw-divide-y-0">
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

        <div className="tw-col-span-4 tw-cst-pf !tw-border-2 !tw-border-black tw-p-3 tw-rounded-3xl  ">
          <div className="tw-grid tw-h-full tw-grid-cols-3 tw-gap-y-7">
            <div className="tw-flex tw-justify-between tw-col-span-3">
              <div className="tw-cst-pf tw-space-y-2">
                <p className="tw-cst-pf">Hourly Rate</p>
                <p className="tw-cst-pf">Country</p>
                <p className="tw-cst-pf">Skill</p>
              </div>
              <div className="tw-space-y-2">
                <p className="tw-cst-pf"> Email</p>
                <p className="tw-cst-pf">State</p>
                <p className="tw-cst-pf">Delivery Mode</p>
              </div>
              <div className="tw-space-y-2">
                <p className="tw-cst-pf">Accepts Interviews</p>
                <p className="tw-cst-pf">City</p>
                <p className="tw-cst-pf">Language</p>
              </div>
              <div className="tw-space-y-2">
                <img
                  className="tw-w-44 tw-object-cover tw-rounded-full"
                  src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2831&q=80"
                />
              </div>
            </div>
            <div className="tw-relative">
              <label className="tw-absolute tw--top-2 tw-left-2 tw-z-40 tw-inline-block tw-bg-white tw-px-1 tw-text-xs tw-font-medium tw-text-gray-900">
                Course List
              </label>
              <ul className="tw-cst-pf !tw-border-2 tw-relative !tw-list-decimal !tw-list-inside tw-overflow-y-auto tw-w-[40%] tw-h-48 !tw-p-2 !tw-border-gray-500">
                <li className="tw-mt-2">Course 1</li>
                <li>Course 2</li>
                <li>Course 3</li>
                <li>Course 4</li>
                <li>Course 5</li>
                <li>Course 6</li>
                <li>Course 7</li>
                <li>Course 8</li>
                <li>Course 9</li>
              </ul>
            </div>

            <InstructorsCharts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructors;
