import React, { useState, useEffect } from 'react';
import { apiClient, base_url } from '@/api/client';
import axios from 'axios';
import { FinancialsChart } from '@/components/admin/FinancialsChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useRouter } from 'next/router';

const filteredDataTest = [
  {
    date: '2023-09-08T16:57:58.019Z',
    count: 10,
  },
  {
    date: '2023-09-08T16:57:58.019Z',
    count: 5,
  },
  {
    date: '2023-09-08T16:57:58.019Z',
    count: 30,
  },
  {
    date: '2023-09-08T16:57:58.019Z',
    count: 20,
  },
  {
    date: '2023-09-08T16:57:58.019Z',
    count: 70,
  },
];

const Financials = () => {
  //protection starts
  const nav = useRouter()

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState();
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [grossRevenue, setGrossRevenue] = useState([]);
  const [netRevenue, setNetRevenue] = useState([]);
  const [totalPayout, setTotalPayout] = useState([]);
  const [taxTracking, setTaxTracking] = useState([]);
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

  const getFilterData = async () => {
    try {
      console.log(country, state, city, startDate, endDate);
      const filterData = {
        country,
        state,
        city,
        startDate,
        endDate,
      };
      const grossRevenueResponse = await apiClient.get(
        `${base_url}/admin/financial/gross-revenue`,
        filterData
      );
      const totalPayoutResponse = await apiClient.get(
        `${base_url}/admin/financial/total-payout`,
        filterData
      );
      const netRevenueResponse = await apiClient.get(
        `${base_url}/admin/financial/net-revenue`,
        filterData
      );
      const taxTrackingResponse = await apiClient.get(
        `${base_url}/admin/financial/tax-tracking`,
        filterData
      );
      setGrossRevenue(grossRevenueResponse.data);
      setTotalPayout(totalPayoutResponse.data);
      setNetRevenue(netRevenueResponse.data);
      setTaxTracking(taxTrackingResponse.data);
      console.log(
        'filter',
        grossRevenueResponse.data,
        totalPayoutResponse.data,
        netRevenueResponse.data,
        taxTrackingResponse.data
      );
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
      <div className="tw-p-2 tw-rounded-3xl ">
        <FinancialsChart
          grossRevenue={filteredDataTest}
          netRevenue={netRevenue}
          totalPayout={totalPayout}
          taxTracking={taxTracking}
        />
      </div>
    </div>
  );
};

export default Financials;
