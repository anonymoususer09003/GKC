import Layout from "@/common/Layout";
import styles from '@/styles/Navbar.module.css'
import height from '@/styles/Home.module.css'

export default function ChangePassword(){
    return <Layout>
        <div className={`${height.full_height} container-sm w-50 pt-5`}>
            <div className="container w-75">
                <input className="form-control my-3" type="password" placeholder="Old password" />
                <input className="form-control my-3" type="password" placeholder="New password" />
                <input className="form-control my-3" type="password" placeholder="Confirm password" />

               <div className="text-end">
                    <button className={`${styles.btn_primary} py-2 px-4 fw-bold text-white rounded text-end`} type="submit">
                        Continue
                    </button>
               </div>
            </div>
        </div>
    </Layout>

}