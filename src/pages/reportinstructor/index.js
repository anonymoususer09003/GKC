import { useState } from 'react'
import Layout from '../../common/Layout'
import height from '@/styles/Home.module.css'
import styles from '@/styles/Navbar.module.css'

export default function ReportInstructor(){
    const instructors = ['John Doe', 'Jone Rich', 'Katy Long']
    const [instructor, setInstructor] = useState('John Doe')
    return <Layout>
        <div className={`${height.full_height} container pt-5`}>
            <div className='row'>
                <div className='col'>
                    <h5 className='py-3'>Your Instructors</h5>
                    {
                        instructors.map(e=> <p role='button' onClick={()=> setInstructor(e)}>{e}</p>)
                    }
                </div>
                <div className='col col-9'>
                    <h5 className='mb-5'>Tell us your reason for reporting {`${instructor}`}</h5>
                    <div className="form-check my-3">
                        <input className="form-check-input" type="radio" name="reason" id="option"/>
                        <label className="form-check-label" for="option">
                           Option 1 ...
                        </label>
                    </div>
                    <div className="form-check my-3">
                        <input className="form-check-input" type="radio" name="reason" id="option2"/>
                        <label className="form-check-label" for="option2">
                           Option 2 ...
                        </label>
                    </div>
                    <div className="form-check my-3">
                        <input className="form-check-input" type="radio" name="reason" id="option3"/>
                        <label className="form-check-label" for="option3">
                           Option 3 ...
                        </label>
                    </div>
                    <div className="form-check my-3">
                        <input className="form-check-input" type="radio" name="reason" id="option4"/>
                        <label className="form-check-label" for="option4">
                           Option 4 ...
                        </label>
                    </div>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" ></textarea>
                    <div className='mt-3 text-end'>
                        <button className={`${styles.btn_primary} py-2 px-4 fw-bold text-white rounded text-end`} type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}