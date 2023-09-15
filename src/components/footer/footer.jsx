import React from 'react';
import styles from './footer.module.css';
const Footer = () => {

  return (
    <>
      <footer className={`postion-fixed bottom-0 w-100`}>
        <div className="d-flex justify-content-between align-items-center flex-wrap bg-light p-3">
          <div className={`flex-1 d-flex gap-5 ${styles.linksContainer}`}>
            <a
              href="https://geekkidscode.com/privacy-policy"
              className="text-decoration-none text-muted fw-bold small"
              target="_blank"
            >
              Privacy Policy
            </a>
            <a
              href="https://geekkidscode.com/terms-of-use"
              className="text-decoration-none text-muted fw-bold small"
              target="_blank"
            >
              Term of Use
            </a>
          </div>
          <div style={{flexDirection:'column-reverse'}} className={`flex-1 d-flex tw-gap-4 ${styles.linksContainer}`}>
            <a
              href="mail:info@geekkidscode.com"
              style={{textAlign:'center'}}
              className="text-decoration-none text-muted fw-bold small"
              target="_blank"
            >
              Contact: info@geekkidscode.com
            </a>
            <a
              href="https://geekKidsCode.com"
              style={{textAlign:'center'}}
              className="text-decoration-none text-muted fw-bold small"
              target="_blank"
            >
              GeekKidsCode.com is owned and operated by Greinchville Solutions LLC
            </a>
          </div>
          <div className="flex-1 " >
            <p
              className={`p-0 m-0 text-muted  fw-bold small ${styles.allRights}`}
              style={{
                position: 'relative',
                left: -20
              }}
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
