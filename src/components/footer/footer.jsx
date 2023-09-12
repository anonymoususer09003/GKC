import React from 'react';
import styles from './footer.module.css';
const Footer = () => {
  return (
    <>
      <footer className="postion-fixed bottom-0 w-100">
        <div className="d-flex justify-content-between align-items-center flex-wrap bg-light p-3">
          <div className={`flex-1 d-flex gap-5 ${styles.linksContainer}`}>
            <a
              href="."
              className="text-decoration-none text-muted fw-bold small"
            >
              Privacy Policy
            </a>
            <a
              href="."
              className="text-decoration-none text-muted fw-bold small"
            >
              Term of Use
            </a>
          </div>
          <div className="flex-1 ">
            <p
              className={`p-0 m-0 text-muted  fw-bold small ${styles.allRights}`}
            >
              &#169;2023 GeekKidsCode. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
