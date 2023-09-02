import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

const ContactUs = () => {
  return (
    <div className="tw-divide-y tw-p-3 tw-w-full tw-h-full tw-divide-gray-200 tw-overflow-hidden tw-rounded-lg  tw-shadow sm:tw-grid sm:tw-grid-cols-5 tw-gap-x-5 sm:tw-divide-y-0">
      {/* <div className="relative space-y-5">
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
        <div className="border-2 overflow-y-auto  h-[80vh] w-full border-gray-500">
          <p className="">Hi </p>
        </div>
      </div> */}
      <div className="tw-relative  tw-space-y-5">
        <div className="tw-relative tw-border-2 tw-border-black tw-h-12 tw-w-full">
          <label className="tw-sr-only">Search</label>
          <MagnifyingGlassIcon
            className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-1 tw-h-full tw-w-5 tw-text-gray-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="tw-block tw-h-full tw-w-full tw-border-0 tw-py-0 tw-pr-0 tw-text-gray-900 placeholder:tw-text-gray-400 focus:tw-ring-0 sm:tw-text-sm"
            placeholder="Search..."
            type="search"
            name="search"
          />
        </div>
        <div className="!tw-border-2 tw-cst-pf tw-overflow-y-auto tw-h-[80vh] tw-w-full !tw-border-gray-500">
          <p className="">Hi</p>
        </div>
      </div>

      {/* <div className="col-span-4 p-4 rounded-3xl !border-2 !border-black">
        <div className="grid grid-cols-5 grid-rows-5">
          <div className="col-span-1 row-span-3 space-y-4 text-lg font-semibold">
            <h1>Email</h1>
            <h1>User Type</h1>
            <h1>Course Complaint</h1>
            <h1>Parent 1</h1>
            <h1>Email Parent 1</h1>
            <h1>Parent 2</h1>
            <h1>Email Parent 2</h1>
            <h1>Age Group</h1>
            <h1>Skill</h1>
            <h1>Delivery Mode</h1>
          </div>
          <div className="row-span-5 col-span-4 p-3">
            <div className="h-full gap-y-4 grid grid-rows-5 grid-cols-5">
              <div className="row-span-3 col-span-5 space-y-7 flex flex-col rounded-2xl px-1 py-4 border-2 border-black">
                <div className="flex">
                  <div className="space-y-8 mt-3 px-2">
                    <div className="flex flex-col h-10 items-center">
                      <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label>Reply</label>
                    </div>
                    <div className="flex flex-col h-6 items-center">
                      <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <h1>Close</h1>
                    </div>
                  </div>
                  <div className="w-full relative">
                    <textarea
                      placeholder="Send us a message"
                      name="message"
                      className="w-full !border-2 !border-black  rounded-2xl  h-full"
                      rows="5"
                    />
                    <p className="absolute -top-6">Status: closed</p>
                    <p className="absolute -top-6 right-0">Date: 25/10/2023</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="space-y-8 mt-3 px-2">
                    <div className="flex flex-col h-10 items-center">
                      <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label>Reply</label>
                    </div>
                    <div className="flex flex-col h-6 items-center">
                      <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <h1>Close</h1>
                    </div>
                  </div>
                  <div className="w-full relative">
                    <textarea
                      placeholder="Send us a message"
                      name="message"
                      className="w-full !border-2 !border-black rounded-2xl  h-full"
                      rows="5"
                    />
                    <p className="absolute -top-6">Status: closed</p>
                    <p className="absolute -top-6 right-0">Date: 25/10/2023</p>
                  </div>
                </div>
              </div>
              <div className="row-span-2 col-start-2 col-end-6 col-span-4">
                <div>
                  <textarea
                    placeholder="Send us a message"
                    name="message"
                    className="w-full !border-2 !border-black rounded-2xl  h-full"
                    rows="6"
                  />
                </div>
                <div className="flex justify-end mt-10">
                  <button className="bg-gray-500 w-32 p-1 rounded-lg text-white ">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="tw-col-span-4 tw-cst-pf tw-p-4 tw-rounded-3xl tw-cst-pf  !tw-border-2 !tw-border-black">
        <div className="tw-grid tw-cst-pf tw-grid-cols-5 tw-grid-rows-5">
          <div className="tw-col-span-1 tw-cst-pf tw-row-span-3 tw-space-y-4 tw-text-lg tw-font-semibold">
            <h5>Email</h5>
            <h5>User Type</h5>
            <h5>Course Complaint</h5>
            <h5>Parent 1</h5>
            <h5>Email Parent 1</h5>
            <h5>Parent 2</h5>
            <h5>Email Parent 2</h5>
            <h5>Age Group</h5>
            <h5>Skill</h5>
            <h5>Delivery Mode</h5>
          </div>
          <div className="tw-row-span-5 tw-col-span-4 tw-p-3">
            <div className="tw-h-full tw-gap-y-4 tw-grid tw-grid-rows-5 tw-grid-cols-5">
              <div className="tw-row-span-3 tw-col-span-5 tw-space-y-7 tw-flex tw-flex-col tw-rounded-2xl tw-px-1 tw-justify-center tw-cst-pf !tw-border-2 !tw-border-black">
                <div className="tw-flex">
                  <div className="tw-space-y-8 tw-mt-3 tw-px-2">
                    <div className="tw-cst-pf tw-flex tw-flex-col tw-h-10 tw-items-center">
                      <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="tw-cst-pf !tw-border-2 tw-h-5 tw-w-5 tw-rounded !tw-border-gray-300 tw-text-indigo-600 focus:tw-ring-indigo-600"
                      />
                      <label>Reply</label>
                    </div>
                    <div className="tw-flex tw-flex-col tw-h-6 tw-items-center">
                      <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="tw-cst-pf !tw-border-2 tw-h-5 tw-w-5 tw-rounded !tw-border-gray-300 tw-text-indigo-600 focus:tw-ring-indigo-600"
                      />
                      <label>Close</label>
                    </div>
                  </div>
                  <div className="tw-w-full tw-relative">
                    <textarea
                      placeholder="Send us a message"
                      name="message"
                      className="tw-w-full !tw-border-2 !tw-border-black tw-rounded-2xl tw-h-full"
                      rows="5"
                    />
                    <p className="tw-absolute tw--top-6">Status: closed</p>
                    <p className="tw-absolute tw--top-6 tw-right-0">
                      Date: 25/10/2023
                    </p>
                  </div>
                </div>
                <div className="tw-flex">
                  <div className="tw-space-y-8 tw-mt-3 tw-px-2">
                    <div className="tw-flex tw-flex-col tw-h-10 tw-items-center">
                      <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="tw-cst-pf tw-h-4 tw-w-4 tw-rounded !tw-border-2 !tw-border-gray-300 tw-text-indigo-600 focus:tw-ring-indigo-600"
                      />
                      <label>Reply</label>
                    </div>
                    <div className="tw-flex tw-flex-col tw-h-6 tw-items-center">
                      <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="tw-cst-pf tw-h-4 tw-w-4 tw-rounded !tw-border-2 !tw-border-gray-300 tw-text-indigo-600 focus:rw-ring-indigo-600"
                      />
                      <label>Close</label>
                    </div>
                  </div>
                  <div className="tw-w-full tw-relative">
                    <textarea
                      placeholder="Send us a message"
                      name="message"
                      className="tw-w-full tw-border-2 tw-border-black tw-rounded-2xl tw-h-full"
                      rows="5"
                    />
                    <p className="tw-absolute tw--top-6">Status: closed</p>
                    <p className="tw-absolute tw--top-6 tw-right-0">
                      Date: 25/10/2023
                    </p>
                  </div>
                </div>
              </div>
              <div className="tw-row-span-2 tw-col-start-2 tw-col-end-6 tw-col-span-4">
                <div>
                  <textarea
                    placeholder="Send us a message"
                    name="message"
                    className="tw-w-full tw-border-2 tw-border-black tw-rounded-2xl tw-h-full"
                    rows="6"
                  />
                </div>
                <div className="tw-flex tw-justify-end tw-mt-10">
                  <button className="tw-bg-gray-500 tw-w-32 tw-p-1 tw-rounded-lg tw-text-white">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
