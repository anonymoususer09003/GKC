import React, { useState, useEffect } from 'react';
import { base_url } from '@/api/client';
import axios from 'axios';
import { FinancialsChart } from '@/components/admin/FinancialsChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';

const Financials = () => {
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
    <div>
      <div className="tw-flex tw-justify-center tw-pt-2 tw-space-x-5">
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
      </div>
      <div className="tw-p-2 tw-rounded-3xl ">
        <FinancialsChart />
      </div>
    </div>
  );
};

export default Financials;
