'use client'

import { useRouter } from "next/navigation"

export default function ButtomLogout() {
    const router = useRouter()

    const handleLogout = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'  
        })

        if(res.ok) {
            router.refresh()
        }
    }

    return(
        <span className="cursor-pointer" onClick={handleLogout} >Salir</span>
    )
}