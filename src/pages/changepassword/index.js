import Layout from "@/common/Layout";
import styles from '@/styles/Navbar.module.css'
import height from '@/styles/Home.module.css'
import { useState } from "react";
import { useRouter } from "next/router";

export default function ChangePassword(){
    const [showActivation, setShowActivation] = useState(false)

    const navigation = useRouter()

    const onContinue = () => {
        if(showActivation){
            return navigation.push('signin')
        }
        setShowActivation(true)
    }
    return <Layout>
        <div className={`${height.full_height} container-sm w-50 pt-5`}>
            <div className="container w-75">
                <input className="form-control my-3" type="password" placeholder="Old password" />
                <input className="form-control my-3" type="password" placeholder="New password" />
                <input className="form-control my-3" type="password" placeholder="Confirm password" />
                {
                    showActivation?
                    <input className="form-control my-3" type="text" placeholder="Activation code" /> : null
                }

               <div className="text-end">
                    <button onClick={onContinue} className={`${styles.btn_primary} py-2 px-4 fw-bold text-white rounded text-end`} type="submit">
                        Continue
                    </button>
               </div>
               <div>
                {
                    showActivation?
                    <p>Great!!! password updated successfully</p> : null
                }
               </div>
            </div>
        </div>
    </Layout>

}