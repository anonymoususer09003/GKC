import { Footer, ParentNavbar } from "@/components";

export default function ParentLayout({children}){
    return <div>
        <ParentNavbar/>
            {children}
        <Footer/>
    </div>
}