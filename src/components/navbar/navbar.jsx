import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import { IoMdSettings } from "react-icons/io";
import { FcCalendar } from "react-icons/fc";
import onSignOut from "@/utils/signOut";
import LogoutTimer from "../common/signOutTimer";
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ isLogin }) => {
  const [value, setValue] = useState(false);
  const [role, setRole] = useState("student");
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = localStorage.getItem("gkcAuth");
    let data = stored ? JSON.parse(stored) : "student";
    setValue(stored ? JSON.parse(stored) : false);
    setRole(data?.role?.toLowerCase());
  }, []);
  console.log("role", role);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
        <LogoutTimer logout={onSignOut} />
        <div className="container-fluid">
          <div className="pe-4">
            <Image
              src="https://gkc-images.s3.amazonaws.com/logo.png"
              alt="Vercel Logo"
              width={100}
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
                    <a className="nav-link" href={`/${role}/calandar`}>
                      <FcCalendar style={{ fontSize: "30px" }} />
                    </a>
                  </li>
                </>
              )}
              <li className="nav-item">
                <a
                  className={`nav-link ${styles.homeLink}`}
                  aria-current="page"
                  href="/"
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
                      href="/student/messaging"
                    >
                      Message
                    </a>
                  </li>
                </>
              )}
            </ul>
            <div className="d-flex align-items-center gap-2">
              {value || isLogin ? (
                <div className={styles["burger-menu-wrapper"]}>
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
                        style={{ right: "0px", width: "240px" }}
                      >
                        <li className="p-3">
                          <a
                            href={`/${role}/settingprofile`}
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
                            href={`/${role}/paymentinfo`}
                            className="nav-link fw-bold"
                          >
                            Payment Information
                          </a>
                        </li>
                        {role === "student" && (
                          <li className="p-3">
                            <a
                              href="/student/reviewinstructor"
                              className="nav-link fw-bold"
                            >
                              Review Instructor
                            </a>
                          </li>
                        )}

                        <li className="p-3">
                          <a
                            href={
                              role === "student"
                                ? `/${role}/reportinstructor`
                                : role === "student"
                                ? `/${role}/reportedstudentparents`
                                : `/${role}/reportedinstructor`
                            }
                            className="nav-link fw-bold"
                          >
                            Report{" "}
                            {role === "student" ? "Instructor" : "Students"}
                          </a>
                        </li>
                        <li className="p-3">
                          <a
                            href={`/${role}/financialreport`}
                            className="nav-link fw-bold"
                          >
                            Financial Report
                          </a>
                        </li>
                      </ul>
                    </div>
                  </ul>
                  <Link
                    href="/auth/signin"
                    onClick={onSignOut}
                    className={`btn_primary py-2 px-4 fw-bold text-white rounded text-decoration-none ${styles.signOutBtn}`}
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
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
