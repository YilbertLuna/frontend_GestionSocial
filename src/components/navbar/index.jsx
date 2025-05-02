'use client';
import Link from "next/link";
import { TiArrowSortedDown } from "react-icons/ti";
import { useEffect, useState } from "react";
import ButtomLogout from "../buttomLogout";

export default function Navbar(){
    const [user, setUser] = useState(null)
    const [tooltip, setTooltip] = useState(false);

    useEffect(() => {
        async function getInfo() {
            const res = await fetch('http://localhost:3030/api/home', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'  
            })

            const data = await res.json()
            if(res.ok) {
                setUser(data)
            } else {
                setUser(null)
            }
        }

        getInfo();
    }, [])

    return (
        <header className="sticky w-full top-0 z-50 bg-white shadow-md py-3 px-4">
            <nav className="flex w-full justify-between">
                
                <ul className="flex flex-row space-x-3 ml-2">
                    <li className="px-4 relative group">
                        <span className="flex flex-row justify-center items-center gap-2 cursor-pointer">Registro <TiArrowSortedDown className="text-blue-500" /></span>
                        <ul className="hidden group-hover:block absolute bg-white shadow-md py-2 w-48 -left-6 rounded-b-md">
                            <li className="px-4 py-2 hover:text-blue-500">
                                <Link href="/registro/nuevo-registro">Nuevo registro</Link>
                            </li>
                            <li className="px-4 py-2 hover:text-blue-500">
                                <Link href="/registro/busqueda-solicitud">Búsqueda de solicitud</Link>
                            </li>
                            <li className="px-4 py-2 hover:text-blue-500">
                                <Link href="/registro/busqueda-solicitante">Búsqueda de solicitante</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="px-4 relative group">
                        <span className="flex flex-row justify-center items-center gap-2 cursor-pointer">Estatus de solicitud <TiArrowSortedDown className="text-blue-500" /></span>
                        <ul className="hidden group-hover:block absolute bg-white shadow-md py-2 w-48 -left-1 rounded-b-md">
                            <li className="px-4 py-2 hover:text-blue-500">
                                <Link href="/estatus/cambio-estatus">Cambio de estatus de solicitud</Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        className="px-4 relative"
                        onMouseEnter={() => setTooltip(true)} // Mostrar tooltip al pasar el cursor
                        onMouseLeave={() => setTooltip(false)} // Ocultar tooltip al salir
                    >
                        Estudio socioeconómico
                        {tooltip && (
                            <span className="absolute left-0 top-full mt-1 bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded shadow-md">
                                En desarrollo...
                            </span>
                        )}
                    </li>
                    <li className="px-4"><Link href="/">Reportes</Link></li>
                </ul>
                <ul className="flex flex-row divide-x-2 divide-solid divide-black">
                    <li className="w-auto px-2 text-right"><Link href="/">{user?.nombre}</Link></li>
                    <li className="w-auto px-2 text-right">{user?.dependencia_nombre}</li>
                    <li className="px-2"><ButtomLogout/></li>
                </ul>
            </nav>
        </header>
    )
}