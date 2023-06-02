import React, { useState } from "react";
import Head from "next/head";
import { Navbar,TutorNavbar, Footer } from "./../../../components";
import Calendar from "react-calendar";
import { BsFillChatFill, BsFillSendFill } from "react-icons/bs";
import { GoDeviceCameraVideo } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
export default function StudentRegistrationCCPay() {
  const [value, onChange] = useState(new Date());

  return (
    <>
      <Head>
        <title>Instructor Landing Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TutorNavbar isLogin={true} />
      <main className="container-fluid">
      <div
       style={{ height: "90vh" }}
      >
        <div
          className="d-flex justify-content-between gap-5  p-5 "
         
        >
          <div className="w-50">
            <p className="text-center">
              Let us know the days of the week you are available and your
              schedule
            </p>
            <table width="100%" role="grid" style={{ tableLayout: "fixed" }}>
              <tr>
                <th roll="gridcell">Mon</th>
                <th roll="gridcell">Tue</th>
                <th roll="gridcell">Wed</th>
                <th roll="gridcell">Thur</th>
                <th roll="gridcell">Fri</th>
                <th roll="gridcell">Sat</th>
                <th roll="gridcell">Sun</th>
              </tr>
              {/* <tr>
<td>
  <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
</td>
<td>
<input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
</td>
<td>
<input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
</td>
<td>
<input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />

</td>

<td>
<input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />

</td>
<td>
<input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />

</td>
<td>
<input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />

</td>
</tr> */}
            </table>

            <div className="row w-75 py-3 ">
              <div className="col-4">
                <p className="fw-bold">Available:</p>
              </div>
              <div className="col-8">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="check1"
                  name="option1"
                  value="something"
                  checked
                />
              </div>
            </div>

            <div className="row w-75 py-2 ">
              <div className="col-4">
                <p className="fw-bold">Available:</p>
              </div>
              <div className="col-8">
                <div className="row pb-2">
                  <p className="col fw-bold">From</p>
                  <select className="w-100 p-2 rounded outline-0 border border_gray text_gray  col">
                    <option>06:00am</option>
                    <option>Student</option>
                    <option>Student</option>
                  </select>
                </div>

                <div className="row pb-2">
                  <p className="col fw-bold">To</p>
                  <select className="w-100 p-2 rounded outline-0 border border_gray text_gray col">
                    <option>06:00pm</option>
                    <option>Student</option>
                    <option>Student</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-50">
            <p className="text-center">
              Select days you don't intend to tutor e.g. Thanksgaving, etc.
              <br />
              (Selected days will be blocked on your calandar)
            </p>
            <Calendar onChange={onChange} value={value} />
          </div>
        </div>
        <div className=" mt-3 d-flex justify-content-center flex-column align-items-center gap-2">
                    <button className="w-25 btn_primary text-light p-2 rounded fw-bold ">
                      Save
                    </button>
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
