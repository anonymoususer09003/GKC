import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';

export default function Modal({ open, setOpen, selectedInstructor }) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="tw-relative tw-z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="tw-ease-out tw-duration-300"
          enterFrom="tw-opacity-0"
          enterTo="tw-opacity-100"
          leave="tw-ease-in tw-duration-200"
          leaveFrom="tw-opacity-100"
          leaveTo="tw-opacity-0"
        >
          <div className="tw-fixed tw-inset-0 tw-bg-gray-500 tw-bg-opacity-75 tw-transition-opacity" />
        </Transition.Child>

        <div className="tw-fixed tw-inset-0 tw-z-10 tw-w-screen tw-overflow-y-auto">
          <div className="tw-flex tw-min-h-full tw-items-end tw-justify-center tw-p-4 tw-text-center sm:tw-items-center sm:tw-p-0">
            <Transition.Child
              as={Fragment}
              enter="tw-ease-out tw-duration-300"
              enterFrom="tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95"
              enterTo="tw-opacity-100 tw-translate-y-0 sm:tw-scale-100"
              leave="tw-ease-in tw-duration-200"
              leaveFrom="tw-opacity-100 tw-translate-y-0 sm:tw-scale-100"
              leaveTo="tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95"
            >
              <Dialog.Panel className="tw-relative tw-transform tw-overflow-hidden tw-rounded-lg tw-bg-white tw-px-4 tw-pb-4 tw-pt-5 tw-text-left tw-shadow-xl tw-transition-all sm:tw-my-8 sm:tw-w-full tw-max-w-2xl sm:tw-p-6">
                <div className="sm:tw-flex tw-sm-items-start tw-justify-between">
                  {/* <div className="tw-mx-auto tw-flex tw-h-12 tw-w-12 tw-flex-shrink-0 tw-items-center tw-justify-center tw-rounded-full tw-bg-red-100 sm:tw-mx-0 sm:tw-h-10 sm:tw-w-10"></div> */}
                  <div className="tw-flex">
                    <div className="tw-mx-auto tw-flex tw-h-12 tw-w-12 tw-flex-shrink-0 tw-items-center tw-justify-center tw-rounded-full tw-bg-red-100 sm:tw-mx-0 sm:tw-h-10 sm:tw-w-10">
                      <img
                        src={selectedInstructor?.instructorPhoto}
                        className="tw-h-16 tw-w-16 tw-text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="tw-mt-3 tw-text-center sm:tw-ml-4 sm:tw-mt-0 sm:tw-text-left">
                      <Dialog.Title
                        as="h3"
                        className="tw-text-lg tw-font-semibold tw-leading-6 tw-text-gray-900"
                      >
                        {selectedInstructor?.firstName}{' '}
                        {selectedInstructor?.lastName}
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="tw-text-lg">
                    {/* <StarIcon className="h-4 w-4 tw-text-yellow-300" /> */}
                    <p>⭐️ {selectedInstructor?.averageRating}/5</p>
                  </div>
                  <p className="tw-text-lg">
                    ${selectedInstructor?.hourlyRate}/hr
                  </p>
                  <p className="tw-text-lg">Reviews</p>
                </div>
                <div className="tw-my-5 tw-overflow-y-auto tw-cst-pf tw-rounded-xl p-2 !tw-border-2 !tw-border-black tw-h-60">
                  <p className="tw-text-xl tw-text-gray-500">
                    {selectedInstructor?.instructorBio}
                  </p>
                </div>
                <div className="tw-space-y-1 tw-text-lg">
                  <div className="tw-flex">
                    <label className="tw-font-semibold tw-mr-2">Courses:</label>
                    {selectedInstructor?.coursesToTutorAndProficiencies.map(
                      (course, index) => (
                        <div key={index} className="tw-flex tw-mr-1">
                          {course.course.name}
                        </div>
                      )
                    )}
                  </div>
                  <div className="tw-flex tw-space-x-2">
                    <label className="tw-font-semibold">Mode:</label>
                    {selectedInstructor?.deliveryModes.map((mode, index) => (
                      <div key={index}>{mode.name}</div>
                    ))}
                  </div>
                  <div className="tw-flex tw-space-x-2">
                    <label className="tw-font-semibold">Fluent in:</label>
                    {selectedInstructor?.languagePreference.map(
                      (language, index) => (
                        <div key={index}>{language.name}</div>
                      )
                    )}
                  </div>
                  <div className="tw-mt-5 sm:tw-mt-4 sm:tw-flex sm:tw-flex-row-reverse">
                    <button
                      type="button"
                      className="tw-mt-3 tw-inline-flex tw-w-full tw-justify-center tw-rounded-md tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-font-semibold tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 hover:tw-bg-gray-50 sm:tw-mt-0 sm:tw-w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
