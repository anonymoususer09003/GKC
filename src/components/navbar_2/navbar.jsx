import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';
const Navbar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light p-3">
        <div class="container-fluid">
          <div className="pe-4">
            <Image
              src="/assets/logo.png"
              alt="Vercel Logo"
              className=""
              width={240}
              height={50}
              priority
            />
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              {false && (
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Message
                  </a>
                </li>
              )}
            </ul>

            <form class="d-flex">
              <button
                className={`btn_primary py-2 px-4 fw-bold text-white rounded`}
                type="submit"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
