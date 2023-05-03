import React from 'react'
import Image from 'next/image'

const Tutorcard = () => {
    return (
        <div className="d-flex align-items-center gap-4 border my-2 p-3 rounded">
            <div            >
                <Image
                    src="/assets/student-preview.png"
                    alt=""
                    width={200}
                    height={200}
                    priority
                    className="rounded-circle bg-light"
                />
            </div>
            <div >
                <div className="d-flex align-items-center justify-content-between flex-1">
                    <b className="m-0 p-0">John S.</b>
                    <p className="m-0 p-0">Stars 4.2/5</p>
                    <p className="m-0 p-0">Reviews</p>
                    <p className="m-0 p-0">$30/hr</p>
                    <button className="btn btn-secondary">Select</button>
                    <button className="btn btn-secondary">Request Interview</button>
                </div>
                <h5 className="m-0 pt-2">Call to action title</h5>
                <p className="m-0 py-2">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium repellendus blanditiis nulla obcaecati est, animi, vitae rerum dolores delectus, soluta iusto perspiciatis nesciunt ex voluptas sapiente quaerat quia temporibus nam.
                </p>
                <div className="d-flex gap-2 m-0 p-0">
                    <b className="m-0 p-0">Courses:</b>
                    <ul className="d-flex list-unstyled m-0 p-0">
                        <li >Course 1</li>
                        <li >Course 2</li>
                        <li >Course 3</li>
                        <li >Course 4</li>
                    </ul>
                </div>
                <div className="d-flex gap-2">
                    <b>Fluent in:</b>
                    <ul className="d-flex list-unstyled gap-2">
                        <li>English</li>
                        <li>Spanish</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Tutorcard