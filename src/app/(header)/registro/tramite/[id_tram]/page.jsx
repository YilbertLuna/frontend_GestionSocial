"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

export default function SearchProcess() {
   const { id_tram } = useParams();
   const [dataTramite, setDataTramite] = useState(null);

   useEffect(() => {
      async function getDataTramite() {
         const response = await fetch(`http://localhost:3030/api/showDataProcess/${id_tram}`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include",
         });

         const data = await response.json();

         if (response.ok) {
            setDataTramite(data);
         }
      }

      if (id_tram) {
         getDataTramite();
      }
   }, [id_tram]);

   console.log(dataTramite)


   return (
      <div className="container mx-auto py-8 space-y-10">
         <h1 className="text-center text-4xl font-bold text-white">Informacion del Tramite</h1>

         <div className="flex w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-11">
            {dataTramite && dataTramite.length > 0 ? (
               <>
                  <div className="text-lg font-semibold text-gray-800 w-full space-y-9">
                     <p className="flex flex-row justify-between">
                        <span className="font-bold">Numero de trámite: {dataTramite[0]?.nro_tramite || "N/A"} </span>
                        <span className="font-bold">Dependencia: {dataTramite[0]?.depe_nombre || "N/A"}</span>
                     </p>

                     {/* datos del solicitante y del beneficiario */}
                     <div className="flex flex-row justify-between gap-4">
                        {/* Solicitante */}
                        <div className="text-gray-500 w-72">
                           <h3 className="text-xl font-semibold text-gray-700">Datos del Solicitante</h3>
                           <div className="ml-2">
                              <p className="flex flex-row justify-between">C.I: <span>{dataTramite[0]?.pers_cedula || "N/A"}</span></p>
                              <p className="flex flex-row justify-between">Apellidos: <span>{dataTramite[0]?.pers_apellidos || "N/A"}</span></p>
                              <p className="flex flex-row justify-between">Nombres: <span>{dataTramite[0]?.pers_nombres || "N/A"}</span></p>
                           </div>
                        </div>

                        {/* Beneficiario */}
                        <div className="text-gray-500 w-72">
                           <h3 className="text-xl font-semibold text-gray-700">Datos del Beneficiario</h3>
                           <div className="ml-2">
                              <p className="flex flex-row justify-between">C.I: <span>{dataTramite[1]?.pers_cedula || "N/A"}</span></p>
                              <p className="flex flex-row justify-between">Apellidos: <span>{dataTramite[1]?.pers_apellidos || "N/A"}</span></p>
                              <p className="flex flex-row justify-between">Nombres: <span>{dataTramite[1]?.pers_nombres || "N/A"}</span></p>
                           </div>
                        </div>
                     </div>

                     {/* datos del tramite */}
                     <div className="flex flex-col justify-between gap-4 text-base">
                        {/* columna izquierda */}
                        <div className="w-full space-y-1">
                           <p className="flex flex-row justify-between">Fecha de Creación:
                              <span>
                                 {new Date(dataTramite[0]?.tram_fecha_inicio).toLocaleDateString("es-ES", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                 }) || "N/A"}
                              </span>
                           </p>
                           <p className="flex flex-row justify-between">Estado: 
                              <span>
                                 {dataTramite[0]?.status_descripcion || "N/A"}
                              </span>
                           </p>
                           <p className="flex flex-row justify-between">
                              Monto solicitado: <span>{dataTramite[0]?.tram_monto} Bs</span>
                           </p>
                           {/* Columna Derecha */}
                           {/* <div className="w-full"> */}
                              <p className="flex flex-row justify-between">Observacion del tramite: <span>{dataTramite[0]?.status_observacion || "N/A"}</span></p>
                              <p className="flex flex-row justify-between">Descripcion del tramite: <span className="text-end">{dataTramite[0]?.tram_descripcion || "N/A"}</span></p>
                           {/* </div> */}
                        </div>
                     </div>
                  </div>
               </>
            ) : (
               <p>Cargando datos del trámite o no hay información disponible.</p>
            )}
         </div>
      </div>
   );
}