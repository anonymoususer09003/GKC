import React, {useState, useEffect} from "react";
import Image from "next/image";
import styles from "@/styles/Navbar.module.css";
import Link from "next/link";
import { IoMdSettings } from "react-icons/io";
import { FcCalendar } from "react-icons/fc";
const Navbar = ({ isLogin }) => {
  const [value, setValue] = useState(false)
  console.log(value);

  useEffect(()=>{
      const stored = localStorage.getItem("gkcAuth");
      setValue(stored ? JSON.parse(stored) : false);
  },[])
const onSignOut = () => {
  window.localStorage.removeItem("gkcAuth")
}
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
        <div className="container-fluid">
          <div className="pe-4">
            <Image
              src="/assets/logo.png"
              alt="Vercel Logo"
              className=""
              width={100}
              height={50}
              priority
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
              {value  && (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/student/calandar">
                      <FcCalendar style={{ fontSize: "30px" }} />
                    </a>
                  </li>
                </>
              )}
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
            </ul>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {value || isLogin && (
                <>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/student/messaging">
                      Message
                    </a>
                  </li>
                </>
              )}
            </ul>
            <form className="d-flex align-items-center gap-2">
              {value 
              ||isLogin ? (
                <>
                  <Link
                    href="/auth/signin"
                    onClick={onSignOut}
                    className="btn_primary py-2 px-4 fw-bold text-white rounded text-decoration-none "
                  >
                    Sign Out
                  </Link>
              
                    <ul className="list-unstyled">
                      <li class="dropdown pt-1">
                        <IoMdSettings
                          className="h1 ms-2"
                          href="#"
                          style={{fontSize:"35px"}}
                          class="dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        />
                        <ul
                          class="dropdown-menu shadow"
                          style={{ right: "0px", width:"240px"}}
                        >
                         <li className="p-3">
                            <a href="/student/settingprofile" className="nav-link fw-bold">Profile</a>
                          </li>
                          <li className="p-3">
                            <a href="/auth/changepassword" className="nav-link fw-bold">Change Password</a>
                          </li>
                          <li className="p-3">
                            <a href="#" className="nav-link fw-bold">Payment Information</a>
                          </li>
                          <li className="p-3">
                            <a href="/student/instructorreview" className="nav-link fw-bold">Review Instructor</a>
                          </li>
                          <li className="p-3">
                            <a href="/student/instructorreprot" className="nav-link fw-bold">Report Instructor</a>
                          </li>
                          <li className="p-3">
                            <a href="/student/financialreport" className="nav-link fw-bold">Financial Report</a>
                          </li>
                    
                        </ul>
                      </li>
                    </ul>
                </>
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

export default Navbar;
