import React, { useState } from "react";
import Head from "next/head";
import { Navbar, TutorNavbar, Footer } from "../../../components";
import { MdEmail, MdLocationOn, MdArrowForwardIos } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import Image from "next/image";
import { MultiSelect } from "react-multi-select-component";
import {useRouter} from "next/router"

export default function EditProfile() {
  const options = [
    { label: "Grapes ", value: "grapes" },
    { label: "Mango ", value: "mango" },
    { label: "Strawberry ", value: "strawberry" },
    { label: "Watermelon ", value: "watermelon" },
    { label: "Pear ", value: "pear", disabled: true },
    { label: "Apple ", value: "apple" },
    { label: "Tangerine ", value: "tangerine" },
    { label: "Pineapple ", value: "pineapple" },
    { label: "Peach ", value: "peach" },
  ];

  const [selected, setSelected] = useState([]);
  const navigation = useRouter();

  const onContinue = () => {
    navigation.push("/instructor/settingprofile")
  }
  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TutorNavbar isLogin={true} />
      <main className="container-fluid">
        <div
          className="p-5 "
          style={{ minHeight: "90vh", maxWidth: "1700px", margin: "auto" }}
        >
          <div className="row">
            <div className="col-3 position-relative">
              <div className="shadow rounded-10 bg-white py-4">
                <div className="px-4 ">
                  <div
                    className="bg_primary rounded-circle position-absolute d-flex justify-content-center align-items-center"
                    style={{ top: "-40px", width: "105px", height: "105px" }}
                  >
                    <Image
                      src="/assets/student-preview.png"
                      alt=""
                      width={100}
                      height={100}
                      priority
                      className="rounded-circle bg-light"
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <p className=" bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                      <MdEmail style={{ fontSize: "20px" }} />
                      instructor@123.com
                    </p>
                  </div>
                  <input type="text" className="border-0 h4 p-1 border-bottom w-100 mb-3" defaultValue="John Lark" />

                  <div className="d-flex gap-1 gap-2 pb-3 ">
                    <MdLocationOn className="h5 p-0 m-0" />
                    <input type="text" className="border-0 border-bottom w-100" defaultValue=" 1234, Smith Street, Apt. 2000, Houston, TX 70000, USA" />
                  </div>
                  <hr className="bg_secondary" />
                  <h4 className="p-0 m-0 py-2 fw-bold">Bio</h4>
                  <div>
                    


                    <textarea  className="border-0 border-bottom w-100" rows="8" >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Tempore molestiae, velit, ex iure fugiat quas officia fuga
                    sit amet consectetur adipisicing elit. Tempore molestiae,
                    velit, ex iure fugiat quas officia fuga exercitationem nam
                    sunt fugit consectetur qui voluptatum, id placeat pariatur
                    accusamus esse nulla!
                    </textarea>
                  </div>

                  <div className="d-flex gap-2 justify-content-center py-3 pt-5">
                    <button className="w-50 btn btn-success text-light p-2 rounded fw-bold d-flex align-items-center justify-content-center gap-2" onClick={()=> onContinue()}>
                      <BsCheck2Circle /> Save Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="shadow rounded-10 p-5 bg-white">
                <div className="row">
                  <div className="col">
                    <h5 className="fw-bold ">Hourly Rate</h5>
                    <h2 className="fw-bold">
                    <input type="text" defaultValue="$30" className="fw-bold border-0 border-bottom w-25" />                    /hr</h2>
                  </div>

                  <div className="col-3 border-start px-4 border_primary">
                    <h5 className="fw-bold m-0 p-0">Delivery Mode:</h5>
                
                    <div className="form-check pt-2">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
  <label className="form-check-label fw-bold" for="flexCheckDefault">
   Online
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
  <label className="form-check-label fw-bold" for="flexCheckChecked">
  In-Person
  </label>
</div>
                  </div>

                  <div className="col-5 border-start px-4 border_primary">
                    <h5 className="fw-bold m-0 p-0">
                      Groups you have expertise to teach:
                    </h5>
                    <div className="form-check pt-2">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
  <label className="form-check-label fw-bold" for="flexCheckChecked">
  Elementory &#40;	&lt; 10yrs&#41;
  </label>
</div>

<div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
  <label className="form-check-label fw-bold" for="flexCheckChecked">
  Middle School &#40;10yrs - 13yrs&#41;
  </label>
</div>

<div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
  <label className="form-check-label fw-bold" for="flexCheckChecked">
  High School &#40;14yrs - 16yrs&#41;
  </label>
</div>

<div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
  <label className="form-check-label fw-bold" for="flexCheckChecked">
  College & beyond &#40;18yrs 	&gt;&#41;
  </label>
</div>
             
                  </div>
                </div>
                <div className="row">
                  <div className="col pt-5">
                    <h5 className="fw-bold m-0 p-0">
                      Spoken Language Preference:
                    </h5>
                    <select className="w-50 p-2 rounded outline-0 border border_gray text_gray my-3">
                      <option>Select</option>
                      <option>Select</option>
                      <option>Select</option>
                    </select>
                  </div>

                  <div className="col pt-5">
                    <h5 className="fw-bold m-0 p-0">
                      Accept Interview Request
                    </h5>
<div className="d-flex gap-4 py-2">
<div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label className="form-check-label" for="flexRadioDefault1">
   No
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
  <label className="form-check-label" for="flexRadioDefault2">
   Yes
  </label>
</div>
</div>
                  </div>
                </div>
              </div>

              <div className="shadow rounded-10 p-5 bg-white  my-4">

              <div className="p-4 w-50 m-auto">
                  <h4 className="fw-bold m-0 p-0 pb-3 text-center">
                    Course List:
                  </h4>

                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy={"Select Course"}
                    isCreatable={true}
                  />
                </div>

                <div className="row m-0 p-0 ">
                  <div className="col ">
                    <h4 className="fw-bold m-0 p-0">Course/s you teach</h4>
                  </div>
                  <div className="col ">
                    <p className="fw-bold text-muted m-0 p-0">
                      Profieiency of student you'd rather teach
                    </p>
                  </div>

                  <div className="row m-0 p-0 py-2 pt-4">
                    <div className="col d-flex align-items-center gap-2">
                      <MdArrowForwardIos className="text_primary h4 p-0 m-0" />
                      <p className="fw-bold m-0 p-0 h5 fw-lighter">Course 1</p>
                    </div>
                    <div className="col ">
                    <select className="w-50 p-2 rounded outline-0 border border_gray text_gray">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Semi-Expert</option>
                    </select>
                    </div>
                  </div>

                  <div className="row m-0 p-0 py-2">
                    <div className="col d-flex align-items-center gap-2">
                      <MdArrowForwardIos className="text_primary h4 p-0 m-0" />
                      <p className="fw-bold m-0 p-0 h5 fw-lighter">Course 2</p>
                    </div>
                    <div className="col ">
                    <select className="w-50 p-2 rounded outline-0 border border_gray text_gray">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Semi-Expert</option>
                    </select>
                    </div>
                  </div>

                  <div className="row m-0 p-0 py-2">
                    <div className="col d-flex align-items-center gap-2">
                      <MdArrowForwardIos className="text_primary h4 p-0 m-0" />
                      <p className="fw-bold m-0 p-0 h5 fw-lighter">Course 3</p>
                    </div>
                    <div className="col ">
                    <select className="w-50 p-2 rounded outline-0 border border_gray text_gray">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Semi-Expert</option>
                    </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
