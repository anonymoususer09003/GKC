import React from 'react';
import { apiClient } from '@/api/client';
import { base_url } from '@/api/client';
import { useState, useEffect } from 'react';

const Variables = () => {
  const loggedUserEmail = typeof window === 'undefined' ? null : window?.localStorage.getItem('email');
  const [loggedUserInfo, setLoggedUserInfo] = useState();
  const [taxValuePercentage, setTaxValuePercentage] = useState();
  const [feeValuePercentage, setFeeValuePercentage] = useState();
  const [paypalAmount, setPaypalAmount] = useState();
  const [additionalFeeAmount, setAdditionalFeeAmount] = useState();
  const [paypalFeePercentage, setPaypalFeePercentage] = useState();
  const [popupVisible, setPopupVisible] = useState(false);
  const [updateDates, setUpdateDates] = useState();

  const dataUpdatedPopup = () => {
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, 3000);
  };

  const getProfileInfo = async () => {
    if(
      loggedUserEmail === null
    ){
      console.log('waiting till global object window will load, so we can parse email item.')
    }else{
      try {
        const response = await apiClient.get(
          `${base_url}/admin/${loggedUserEmail}`
        );
        setLoggedUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const serviceUpdateEmail = async () => {
    try {
      const response = await apiClient.post(
        `${base_url}/admin/variable/send-terms-of-service-update-email`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateDates = async () => {
    try {
      const response = await apiClient.get(
        `${base_url}/admin/variable/terms-of-use-and-privacy-policy-update-dates`
      );
      setUpdateDates(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const privacyUpdateEmail = async () => {
    try {
      const response = await apiClient.post(
        `${base_url}/admin/variable/send-privacy-update-email`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getVariables = async () => {
    try {
      const response = await apiClient.get(
        `${base_url}/admin/financial/get-platform-fees`
      );
      setTaxValuePercentage(response.data.taxPercentage),
        setFeeValuePercentage(response.data.feePercentage),
        setPaypalAmount(response.data.paypalFeeAmount),
        setAdditionalFeeAmount(response.data.additionalFeeAmount),
        setPaypalFeePercentage(response.data.paypalFeePercentage);
    } catch (error) {
      console.log(error);
    }
  };

  const updateVariables = async () => {
    try {
      const queryParams = {
        taxValuePercentage,
        feeValuePercentage,
        paypalAmount,
        additionalFeeAmount,
        paypalFeePercentage,
        updatedBy: `${loggedUserInfo.firstName} ${loggedUserInfo.lastName}`,
      };
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
        .join('&');
      const response = await apiClient.put(
        `${base_url}/admin/variable/update-platform-fees?${queryString}`
      );
      setTaxValuePercentage(''),
        setFeeValuePercentage(''),
        setPaypalAmount(''),
        setAdditionalFeeAmount(''),
        setPaypalFeePercentage('');
      dataUpdatedPopup();
      getVariables();
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
      getProfileInfo();
      getVariables();
      UpdateDates();
    }, []);

  return (
    <div className=" tw-w-[25%] tw-ml-[5%] tw-mt-[6%]">
      <div className="tw-relative">
        <button
          onClick={updateVariables}
          type="button"
          className="tw-block tw-absolute -tw-right-72 -tw-top-10  tw-w-28  !tw-bg-[#f48342] tw-rounded-md  tw-px-3 tw-py-1.5 tw-text-center tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
        >
          Update
        </button>
      </div>
      <div className="tw-flex tw-items-center tw-justify-between">
        <label className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
          Tax (%)
        </label>
        <div className="tw-mt-2 tw-w-24">
          <input
            type="number"
            name="Tax(%)"
            id="Tax(%)"
            value={taxValuePercentage}
            onChange={(e) => setTaxValuePercentage(e.target.value)}
            className="tw-block tw-w-full tw-rounded-md !tw-border tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-indigo-600 sm:tw-text-sm sm:tw-leading-6"
          />
        </div>
      </div>

      <div className="tw-flex tw-items-center tw-justify-between">
        <label className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
          Fee (%)
        </label>
        <div className="tw-mt-2 tw-w-24">
          <input
            type="number"
            name="Fee (%)"
            id="Fee (%)"
            value={feeValuePercentage}
            onChange={(e) => setFeeValuePercentage(e.target.value)}
            className="tw-block tw-w-full tw-rounded-md !tw-border tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-indigo-600 sm:tw-text-sm sm:tw-leading-6"
          />
        </div>
      </div>
      <div className="tw-flex tw-items-center tw-justify-between">
        <label className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
          Fee ($)
        </label>
        <div className="tw-mt-2 tw-w-24">
          <input
            type="number"
            name="Fee ($)"
            id="Fee ($)"
            value={paypalAmount}
            onChange={(e) => setPaypalAmount(e.target.value)}
            className="tw-block tw-w-full tw-rounded-md !tw-border tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-indigo-600 sm:tw-text-sm sm:tw-leading-6"
          />
        </div>
      </div>
      <div className="tw-flex tw-items-center tw-justify-between">
        <label className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
          Paypal Fee (%)
        </label>
        <div className="tw-mt-2 tw-w-24">
          <input
            type="number"
            name="Paypal Fee (%)"
            id="Paypal Fee (%)"
            value={paypalFeePercentage}
            onChange={(e) => setPaypalFeePercentage(e.target.value)}
            className="tw-block tw-w-full tw-rounded-md !tw-border tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-indigo-600 sm:tw-text-sm sm:tw-leading-6"
          />
        </div>
      </div>
      <div className="tw-flex tw-items-center tw-justify-between">
        <label className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
          Paypal Fee ($)
        </label>
        <div className="tw-mt-2 tw-w-24">
          <input
            type="number"
            name="Paypal Fee ($)"
            id="Paypal Fee ($)"
            value={additionalFeeAmount}
            onChange={(e) => setAdditionalFeeAmount(e.target.value)}
            className="tw-block tw-w-full tw-rounded-md !tw-border tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-indigo-600 sm:tw-text-sm sm:tw-leading-6"
          />
        </div>
      </div>
      <div className="tw-flex tw-relative tw-items-center tw-justify-between">
        <label className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
          Terms of Use Update
        </label>
        <div className="tw-mt-2">
          <button
            type="button"
            onClick={serviceUpdateEmail}
            className="tw-block tw-w-28  !tw-bg-[#f48342] tw-rounded-md  tw-px-3 tw-py-1.5 tw-text-center tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
          >
            Update
          </button>
        </div>
        <p className="tw-absolute tw-top-[30%] tw--right-32">
          {updateDates?.lastTermsOfServiceUpdate}
        </p>
      </div>
      <div className="tw-flex tw-relative tw-items-center tw-justify-between">
        <label className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
          Privacy Policy Update
        </label>
        <div className="tw-mt-2">
          <button
            onClick={privacyUpdateEmail}
            type="button"
            className="tw-block  tw-w-28  !tw-bg-[#f48342] tw-rounded-md  tw-px-3 tw-py-1.5 tw-text-center tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
          >
            Update
          </button>
        </div>
        <p className="tw-absolute tw-top-[30%] tw--right-32">
          {updateDates?.lastPrivacyPolicyUpdate}
        </p>
      </div>
      {popupVisible && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '55px',
            backgroundColor: 'white',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          Your payment info has been updated successfully ✔️
        </div>
      )}
    </div>
  );
};

export default Variables;
