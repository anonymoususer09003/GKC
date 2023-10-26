import React, { useState, useEffect } from 'react';
import { apiClient, base_url } from '@/api/client';
import axios from 'axios';
import { FinancialsChart } from '@/components/admin/FinancialsChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useRouter } from 'next/router';
import moment from 'moment';
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
  const nav = useRouter();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState('Select Country');
  const [state, setState] = useState('Select State');
  const [city, setCity] = useState('Select City');
  const [startDate, setStartDate] = useState(new Date('2023-09-01'));
  const [endDate, setEndDate] = useState(new Date());
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

  const getFilterData = async () => {
    try {
      let date = moment(endDate, 'YYYY-MM-DD');

      // Add one day to the date
      const newendDate = date.add(1, 'days').format('YYYY-MM-DD');
      const filterData = {
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: newendDate,
      };
      const queryString = new URLSearchParams(filterData);
      country !== 'Select Country' && queryString.append('country', country);
      state !== 'Select State' && queryString.append('state', state);
      city !== 'Select City' && queryString.append('city', city);
      const grossRevenueResponse = await apiClient.get(
        `${base_url}/admin/financial/gross-revenue?`,
        filterData
      );
      const totalPayoutResponse = await apiClient.get(
        `${base_url}/admin/financial/total-payout?` + queryString.toString()
      );
      const netRevenueResponse = await apiClient.get(
        `${base_url}/admin/financial/net-revenue?` + queryString.toString()
      );
      const taxTrackingResponse = await apiClient.get(
        `${base_url}/admin/financial/tax-tracking?` + queryString.toString()
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
  return (
    <div>
      <div className="tw-flex tw-justify-center tw-pt-2 tw-space-x-5">
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
          grossRevenue={grossRevenue}
          netRevenue={netRevenue}
          totalPayout={totalPayout}
          taxTracking={taxTracking}
        />
      </div>
    </div>
  );
};

export default Financials;
