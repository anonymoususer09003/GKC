import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Navbar, Footer } from '../../../components';
import { MdEmail, MdArrowForwardIos, MdLocationOn } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { withRole } from '../../../utils/withAuthorization';
import { connect } from 'react-redux';
import { fetchUser } from '../../../store/actions/userActions';
import styles from '../../../styles/Home.module.css';
import { CountryCodes } from '@/utils/countryCodes';

function SettingProfle({ userInfo, loading, error, fetchUser }) {
  const navigation = useRouter();

  const onEditProfile = () => {
    navigation.push('/student/editprofile');
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Head>
        <title>Profile Setting Page</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://gkc-images.s3.amazonaws.com/favicon.ico"
        />
      </Head>
      <Navbar isLogin={true} />
      <main className="container-fluid">
        <div
          className={`p-5 ${styles.editProfileWrapper}`}
          style={{ minHeight: '90vh', maxWidth: '1700px', margin: 'auto' }}
        >
          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="shadow rounded-10 bg-white py-4">
                <div className="px-4">
                  <h5 className="fw-bold py-3">
                    {userInfo?.firstName} {userInfo?.lastName}
                  </h5>

                  <p className="w-75 bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                    <MdEmail style={{ fontSize: '22px' }} />
                    {userInfo?.email}
                  </p>

                  <p className="p-0 m-0 py-2 fw-bold"> Address </p>
                  <div className="d-flex gap-1 gap-2 pb-3 ">
                    <MdLocationOn className="h5 p-0 m-0" />
                    <small>
                      {userInfo?.address1}, {userInfo?.city}, {userInfo?.state}
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

                  {userInfo?.parents?.length === 0 && (
                    <p>You didn't select any parents/guardians yet.</p>
                  )}
                  {userInfo?.parents.length === 1 && (
                    <>
                      <p className="p-0 m-0 py-2 fw-bold">Parent1/guardian1</p>
                      <div className="d-flex gap-1 align-items-center gap-2 pb-3 ">
                        <MdEmail className="h5 p-0 m-0" />
                        {userInfo?.parents?.length > 0
                          ? userInfo?.parents[0]?.firstName +
                            ' ' +
                            userInfo?.parents[0]?.lastName
                          : 0}
                      </div>
                    </>
                  )}
                  {console.log('userinfo', userInfo)}
                  {userInfo?.parents.length === 2 && (
                    <>
                      <p className="p-0 m-0 py-2 fw-bold">Parent1/guardian1</p>
                      <div className="d-flex gap-1 align-items-center gap-2 pb-3 ">
                        <MdEmail className="h5 p-0 m-0" />
                        {userInfo?.parents?.length > 0
                          ? userInfo?.parents[0]?.firstName +
                            ' ' +
                            userInfo?.parents[0]?.lastName
                          : 'error'}
                      </div>
                      <p className="p-0 m-0 py-2 fw-bold">Parent2/guardian2</p>
                      <div className="d-flex gap-1 align-items-center gap-2 pb-3 ">
                        <MdEmail className="h5 p-0 m-0" />
                        {userInfo?.parents?.length > 1
                          ? userInfo?.parents[1]?.firstName +
                            ' ' +
                            userInfo?.parents[1]?.lastName
                          : 'error'}
                      </div>
                    </>
                  )}
                  <hr className="bg_secondary" />

                  <div></div>

                  <div className="d-flex gap-2 justify-content-center py-3">
                    <button
                      className="w-50 btn_primary text-light p-2 rounded fw-bold d-flex align-items-center justify-content-center gap-2"
                      onClick={() => onEditProfile()}
                    >
                      <FiEdit /> Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8 py-2">
              <div className="shadow rounded-10 p-5 bg-white">
                <div className="row">
                  <div className="col">
                    <h4 className="fw-bold">Grade:</h4>
                    <p className="fw-bold">
                      {userInfo?.grade?.name}{' '}
                      <span> &#40;{userInfo?.grade.description}&#41;</span>
                    </p>
                  </div>
                  <div className="col border-start px-4 border_primary">
                    <h4 className="fw-bold">Language Preference:</h4>
                    <ul className="m-0 primary-list">
                      {userInfo?.languagePreference?.map((lang) => {
                        return (
                          <li
                            className="fw-bold m-0 p-0"
                            value={lang.id}
                            key={lang.id}
                          >
                            {lang.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="shadow rounded-10 p-5 bg-white  my-4">
                <div className="row m-0 p-0 pb-4 ">
                  <div className="col ">
                    <h4 className="fw-bold m-0 p-0">Courses:</h4>
                  </div>
                  <div className="col ">
                    <h4 className="fw-bold m-0 p-0">Skill Level:</h4>
                  </div>
                </div>
                {userInfo?.courseOfInterestAndProficiency?.map(
                  (course, ind) => {
                    return (
                      <div className="row m-0 p-0 pt-1" key={ind}>
                        <div className="col d-flex align-items-center gap-2">
                          <MdArrowForwardIos className="text_primary h4 p-0 m-0" />
                          <p className="fw-bold m-0 p-0 h5 fw-lighter">
                            {course.course.name}
                          </p>
                        </div>
                        <div className="col ">
                          <ul className="m-0 primary-list">
                            <li className="fw-bold m-0 p-0">
                              {course.proficiency.name}
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  }
                )}
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
  connect(mapStateToProps, { fetchUser })(SettingProfle),
  ['Student']
);
