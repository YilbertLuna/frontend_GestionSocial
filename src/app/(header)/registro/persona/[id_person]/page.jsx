"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DatosPersona from "@/components/dataPerson/dataPerson";
import ListaTramites from "@/components/dataPerson/dataProcess";
import Loading from "@/components/loading";

export default function Registro() {
  const { id_person } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getDataTramite() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3030/api/aplicantDataInfo/${id_person}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id_person) {
      getDataTramite();
    }
  }, [id_person]);

  if (loading) {
    return (
      <Loading text={"Cargando..."}/>
    );
  }

  if (error) {
    return (
      <div className="flex w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-11">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-11">
        <p>No se encontraron datos.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-10">
      <h1 className="text-center text-4xl font-bold text-white">
        Ver datos de la persona
      </h1>

      <div className="flex w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-11">
        <div className="text-lg font-semibold text-gray-800 w-full space-y-9">
          <DatosPersona persona={data.dataPerson[0]} />
          <ListaTramites tramites={data.dataProcess.tramites} idPerson={data.dataPerson[0].pers_id}/>

          <div className="flex justify-center items-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <Link href={`/registro/nueva-solicitud/${data.dataPerson[0].pers_id}`}>Realizar otra solicitud</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}