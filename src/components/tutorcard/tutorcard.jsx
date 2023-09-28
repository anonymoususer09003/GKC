import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BsCheck2Circle,
  BsFillCameraVideoFill,
  BsFillChatFill,
} from 'react-icons/bs';
import { BiMessageAlt } from 'react-icons/bi';
import { FaFileVideo } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import { useRouter } from 'next/router';
import { apiClient } from '../../api/client';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '@/store/actions/userActions';
import ChatModal from '../chat';
const Tutorcard = ({ data, key }) => {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user?.userInfo);
  const [userData, setUserData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showChildrenListModel, setShowChildrenListModel] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [activeStudent, setActiveStudent] = useState(0);
  const [activeInstructor, setActiveInstructor] = useState(0);
  const [showChat, setShowChat] = useState(false);
  let string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  console.log('data', data);

  const handleOpenModal = (ifClass) => {
    // setShowModal(true);
    if (ifClass) {
      if (
        typeof window !== 'undefined' &&
        window.localStorage.getItem('gkcAuth') == null
      ) {
        window.localStorage.setItem('goScheduleFromSignIn', JSON.stringify(data.id));
        navigation.push('/auth/signin');
      } else {
        navigation.push(
          `/${JSON.parse(
            window.localStorage.getItem('gkcAuth')
          ).role.toLowerCase()}/scheduleclass/${data.id}`
        );
      }
    } else {
      if (
        typeof window !== 'undefined' &&
        window.localStorage.getItem('gkcAuth') == null
      ) {
        window.localStorage.setItem('goScheduleFromSignIn', JSON.stringify(data.id));
        navigation.push('/auth/signin');
      } else {
        navigation.push(
          `/${JSON.parse(
            window.localStorage.getItem('gkcAuth')
          ).role.toLowerCase()}/scheduleclass/${data.id}`
        );
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal2 = async (id) => {
    try {
      const res = await apiClient.get(
        `/review/instructors/${id}?page=0&size=10`
      );
      setReviews(res.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <>
      {showVideoPopup ? (
        <div
          style={{
            position: 'fixed',
            zIndex: 1,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'auto',
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: 3,
          }}
        >
          <div
            style={{
              background: 'white',
              margin: '200px auto',
              padding: 20,
              width: '50%',
              zIndex: 5,
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                cursor: 'pointer',
              }}
            >
              <img
                style={{ width: 40, height: 40 }}
                src="https://cdn-icons-png.flaticon.com/128/5368/5368396.png"
                onClick={() => {
                  setShowVideoPopup(false);
                }}
              />
            </div>
            {data?.video && (
              <video
                width="100%"
                height="500px"
                muted
                controls
                loop
                src={data?.video}
              ></video>
            )}
          </div>
        </div>
      ) : null}
      <div className="d-flex flex-column flex-md-row align-items-center tw-justify-center gap-4 border my-2 p-3 shadow p-3 mb-5 bg-white rounded">
        <div>
          <img
            src={
              data.instructorPhoto ??
              'https://cdn-icons-png.flaticon.com/128/847/847969.png'
            }
            alt=""
            width={200}
            height={200}
            priority
            className="rounded-circle bg-light"
          />
          {data?.video && (
            <div
              className="d-flex justify-conntent-between align-items-end"
              style={{ position: 'relative', left: 160, top: 10 }}
            >
              <div
                onClick={() => {
                  setShowVideoPopup(true);
                }}
              >
                <FaFileVideo
                  style={{
                    fontSize: '40px',
                    color: '#006600',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="gap-2 flex-wrap align-items-center justify-content-between">
            <div
              className={'d-flex tw-flex-row tw-justify-between'}
              style={{ fontSize: 20 }}
            >
              <p className="m-0 p-0 fw-bold">
                {data?.firstName + ' ' + data?.lastName}
              </p>
              <p className="m-0 p-0 fw-bold">${data?.hourlyRate}/hr</p>
            </div>
            <div className="d-flex tw-flex-row tw-justify-between">
              <div className="d-flex align-items-center gap-2">
                <div className="mb-2">
                  <StarRatings
                    starRatedColor="#cc9338"
                    rating={data?.averageRating ?? 0}
                    starDimension="20px"
                    starSpacing="0px"
                  />
                </div>
                <p className="m-0 p-0">Stars {data?.averageRating ?? 0}/5</p>
              </div>
              {loggedInUser?.userType === 'Parent' && (
                <BsFillChatFill
                  style={{ fill: 'blue', cursor: 'pointer' }}
                  className="p-0 m-0 flex-fill h4"
                  onClick={() => {
                    setShowChildrenListModel(true);
                    setActiveInstructor(data);
                  }}
                />
              )}

              <button
                className="m-0 p-0 bg_secondary border-0 text-white p-2 rounded d-flex align-items-center gap-2"
                onClick={() => handleOpenModal2(data?.id)}
              >
                <BiMessageAlt style={{ fontSize: '22px' }} />
                Reviews
              </button>
            </div>
          </div>
          <p
            className={
              readMore === false ? 'm-0 py-2  tw-truncate' : 'm-0 py-2'
            }
            style={{ width: 520 }}
            // style={{
            //   textOverflow: readMore === true ? 'none' : 'ellipsis',
            //   overflow: readMore === true ? 'none' : 'hidden',
            //   whiteSpace: readMore === true ? 'none' : 'nowrap',
            //   width: 400
            // }}
          >
            {data?.instructorBio}
          </p>
          {data?.instructorBio?.length > 100 && !readMore && (
            <div
              onClick={() => {
                setReadMore(true);
              }}
              style={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              Show more
            </div>
          )}
          <div className="d-flex gap-2 m-0 p-0 align-items-center">
            <b className="m-0 p-0">Courses:</b>
            <ul className="d-flex flex-wrap list-unstyled m-0 p-0 gap-3 align-items-center">
              {data?.coursesToTutorAndProficiencies.map((v, i) => {
                return (
                  <li className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2">
                    <BsCheck2Circle style={{ fontSize: '22px' }} />
                    {v.course.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="d-flex gap-2 m-0 py-2 align-items-center">
            <b className="m-0 p-0">Mode:</b>
            <ul className="d-flex list-unstyled m-0 p-0 gap-3">
              {data.deliveryModes.map((v, i) => {
                return <li key={i}>{v.name}</li>;
              })}
            </ul>
          </div>
          <div className="d-flex gap-2">
            <b>Speaks:</b>
            <ul className="d-flex list-unstyled gap-2 tw-flex-wrap">
              {data?.languagePreference.map((v, i) => {
                return (
                  <li className={'tw-whitespace-nowrap'} key={i}>
                    {v.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="d-flex tw-flex-row tw-justify-between tw-gap-1">
            {data?.acceptInterviewRequest && (
              <button
                className={`btn_primary py-2 px-5 fw-bold text-white rounded tw-whitespace-nowrap`}
                type="submit"
                onClick={() => {
                  handleOpenModal(false);
                }}
              >
                Request Interview
              </button>
            )}
            <button
              className={`d-flex btn_primary py-2 px-5 fw-bold text-white rounded tw-whitespace-nowrap`}
              type="submit"
              onClick={() => {
                handleOpenModal(true);
              }}
            >
              Book a Class
            </button>
          </div>
        </div>
      </div>
      {console.log('loggedin user', loggedInUser)}
      {showChildrenListModel && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="modal" tabIndex="-1" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content p-2">
                <div className="d-flex justify-content-between">
                  <h5 className="modal-title" id="exampleModalLabel"></h5>
                  <button
                    type="button"
                    style={{
                      background:
                        'https://cdn-icons-png.flaticon.com/128/5368/5368396.png',
                    }}
                    onClick={() => {
                      setShowChildrenListModel(true);
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  {loggedInUser?.dependents?.map((item) => {
                    return (
                      <p
                        onClick={() => {
                          setActiveStudent(item);
                          setShowChildrenListModel(false);
                          setShowChat(true);
                        }}
                        className="my-2 p-0 p-md-3 small tw-line-clamp-1 tw-truncate"
                      >
                        {item?.firstName + ' ' + item?.lastName}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {console.log('showchat', showChat)}
      {showChat && (
        <ChatModal
          student={activeStudent}
          instructor={activeInstructor}
          onClose={() => {
            setActiveStudent('');
            setActiveInstructor('');
          }}
        />
      )}
      {showModal && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="modal" tabIndex="-1" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content p-2">
                <div className="d-flex justify-content-between">
                  <h5 className="modal-title" id="exampleModalLabel"></h5>
                  <button
                    type="button"
                    style={{
                      background:
                        'https://cdn-icons-png.flaticon.com/128/5368/5368396.png',
                    }}
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                    <div>
                      <Image
                        src="/assets/student-preview.png"
                        alt=""
                        width={120}
                        height={120}
                        priority
                        className="rounded-circle bg-light"
                      />
                    </div>
                    <div className="flex-1 w-100">
                      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 ">
                        <h5 className="m-0 p-0">
                          {data?.firstName + ' ' + data?.lastName}
                        </h5>
                        <div className="d-flex align-items-center gap-2">
                          <div className="mb-2">
                            <StarRatings
                              starRatedColor="#cc9338"
                              rating={data?.averageRating ?? 0}
                              starDimension="20px"
                              starSpacing="0px"
                            />
                          </div>
                          <p className="m-0 p-0">
                            Stars {data?.averageRating ?? 0}/5
                          </p>
                        </div>
                        <button className="m-0 p-0 bg_secondary border-0 text-white p-2 rounded d-flex align-items-center gap-2">
                          <BiMessageAlt style={{ fontSize: '22px' }} />
                          Reviews
                        </button>
                        <h5 className="m-0 p-0 fw-bold">
                          ${data?.hourlyRate}/hr
                        </h5>
                      </div>
                      <div className="d-flex gap-4  pt-2">
                        <div>
                          <FaFileVideo
                            style={{ fontSize: '40px', color: '#006600' }}
                          />
                        </div>
                        <h5 className="m-0 pt-2">Call to action title</h5>
                      </div>
                    </div>
                  </div>
                  <p className="my-2 p-0 p-md-3 small tw-line-clamp-1 tw-truncate">
                    {string /*data?.instructorBio*/}
                  </p>

                  <div className="d-flex gap-2 m-0 px-3 align-items-center">
                    <b className="m-0 p-0">Courses:</b>
                    <ul className="d-flex flex-wrap list-unstyled m-0 p-0 gap-1 align-items-center">
                      {data?.coursesToTutorAndProficiencies.map((v, i) => {
                        return (
                          <li className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2">
                            <BsCheck2Circle style={{ fontSize: '22px' }} />
                            {v.course.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="d-flex gap-2  px-3 pt-2 align-items-center">
                    <b className="m-0 p-0">Mode:</b>
                    <ul className="d-flex list-unstyled m-0 p-0">
                      <li className="m-0 p-0">Online In-Persion</li>
                    </ul>
                  </div>
                  <div className="d-flex gap-2  px-3 pt-2">
                    <b>Speaks:</b>
                    <ul className="d-flex list-unstyled gap-2">
                      {data?.languagePreference.map((v, i) => {
                        return (
                          <li key={i} style={{ whiteSpace: 'nowrap' }}>
                            {v.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="d-flex flex-wrap flex-column flex-md-row justify-content-center gap-4 p-0 px-3">
                    <Link
                      className={`btn_primary py-2 px-3 fw-bold text-white rounded text-decoration-none`}
                      href="/student/requestinterview[instructorId]"
                      as={`/student/requestinterview/${data.id}`}
                    >
                      Request Interview
                    </Link>
                    <Link
                      className={`btn_primary py-2 px-3 fw-bold text-white rounded text-decoration-none`}
                      href="/student/scheduleclass[instructorId]"
                      as={`/student/scheduleclass/${data.id}`}
                    >
                      Select
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal2 && (
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
                    onClick={handleCloseModal2}
                  >
                    X
                  </button>
                </div>
                <div className="modal-body">
                  <div className="d-flex align-items-center tw-justify-center gap-3">
                    <div className="flex-1">
                      <div className="d-flex gap-3 align-items-center ">
                        <img
                          src={
                            data?.instructorPhoto ??
                            'https://cdn-icons-png.flaticon.com/128/847/847969.png'
                          }
                          alt=""
                          width={150}
                          height={150}
                          priority
                          className="rounded-circle bg-light"
                        />
                        <b className="m-0 p-0">
                          {data?.firstName + ' ' + data?.lastName}
                        </b>
                        <div className="d-flex align-items-center gap-2">
                          <div className="mb-2">
                            <StarRatings
                              starRatedColor="#cc9338"
                              rating={data?.averageRating ?? 0}
                              starDimension="20px"
                              starSpacing="0px"
                            />
                          </div>
                          <p className="m-0 p-0">
                            Stars {data?.averageRating ?? 0}/5
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {reviews.length == 0 ? (
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
                              <div className="d-flex align-items-center tw-gap-12">
                                <div>
                                  <b className="m-0 p-0">
                                    {reviewver?.reviewer?.firstName +
                                      ' ' +
                                      reviewver?.reviewer?.lastName}
                                  </b>
                                </div>
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
                              <p
                                className="m-0 py-2 small"
                                style={{ width: '100% !important' }}
                              >
                                {reviewver?.comment}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="d-flex flex-column flex-md-row gap-2 gap-md-0 justify-content-between align-items-center p-3">
                    <button
                      className={`btn_primary py-2 px-3 fw-bold text-white rounded text-decoration-none`}
                      type="submit"
                      onClick={() => {
                        handleOpenModal(true);
                      }}
                    >
                      Book a Class
                    </button>

                    {/* <p className="m-0 p-0">Read more</p> */}

                    {data?.acceptInterviewRequest && (
                      <button
                        className={`btn_primary py-2 px-3 fw-bold text-white rounded text-decoration-none`}
                        type="submit"
                        onClick={() => {
                          handleOpenModal(false);
                        }}
                      >
                        Request Interview
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-2">
            <div className="d-flex justify-content-between">
              <h5 className="modal-title" id="exampleModal2Label"></h5>
              <button
                onClick={() => {
                  props.onClose();
                  setShowModal(false); // Close the modal when the close button is clicked
                }}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{/* Modal content here */}</div>
          </div>
        </div>
      </div>

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
};

export default Tutorcard;
