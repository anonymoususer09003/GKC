import { Footer, Navbar } from "@/components";

export default function StudentLayout({children}){
    return <div>
        <Navbar isLogin={true}/>
            {children}
        <Footer/>
    </div>
}