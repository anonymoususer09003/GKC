import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '../../../components';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import styles from '../../../styles/Home.module.css';

export default function Selection() {
  const [userType, setUserType] = useState('student');
  const navigation = useRouter();
  const onContinue = () => {
    // console.log(userType)
    window.localStorage.setItem('userType', JSON.stringify(userType));
    navigation.push('/auth/registeremail');
  };
  return (
    <>
      <Head>
        <title>Auth | Selection</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <main className="container-fluid  d-flex flex-column justify-content-between  min-vh-100">
        <Link
          href="/"
          className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"
          style={{cursor:'pointer'}}
        >
          <RiArrowGoBackLine />
          <p className="fw-bold m-0 p-0 ">Back to home</p>
        </Link>
        <div className="row">
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center ">
            <div style={{ maxWidth: '380px', width: '100%' }}>
              <div className="d-flex justify-content-center mb-5">
                <Image
                  src="https://gkc-images.s3.amazonaws.com/logo.png"
                  alt="Vercel Logo"
                  className=""
                  width={240}
                  height={50}
                  unoptimized
                />
              </div>
              <div>
                <div className="d-flex justify-content-center mb-3">
                  <h5 className="text-secondary fw-bold">
                    Which of these best describes you?
                  </h5>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-3 my-3">
                  <div className="form-check">
                    <input
                      className={`form-check-input ${styles.checklInputs}`}
                      type="radio"
                      name="userType"
                      value="student"
                      id="flexCheckDefault"
                      onChange={() => setUserType('student')}
                      checked={userType === 'student'}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Student
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className={`form-check-input ${styles.checklInputs}`}
                      type="radio"
                      name="userType"
                      value="parent"
                      id="flexCheckChecked"
                      onChange={() => setUserType('parent')}
                      checked={userType === 'parent'}
                    />
                    <label className="form-check-label" for="flexCheckChecked">
                      Parent
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className={`form-check-input ${styles.checklInputs}`}
                      type="radio"
                      name="userType"
                      value="instructor"
                      id="flexCheckChecked1"
                      onChange={() => setUserType('instructor')}
                      checked={userType === 'instructor'}
                    />
                    <label className="form-check-label" for="flexCheckChecked1">
                      Instructor
                    </label>
                  </div>
                </div>
                <button
                  className="w-100 btn_primary text-light p-2 rounded fw-bold mt-3"
                  onClick={onContinue}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-lg-6 position-relative d-none d-md-block"
            style={{
              backgroundImage: 'url("/assets/auth_2.png")',
              height: '100vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
            }}
          >
            <div style={{ position: 'absolute', right: '0%', bottom: '7%' }}>
              <Image
                src="https://gkc-images.s3.amazonaws.com/auth_girl_1.png"
                alt="Student"
                className=""
                width={400}
                height={600}
                unoptimized
              />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
