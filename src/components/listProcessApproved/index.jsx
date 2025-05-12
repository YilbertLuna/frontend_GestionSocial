"use client"

import { useState, useEffect } from "react"
import Loading from "../loading"

export default function ListProcessApproved() {
    const [data, setData] = useState(null)
    const [pagination, setPagination] = useState(null)
    const [page, setDataPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const listApproved = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}listProcessApproved?page=${page}`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                });

                if (response.ok) {
                    const result = await response.json();
                    setData(result.data);
                    setPagination(result.pagination);
                    setLoading(false);
                } else {
                    setError("No se pudo cargar la información.");
                }
            } catch (err) {
                setError(err.message);
            }
        };

        listApproved();
    }, [page]);

    if (loading) {
        return <Loading text={"Cargando..."} />;
    }

    if (error) {
        return (
            <div className="flex w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-11">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            {/* Controles de paginación */}
            <div className="flex justify-between items-center mb-4">
                <button
                    disabled={page === 1}
                    onClick={() => setDataPage(page - 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Anterior
                </button>
                <span className="text-gray-700 font-medium">
                    Página {page} de {pagination?.totalPages || 1}
                </span>
                <button
                    disabled={page === pagination?.totalPages}
                    onClick={() => setDataPage(page + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Siguiente
                </button>
            </div>

            {/* Tabla de datos */}
            <div className="grid grid-cols-9 gap-4 justify-items-center items-center">
                <div className="font-bold">Nro Trámite</div>
                <div className="font-bold">Cédula</div>
                <div className="font-bold">Nombres</div>
                <div className="font-bold">Apellidos</div>
                <div className="font-bold">Municipio</div>
                <div className="font-bold">Parroquia</div>
                <div className="font-bold">Área</div>
                <div className="font-bold">Servicio</div>
                <div className="font-bold">Monto Aprobado</div>

                {data.map((item, index) => (
                    <div key={index} className="contents">
                        <div className="text-center">{item.nro_tramite}</div>
                        <div className="text-center">{item.pers_cedula}</div>
                        <div className="text-center">{item.pers_nombres}</div>
                        <div className="text-center">{item.pers_apellidos}</div>
                        <div className="text-center">{item.muni_descripcion}</div>
                        <div className="text-center">{item.parr_descripcion}</div>
                        <div className="text-center">{item.area_descripcion}</div>
                        <div className="text-center">{item.serv_descripcion}</div>
                        <div className="text-center">{item.monto_aprobado}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}