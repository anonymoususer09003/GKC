import React from 'react';

const Variables = () => {
  return (
    <div className="tw-w-[25%] tw-ml-[5%] tw-mt-[6%]">
      <div className="tw-flex tw-items-center tw-justify-between">
        <label className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
          Tax (%)
        </label>
        <div className="tw-mt-2 tw-w-24">
          <input
            type="number"
            name="Tax(%)"
            id="Tax(%)"
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
            className="tw-block tw-w-28  !tw-bg-[#f48342] tw-rounded-md  tw-px-3 tw-py-1.5 tw-text-center tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
          >
            Update
          </button>
        </div>
        <p className="tw-absolute tw--right-32">09/01/2023</p>
      </div>
      <div className="tw-flex tw-relative tw-items-center tw-justify-between">
        <label className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
          Privacy Policy Update
        </label>
        <div className="tw-mt-2">
          <button
            type="button"
            className="tw-block  tw-w-28  !tw-bg-[#f48342] tw-rounded-md  tw-px-3 tw-py-1.5 tw-text-center tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
          >
            Update
          </button>
        </div>
        <p className="tw-absolute tw--right-32">09/01/2023</p>
      </div>
    </div>
  );
};

export default Variables;
