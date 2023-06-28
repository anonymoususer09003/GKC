import { Footer, Navbar } from "@/components";

export default function StudentLayout({children}){
    return <div>
        
        <Navbar/>
            {children}
        <Footer/>
    </div>
}