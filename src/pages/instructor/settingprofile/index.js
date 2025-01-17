import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Navbar, TutorNavbar, Footer } from '../../../components';
import { MdEmail, MdLocationOn, MdArrowForwardIos } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { withRole } from '../../../utils/withAuthorization';
import { connect } from 'react-redux';
import { fetchUser } from '../../../store/actions/userActions';
import { CountryCodes } from '@/utils/countryCodes';
import styles from '../../../styles/Home.module.css';

function SettingProfile({ userInfo, loading, error, fetchUser }) {
  const navigation = useRouter();
  const [showVideoPopuo, setShowVideoPopup] = useState(false);
  const onContinue = () => {
    navigation.push('/instructor/editprofile');
  };

  const onEditProfile = () => {
    navigation.push('/student/editprofile');
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <Head>
        <title>Profile Setting</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://gkc-images.s3.amazonaws.com/favicon.ico"
        />
      </Head>
      <TutorNavbar isLogin={true} />
      {showVideoPopuo ? (
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
            {userInfo?.video && (
              <video
                width="100%"
                height="500px"
                muted
                controls
                loop
                src={userInfo?.video}
              ></video>
            )}
          </div>
        </div>
      ) : null}
      <main className="container-fluid">
        <div
          className={`p-5 ${styles.instructorProfile}`}
          style={{
            minHeight: '90vh',
            maxWidth: '1700px',
            margin: 'auto',
            color: '#48494B',
          }}
        >
          <div className="row">
            <div
              className={`col-12 col-md-4 position-relative ${styles.cardShadow}`}
            >
              <div className="shadow rounded-10 bg-white py-4">
                <div className={`px-4 ${styles.instructorCards}`}>
                  <div className="tw-flex mb-5 tw-relative tw-justify-end tw-gap-3 tw-items-center">
                    <div
                      className="bg_primary rounded-circle position-absolute d-flex justify-content-center align-items-center"
                      style={{
                        top: '-50px',
                        left: '0px',
                        width: '105px',
                        height: '105px',
                      }}
                    >
                      <img
                        src={
                          userInfo?.instructorPhoto ??
                          'https://cdn-icons-png.flaticon.com/128/847/847969.png'
                        }
                        unoptimized={true}
                        alt="profile image"
                        width={100}
                        height={100}
                        className="rounded-circle bg-light"
                      />
                    </div>

                    <div className="tw-flex tw-gap-2 tw-flex-col tw-items-end">
                      <p className="bg_secondary m-0 text-white p-1 rounded fw-bold">
                        <MdEmail style={{ fontSize: '20px' }} />
                        {userInfo?.email}
                      </p>
                      {userInfo?.video && (
                        <div
                          className="tw-mx-auto"
                          onClick={() => {
                            setShowVideoPopup(true);
                          }}
                          style={{
                            cursor: 'pointer',
                          }}
                        >
                          <div className="tw-relative">
                            <video
                              width="200"
                              height="150"
                              muted
                              loop
                              src={userInfo?.video}
                            ></video>
                            <img
                              src={
                                'https://cdn-icons-png.flaticon.com/128/109/109197.png'
                              }
                              style={{
                                position: 'relative',
                                width: 60,
                                height: 60,
                                left: -130,
                                top: -55,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <h5 className="fw-bold pb-2">
                    {userInfo?.firstName} {userInfo?.lastName}
                  </h5>

                  <div className="d-flex gap-1 gap-2 pb-3 ">
                    <MdLocationOn className="h5 p-0 m-0" />
                    <small>
                      {userInfo?.address1}, {userInfo?.city}, {userInfo?.state}{' '}
                      <br />
                      {userInfo?.zipCode}, {userInfo?.country}
                    </small>
                  </div>

                  <p className="p-0 m-0 py-2 fw-bold">Phone Number</p>
                  {userInfo?.phoneNumber && (
                    <p className="p-0 m-0 py-2 ">
                      {userInfo?.country
                        ? CountryCodes.find(
                            (item) => item.name === userInfo?.country
                          ).dial_code +
                          ' ' +
                          userInfo?.phoneNumber.split('-')[1]
                        : ''}
                    </p>
                  )}

                  <hr className="bg_secondary" />
                  <h4 className="p-0 m-0 py-2 fw-bold">Bio</h4>
                  <div>{userInfo?.instructorBio} </div>
                  <div className="d-flex gap-2 justify-content-center py-3 pt-5">
                    <button
                      className="w-50 btn_primary text-light p-2 rounded fw-bold d-flex align-items-center justify-content-center gap-2"
                      onClick={() => onContinue()}
                    >
                      <FiEdit /> Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8">
              <div
                className={`shadow rounded-10 p-5 bg-white ${styles.instructorCards}`}
              >
                <div className="row">
                  <div className="col-12 col-md-3">
                    <h5 className="fw-bold ">Hourly Rate</h5>
                    <h2 className="fw-bold">${userInfo?.hourlyRate}/hr</h2>
                  </div>

                  <div className="col-12 col-md-3 border-start px-4 border_primary">
                    <h5 className="fw-bold m-0 p-0">Delivery Mode</h5>
                    <ul className="m-0 px-3 py-2 primary-list">
                      {userInfo?.deliveryModes.map((v, i) => {
                        return <li className="fw-bold m-0 p-0">{v.name}</li>;
                      })}
                    </ul>
                  </div>

                  <div className="col-12 col-md-5 border-start px-4 border_primary">
                    <h5 className="fw-bold m-0 p-0">
                      Groups you have expertise to teach
                    </h5>

                    <ul className="m-0 px-3 py-2 primary-list">
                      {userInfo?.gradesToTutor.map((v, i) => {
                        return (
                          <li className="fw-bold m-0 p-0">
                            {v.name} &#40;{v.description}&#41;
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col pt-5">
                    <h5 className="fw-bold m-0 p-0">
                      Spoken Language Preference
                    </h5>
                    <ul className="m-0 px-3 py-2 primary-list ">
                      {userInfo?.languagePreference.map((v, i) => {
                        return <li className="fw-bold m-0 p-0">{v.name}</li>;
                      })}
                    </ul>
                  </div>

                  <div className="col pt-5">
                    <h5 className="fw-bold m-0 p-0">
                      Accept Interview Request
                    </h5>
                    <ul className="m-0 px-3 py-2 primary-list">
                      <li className="fw-bold m-0 p-0">
                        {userInfo?.acceptInterviewRequest ? 'Yes' : 'No'}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className={`shadow rounded-10 p-5 bg-white my-4 ${styles.instructorCards}`}
              >
                <div className="row m-0 p-0 ">
                  <div className="col ">
                    <h4 className="fw-bold m-0 p-0">Course/s you teach</h4>
                  </div>
                  <div className="col ">
                    <h4 className="fw-bold h5 m-0 p-0">
                      Proficiency of students you'd rather teach
                    </h4>
                  </div>
                  {userInfo?.coursesToTutorAndProficiencies.map((v, i) => {
                    return (
                      <div className="row m-0 p-0 py-2 pt-4" key={i}>
                        <div className="col d-flex align-items-center gap-2 primary-list">
                          <li className="fw-bold m-0 p-0 fw-lighter">
                            {v.course.name}
                          </li>
                        </div>
                        <div className="col ">
                          <ul className="m-0 d-flex flex-wrap gap-4 primary-list">
                            {v.proficiencies.map((val) => {
                              console.log(val);
                              return (
                                <li className="fw-bold m-0 p-0" key={val.id}>
                                  {val.name}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  loading: state.user.loading,
  error: state.user.error,
});

export default withRole(
  connect(mapStateToProps, { fetchUser })(SettingProfile),
  ['Instructor']
);
