import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ParentNavbar, Footer } from '../../../components';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { withRole } from '../../../utils/withAuthorization';
import { connect } from 'react-redux';
import { fetchUser } from '../../../store/actions/userActions';

function ParentSettingProfile({ userInfo, loading, error, fetchUser }) {
  //protection starts
  const nav = useRouter()
  // checking if user logged in starts
  if(typeof window !== 'undefined'){ // here we check if global object successfully loaded
    console.log('lol')
    useEffect(()=>{

      if(JSON.parse(window.localStorage.getItem('gkcAuth')).role === undefined) { //here we check if user signed in
        nav.push('/') 
      } else{
        if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Parent') { //here we check if user has role Parent
          nav.push('/')
        }
      }

    },[])
  }
  // checking if user logged in ends

  //protection ends
  const navigation = useRouter();
  const onEditProfile = () => {
    navigation.push('/student/editprofile');
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  console.log(userInfo);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <Head>
        <title> Parent Setting Proflie </title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <ParentNavbar isLogin={true} />
      <main className="container-fluid">
        <div
          className="p-5 "
          style={{ minHeight: '90vh', maxWidth: '1700px', margin: 'auto' }}
        >
          <div className="row">
            <div className="col-4">
              <div className="shadow rounded-10 bg-white py-4">
                <div className="px-4">
                  <h5 className="fw-bold py-3">
                    {' '}
                    {userInfo?.firstName} {userInfo?.lastName}{' '}
                  </h5>
                  <p className="w-75 bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                    <MdEmail style={{ fontSize: '22px' }} />
                    {userInfo?.email}
                  </p>
                  <p className="p-0 m-0 py-2 fw-bold"> Address </p>
                  <div className="d-flex gap-1 gap-2 pb-3 ">
                    <MdLocationOn className="h5 p-0 m-0" />
                    <small>
                      {userInfo?.address1}, {userInfo?.city},{' '}
                      {userInfo?.state}<br />
                      {userInfo?.zipCode}, {userInfo?.country}
                    </small>
                  </div>
                  <hr className="bg_secondary" />
                  <div> </div>
                  <div className="d-flex gap-2 justify-content-center py-3">
                    <button
                      className="w-50 btn_primary text-light p-2 rounded fw-bold d-flex align-items-center justify-content-center gap-2"
                      onClick={() => navigation.push('/parent/editprofile')}
                    >
                      <FiEdit /> Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="shadow rounded-10 p-5 bg-white  my-4">
                <div className="row m-0 p-0 ">
                  <div className="col ">
                    <h4 className="fw-bold m-0 p-0"> Dependents: </h4>
                  </div>
                  <ul className="m-0 primary-list py-4">
                    {userInfo?.dependents?.length == 0 ? (
                      <div>
                        <p className="fw-bold">
                          You currently don't have any dependent
                        </p>
                      </div>
                    ) : (
                      userInfo?.dependents.map((dep) => {
                        return (
                          <li className="fw-bold m-0 p-0 ps-4 py-2">
                            {' '}{dep.firstName + ' ' + dep.lastName}{' '}
                          </li>
                        );
                      })
                    )}
                  </ul>
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
  connect(mapStateToProps, { fetchUser })(ParentSettingProfile),
  ['Parent']
);
