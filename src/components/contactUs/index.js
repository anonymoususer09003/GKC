import { Navbar, Footer } from '../../components';

export default function ContactUs() {
  return (
    <>
      <Navbar isLogin={true} />
      <div className="vh-100 p-5">
        <div className="text-center">
          <h2 className="text-center">Contact us</h2>
          <div className="mt-5">
            <textarea
              placeholder="Send us a message"
              name="message"
              id="message"
              className="form-control p-3 border border-dark"
              rows="8"
            />
          </div>
          <div className="d-grid d-md-flex justify-content-lg-between">
            <p className="opacity-50 mt-2 ms-3">0/500 (min. 100 characters)</p>
            <button
              className={`btn_primary mt-3  py-2 px-4 fw-bold text-white rounded text-decoration-none`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
