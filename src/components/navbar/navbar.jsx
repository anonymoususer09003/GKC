import React from "react";
import Image from "next/image";
import styles from '@/styles/Navbar.module.css'
const Navbar = () => {
    return (
        <>
            {/* <nav className="navbar navbar-expand-lg p-4 d-flex justify-content-between" >
                <div>
                    <Image
                        src="/assets/logo.png"
                        alt="Vercel Logo"
                        // className={styles.vercelLogo}
                        width={100}
                        height={50}
                        priority
                    />
                </div>

                <div>
                    <Image
                        src="/assets/logo.png"
                        alt="Vercel Logo"
                        // className={styles.vercelLogo}
                        width={100}
                        height={50}
                        priority
                    />
                </div>
            </nav> */}

            <nav class="navbar navbar-expand-lg p-3">
                <div class="container-fluid ">
                    <Image
                        src="/logo.png"
                        alt="Vercel Logo"
                        // className={styles.vercelLogo}
                        width={100}
                        height={50}
                        priority
                    />
                    <div>
                        <div
                            class="collapse navbar-collapse mr-auto"
                            id="navbarSupportedContent"
                        >
                            <ul class="navbar-nav mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">
                                        Home
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        Message
                                    </a>
                                </li>
                            </ul>
                            <button className={`${styles.btn_primary} py-2 px-4 fw-bold text-white rounded`} type="submit">
                                Sign In
                            </button>
                        </div>
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
                </div>
            </nav>
        </>
    );
};

export default Navbar;
