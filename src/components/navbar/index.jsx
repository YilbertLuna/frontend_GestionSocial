'use client'
import Link from "next/link"

export default function Navbar(){
    return (
        <header className="flex w-full items-center justify-center fixed top-0 py-3 px-4 bg-white text-black">
            <nav className="flex w-full justify-between">
                <ul className="flex flex-row space-x-3">
                    <li className="px-4"><Link href="/nuevo-registro">solicitud</Link></li>
                    <li className="px-4"><Link href="/">estatus de solicitud</Link></li>
                    <li className="px-4"><Link href="/">estudio socioeconomico</Link></li>
                    <li className="px-4"><Link href="/">reportes</Link></li>
                </ul>
                <ul className="flex flex-row space-x-3 divide-x-2    divide-solid divide-black">
                    <li className="px-4">Nombre del usuario</li>
                    <li className="px-4">Departamento</li>
                    <li className="px-4"><Link href="/login">Salit</Link></li>
                </ul>
            </nav>
        </header>
    )
}