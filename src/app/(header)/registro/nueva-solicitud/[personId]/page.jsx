"use client"

import NewRequestForm from "@/components/formNewProcess";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ModalError from "@/components/modal/ModalError";
import ModalSucess from "@/components/modal/modalRegisterSucess";
import { useRouter } from "next/navigation"

export default function NuevaSolicitud() {
  const { personId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  useEffect(() => {
    async function fetchPersona() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}getDataPerson/${personId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();

      setInitialData({
        dataAplicant: data
      });
    }

    if (personId) {
      fetchPersona();
    }
  }, [personId]);

  if (!initialData) {
    return <p>Cargando datos...</p>;
  }

  const closeModal = () => {
    setIsModalOpen(false)
    router.push(`/registro/persona/${initialData.dataAplicant.pers_cedula}`)
  }

  const handleSubmit = async (formData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}newProcess`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if(response.ok) {
        setIsModalOpen(true)
        setErrorMessage("")
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.message || "Error al registrar")
      }
  };

  return (
    <div className="container mx-auto py-8 space-y-10">
        <h1 className="text-center text-4xl font-bold text-white">Actualización del Trámite</h1>

        <div className="flex w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-8">
            <div className="text-lg font-semibold text-gray-800 w-full space-y-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Datos de: <span className="font-extrabold">{initialData.dataAplicant.pers_nombres}</span>
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="ml-2 space-y-2">
                      <p className="flex justify-between">
                          <span className="font-medium text-gray-600">Nombres:</span>
                          <span>{initialData.dataAplicant.pers_nombres || "N/A"}</span>
                      </p>
                      <p className="flex justify-between">
                          <span className="font-medium text-gray-600">Apellidos:</span>
                          <span>{initialData.dataAplicant.pers_apellidos || "N/A"}</span>
                      </p>
                      <p className="flex justify-between">
                          <span className="font-medium text-gray-600">C.I:</span>
                          <span> {initialData.dataAplicant.pers_nacionalidad} {initialData.dataAplicant.pers_cedula || "N/A"}</span>
                      </p>
                      <p className="flex justify-between">
                          <span className="font-medium text-gray-600">Fecha de nacimiento</span>
                          <span>{formatDate(initialData.dataAplicant.pers_fec_nac) || "N/A"}</span>
                      </p>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="ml-2 space-y-2">
                      <p className="flex justify-between">
                          <span className="font-medium text-gray-600">Estado:</span>
                          <span>{initialData.dataAplicant.estado_descripcion || "N/A"}</span>
                      </p>
                      <p className="flex justify-between">
                          <span className="font-medium text-gray-600">Municipio:</span>
                          <span>{initialData.dataAplicant.muni_descripcion || "N/A"}</span>
                      </p>
                      <p className="flex justify-between">
                          <span className="font-medium text-gray-600">Parroquia:</span>
                          <span>{initialData.dataAplicant.parr_descripcion || "N/A"}</span>
                      </p>
                      <p className="flex justify-between">
                          <span className="font-medium text-gray-600">Direccion</span>
                          <span>{initialData.dataAplicant.pers_direccion || "N/A"}</span>
                      </p>
                  </div>
                </div>

                {/* nueva solicitud */}
                <div className="">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Datos para realizar la nueva solicitud
                    </h3>

                    <NewRequestForm onSubmit={handleSubmit} dataPerson={initialData.dataAplicant} />
                </div>
            </div>
        </div>
        {isModalOpen && (
          <ModalSucess closeModal={closeModal} title={"Registro completado"} message={"El registro se ha completado con éxito."}/>
        )}
        {errorMessage && (
          <ModalError
            errorMessage={errorMessage}
            closeModal={() => setErrorMessage("")}
          />
        )}
    </div>
  );
}