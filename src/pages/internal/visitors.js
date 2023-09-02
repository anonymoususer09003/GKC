import { VisitorsCharts } from '@/components/admin/VisitorsCharts';
import { VisitorsPieCharts } from '@/components/admin/VisitorsPieCharts';
import React, { useState, useEffect } from 'react';
import { base_url } from '@/api/client';
import axios from 'axios';

const Visitors = () => {
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
    <>
      <div className="tw-cst-pf tw-flex tw-space-x-5 tw-my-4 tw-justify-center">
        <select>
          <option disabled selected value="">
            User Type
          </option>
        </select>
        <select>
          <option disabled selected value="">
            Course
          </option>
        </select>
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
      </div>
      <div className="tw-grid tw-grid-cols-2">
        <div>
          <VisitorsPieCharts />
        </div>
        <div className="tw-cst-pf !tw-border-2 !tw-border-black tw-rounded-3xl">
          <VisitorsCharts />
        </div>
      </div>
    </>
  );
};

export default Visitors;
