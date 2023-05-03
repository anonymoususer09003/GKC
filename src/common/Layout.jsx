import { Footer, Navbar } from "@/components";

export default function Layout({children}){
    return <div>
        <Navbar/>
            {children}
        <Footer/>
    </div>
}