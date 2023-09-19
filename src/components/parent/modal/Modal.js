import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BiMessageAlt } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';
import StarRatings from 'react-star-ratings';
import { apiClient } from '@/api/client';

export default function Modal({ open, setOpen, selectedInstructor }) {
  const cancelButtonRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = async () => {
    try {
      const response = await apiClient.get(
        `/review/instructors/${selectedInstructor.id}?page=0&size=10`
      );
      setOpen(false);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
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
                    <button
                      className="m-0 p-0 bg_secondary border-0 text-white p-2 rounded d-flex align-items-center gap-2"
                      onClick={() => handleOpenModal()}
                    >
                      <BiMessageAlt style={{ fontSize: '22px' }} />
                      Reviews
                    </button>
                  </div>
                  <div className="tw-my-5 tw-overflow-y-auto tw-cst-pf tw-rounded-xl p-2 !tw-border-2 !tw-border-black tw-h-60">
                    <p className="tw-text-xl tw-text-gray-500">
                      {selectedInstructor?.instructorBio}
                    </p>
                  </div>
                  <div className="tw-space-y-1 tw-text-lg">
                    <div className="tw-flex">
                      <label className="tw-font-semibold tw-mr-2">
                        Courses:
                      </label>
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
                        className="m-0 p-0 bg_secondary border-0 text-white p-2 rounded d-flex align-items-center gap-2"
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
      {showModal && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="modal" tabIndex="-1" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg tw-w-2/3"
              role="document"
            >
              <div className="modal-content p-2">
                <div className="d-flex justify-content-between">
                  <h5 className="modal-title" id="exampleModalLabel1"></h5>
                  <button
                    type="button"
                    style={{
                      width: 15,
                      height: 15,
                      border: 'none',
                      background:
                        'none https://cdn-icons-png.flaticon.com/128/5368/5368396.png',
                    }}
                    onClick={handleCloseModal}
                  >
                    X
                  </button>
                </div>
                <div className="modal-body">
                  <div className="d-flex align-items-center tw-justify-center gap-3">
                    <div className="flex-1">
                      <div className="d-flex gap-3 align-items-center ">
                        <Image
                          src={selectedInstructor?.instructorPhoto}
                          alt=""
                          width={150}
                          height={150}
                          priority
                          className="rounded-circle bg-light"
                        />
                        <b className="m-0 p-0">
                          {selectedInstructor?.firstName +
                            ' ' +
                            selectedInstructor?.lastName}
                        </b>
                        <div
                          className="d-flex align-items-center gap-2"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <div className="mb-2">
                            <StarRatings
                              starRatedColor="#cc9338"
                              rating={selectedInstructor?.averageRating ?? 0}
                              starDimension="20px"
                              starSpacing="0px"
                            />
                          </div>
                          <p className="m-0 p-0">
                            Stars {selectedInstructor?.averageRating ?? 0}/5
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {reviews.length === 0 ? (
                    <h3 className="m-0 p-3 text-center fw-bold text-muted">
                      No Reviews Yet.
                    </h3>
                  ) : (
                    <div
                      style={{
                        overflow: 'scroll',
                        overflowX: 'hidden',
                        height: 400,
                      }}
                    >
                      {reviews.map((reviewver, index) => {
                        return (
                          <div
                            className="d-flex flex-column flex-md-row align-items-center gap-4 border my-2 shadow p-3 bg-white rounded"
                            key={index}
                          >
                            <div>
                              <div className="d-flex align-items-center justify-content-between flex-1">
                                <b className="m-0 p-0">
                                  {reviewver?.reviewer?.firstName +
                                    ' ' +
                                    reviewver?.reviewer?.lastName}
                                </b>
                                <div className="d-flex align-items-center gap-2">
                                  <div className="mb-2">
                                    <StarRatings
                                      starRatedColor="#cc9338"
                                      rating={reviewver?.totalRating ?? 0}
                                      starDimension="20px"
                                      starSpacing="0px"
                                    />
                                  </div>
                                  <p className="m-0 p-0">
                                    Stars{' '}
                                    {reviewver?.totalRating?.toFixed(2) ?? 0}/5
                                  </p>
                                </div>
                              </div>
                              <p className="m-0 py-2 small">
                                {reviewver?.comment}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="d-flex flex-column flex-md-row gap-2 gap-md-0 justify-content-between align-items-center p-3">
                    <Link
                      className={`btn_primary py-2 px-3 fw-bold text-white rounded text-decoration-none`}
                      href="/student/scheduleclass[instructorId]"
                      as={`/student/scheduleclass/${selectedInstructor.id}`}
                    >
                      Book a Class
                    </Link>

                    <Link
                      className={`btn_primary py-2 px-3 fw-bold text-white rounded text-decoration-none`}
                      href="/student/requestinterview[instructorId]"
                      as={`/student/requestinterview/${selectedInstructor.id}`}
                    >
                      Request Interview
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          background-color: #fff;
          padding: 20px;
          border-radius: 4px;
          position: relative;
        }

        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 24px;
          font-weight: bold;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
