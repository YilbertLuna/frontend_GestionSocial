import Navbar from "@/components/navbar";

export default function Layout({children}) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}