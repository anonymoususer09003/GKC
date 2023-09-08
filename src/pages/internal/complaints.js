import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

const Complaints = () => {
  return (
    <>
      <div className="tw-divide-y tw-p-3 tw-w-full tw-h-full tw-divide-gray-200 tw-overflow-hidden tw-rounded-lg tw-shadow sm:tw-grid sm:tw-grid-cols-5 tw-gap-x-5 sm:tw-divide-y-0">
        <div className="tw-relative tw-space-y-5">
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
          <div className="tw-relative tw-h-[92%] tw-cst-pf !tw-border-2 tw-cst-pf !tw-border-black">
            <label className="tw-absolute tw--top-2 tw-left-4 tw-inline-block tw-bg-white tw-px-1 tw-text-xs tw-font-medium tw-text-gray-900">
              Complainant
            </label>
          </div>
        </div>

        <div className="tw-col-span-4 tw-p-4 tw-w-full tw-rounded-3xl tw-cst-pf !tw-border-2 !tw-border-black">
          <div className="tw-flex tw-mx-auto tw-space-x-10 tw-justify-center">
            <p className="tw-cst-pf">Refund Requested: $30</p>
            <button className="!tw-bg-gray-500 tw-cst-pf !tw-w-44 !tw-p-1 !tw-rounded-lg !tw-text-white">
              Close Complaints
            </button>
          </div>
          <div className="tw-grid tw-grid-cols-5 tw-grid-rows-5">
            <div className="tw-col-span-1 tw-row-span-3 tw-space-y-8 tw-text-lg tw-font-semibold">
              <div className="tw-space-y-2">
                <h1 className="tw-cst-pf">Email</h1>
                <h1 className="tw-cst-pf">User Type</h1>
                <h1 className="tw-cst-pf">Course Complaint</h1>
                <h1 className="tw-cst-pf">Course Date</h1>
              </div>
              <div className="tw-space-y-2">
                <h1 className="tw-cst-pf">Parent 1</h1>
                <h1 className="tw-cst-pf">Email Parent 1</h1>
                <h1 className="tw-cst-pf">Parent 2</h1>
                <h1 className="tw-cst-pf">Email Parent 2</h1>
                <h1 className="tw-cst-pf">Age Group</h1>
                <h1 className="tw-cst-pf">Skill</h1>
                <h1 className="tw-cst-pf">Delivery Mode</h1>
                <h1 className="tw-cst-pf">Language</h1>
              </div>
              <div className="tw-space-y-2">
                <h1 className="tw-cst-pf">Country</h1>
                <h1 className="tw-cst-pf">State</h1>
                <h1 className="tw-cst-pf">City</h1>
              </div>
            </div>
            <div className="tw-row-span-5 tw-col-span-4 !tw-p-3">
              <div className="tw-h-full tw-gap-y-4 tw-grid tw-grid-rows-5 tw-grid-cols-5">
                <div className="tw-row-span-3 tw-col-span-5 tw-space-y-7 tw-flex tw-flex-col tw-rounded-2xl !tw-px-1 tw-justify-center tw-cst-pf !tw-border-2 !tw-border-black">
                  <div className="tw-flex tw-p-3">
                    <div className="tw-w-full tw-relative">
                      <textarea
                        placeholder="Send us a message"
                        name="message"
                        className="tw-w-full !tw-p-2 tw-cst-pf !tw-border-2 !tw-border-black tw-rounded-2xl tw-h-full"
                        rows="5"
                      />
                      <p className="tw-absolute tw--top-6">
                        Complainant: John Dee
                      </p>
                      <p className="tw-absolute  tw--top-6 tw-right-0">
                        Date: 25/10/2023
                      </p>
                    </div>
                  </div>
                  <div className="tw-flex tw-p-3">
                    <div className="tw-w-full tw-relative">
                      <textarea
                        placeholder="Send us a message"
                        name="message"
                        className="tw-w-full !tw-p-2 !tw-border-2 tw-cst-pf !tw-border-black tw-rounded-2xl tw-h-full"
                        rows="5"
                      />
                      <p className="tw-absolute tw--top-6">
                        Responder: Ken Williams
                      </p>
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
                      className="tw-w-full !tw-p-2 tw-cst-pf !tw-border-2 !tw-border-black tw-rounded-2xl tw-h-full"
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
    </>
  );
};

export default Complaints;
