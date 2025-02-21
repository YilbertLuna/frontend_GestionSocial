import Navbar from "@/components/navbar";

export default function Layout({children}) {
    return (
        <header>
            <Navbar />
            {children}
        </header>
    )
}