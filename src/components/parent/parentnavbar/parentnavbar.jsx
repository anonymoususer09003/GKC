import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './parentnavbar.module.css';
import Link from 'next/link';
import { IoMdSettings } from 'react-icons/io';
import { FcCalendar } from 'react-icons/fc';
import onSignOut from '@/utils/signOut';
import LogoutTimer from '@/components/common/signOutTimer';

const ParentNavbar = ({ isLogin }) => {

  const [value, setValue] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('gkcAuth');

    setValue(stored ? JSON.parse(stored) : false);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
        <LogoutTimer logout={onSignOut} />
        <div className="container-fluid">
          <div className="pe-4">
            <Image
              src="https://gkc-images.s3.amazonaws.com/logo.png"
              alt="Vercel Logo"
              className=""
              width={240}
              height={50}
              unoptimized
            />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {value && (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/parent/calandar"
                    style={{display:'flex', justifyContent:'flex-end'}}
                    >
                      <FcCalendar style={{ fontSize: '30px' }} />
                    </a>
                  </li>
                </>
              )}
              <li className="nav-item">
                <a
                  className={`nav-link ${styles.homeLink}`}
                  aria-current="page"
                  href="/parent"
                  style={{display:'flex', justifyContent:'flex-end'}}
                >
                  Home
                </a>
              </li>
            </ul>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {value && (
                <>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${styles.homeLink}`}
                      aria-current="page"
                      href="/parent/messaging"
                      style={{display:'flex', justifyContent:'flex-end'}}
                    >
                      Message
                    </a>
                  </li>
                </>
              )}
            </ul>
            <form className="d-flex align-items-center gap-2"
            style={{display:'flex', justifyContent:'flex-end'}}>
              {value ? (
                <div className={styles['burger-menu-wrapper']}>
                  <ul className="list-unstyled">
                    <div className="dropdown">
                      <button
                        className="btn btn-lg dropdown-toggle"
                        data-bs-toggle="dropdown"
                        type="button"
                        aria-expanded="false"
                      >
                        <IoMdSettings />
                      </button>
                      <ul
                        className={`dropdown-menu shadow ${styles.dropDown}`}
                        style={{ right: '0px', width: '240px' }}
                      >
                        <li className="p-3">
                          <a
                            href="/parent/settingprofile"
                            className="nav-link fw-bold"
                          >
                            Profile
                          </a>
                        </li>
                        <li className="p-3">
                          <a
                            href="/auth/changepassword"
                            className="nav-link fw-bold"
                          >
                            Change Password
                          </a>
                        </li>
                        <li className="p-3">
                          <a
                            href="/parent/paymentinfo"
                            className="nav-link fw-bold"
                          >
                            Payment Information
                          </a>
                        </li>
                        <li className="p-3">
                          <a
                            href="/parent/reviewinstructor"
                            className="nav-link fw-bold"
                          >
                            Review Instructor
                          </a>
                        </li>
                        <li className="p-3">
                          <a
                            href="/parent/reportinstructor"
                            className="nav-link fw-bold"
                          >
                            Report Instructor
                          </a>
                        </li>
                        <li className="p-3">
                          <a
                            href="/parent/financialreport"
                            className="nav-link fw-bold"
                          >
                            Financial Report
                          </a>
                        </li>
                        <li className="p-3">
                          <a
                            href="/parent/contactus"
                            className="nav-link fw-bold"
                          >
                            Contact Us
                          </a>
                        </li>
                      </ul>
                    </div>
                  </ul>
                  <Link
                    href="/auth/signin"
                    className={`btn_primary py-2 px-4 fw-bold text-white rounded text-decoration-none ${styles.signOutBtn}`}
                    onClick={onSignOut}
                  >
                    Sign Out
                  </Link>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="btn_primary py-2 px-4 fw-bold text-white rounded text-decoration-none "
                >
                  Sign In
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ParentNavbar;
