import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';
import Link from 'next/link';
import {IoMdSettings} from "react-icons/io"
import {FcCalendar} from "react-icons/fc"
const Navbar = ({isLogin}) => {
  console.log(isLogin)
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
              {isLogin && (
                <>

                <li className="nav-item">
                  <a className="nav-link" href="#">
                   <FcCalendar style={{fontSize:"30px"}}/>
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
              {isLogin && (
                <>

                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Message
                </a>
              </li>

                </>
              )}
             
            </ul>
            <form className="d-flex align-items-center gap-2">
{
  isLogin ? 
 <>
 <Link href="/signin" className="btn_primary py-2 px-4 fw-bold text-white rounded text-decoration-none ">              
Sign Out</Link>

<IoMdSettings className="h1 ms-2"/>
 </>
 
 :             <Link href="/signin" className="btn_primary py-2 px-4 fw-bold text-white rounded text-decoration-none ">              
Sign In</Link>
}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
