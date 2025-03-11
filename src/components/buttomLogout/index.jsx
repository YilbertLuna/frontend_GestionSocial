'use client'

import { useRouter } from "next/navigation"

export default function ButtomLogout() {
    const router = useRouter()

    const handleLogout = async () => {
        const res = await fetch('http://localhost:3030/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'  
        })

        if(res.ok) {
            setUser(null)
            router.refresh() // Refrescar la página
        }
    }

    return(
        <span onClick={handleLogout} >Salir</span>
    )
}