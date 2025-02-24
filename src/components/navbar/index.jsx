'use client';
import Link from "next/link";
import { TiArrowSortedDown } from "react-icons/ti";

export default function Navbar(){
    return (
        <header className="flex w-full items-center justify-center fixed top-0 py-3 px-4 bg-white text-black">
            <nav className="flex w-full justify-between">
                <ul className="flex flex-row space-x-3 ml-20">
                    <li className="px-4 relative group">
                        <span className="flex flex-row justify-center items-center gap-2 cursor-pointer">Registro <TiArrowSortedDown className="text-blue-500" /></span>
                        <ul className="hidden group-hover:block absolute bg-white shadow-md py-2 w-48 -left-6 rounded-b-md">
                            <li className="px-4 py-2 hover:text-blue-500">
                                <Link href="/registro/nuevo">Nuevo registro</Link>
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
                    <li className="px-4"><Link href="/">Estudio socioeconómico</Link></li>
                    <li className="px-4"><Link href="/">Reportes</Link></li>
                </ul>
                <ul className="flex flex-row space-x-3 divide-x-2 divide-solid divide-black">
                    <li className="px-4">Nombre del usuario</li>
                    <li className="px-4">Departamento</li>
                    <li className="px-4"><Link href="/login">Salir</Link></li>
                </ul>
            </nav>
        </header>
    )
}