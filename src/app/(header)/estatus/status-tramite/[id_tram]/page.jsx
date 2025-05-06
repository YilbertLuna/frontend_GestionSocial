"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation"

import Loading from "@/components/loading";
import SelectInput from "@/components/SelectInput";
import TextAreaInput from "@/components/TextAreaInput";
import ModalSucess from "@/components/modal/modalRegisterSucess";

export default function UpdateTramite() {
  const { id_tram } = useParams();
  const [data, setData] = useState(null);
  const [selectStatus, setSelectStatus] = useState(Number);
  const [status, setStatus] = useState(null);
  const [observacion, setObservacion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processUpdate, setProcessUpdate] = useState({});
  const router = useRouter();

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
    async function getdata() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3030/api/dataProcess/${id_tram}`,
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

    if (id_tram) {
      getdata();
    }
  }, [id_tram]);

  useEffect(() => {
    async function getStatus() {
        try {
          setLoading(true);
          const response = await fetch(
            `http://localhost:3030/api/selectStatus`,
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
          setStatus(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
  
    getStatus();
  }, [])

  useEffect(() => {
    if (data) {
      const updatedProcess = {
        id_process: data[0]?.id_tramite,
        id_new_status: selectStatus,
        status_observation: observacion,
      };

      if (selectStatus === "7") {
        updatedProcess.tram_monto = data[0]?.tram_monto;
      }

      setProcessUpdate(updatedProcess);
    }
  }, [selectStatus, observacion, data]);

  const validateErrors = () => {
    const newErrors = {};
  
    if (!selectStatus || selectStatus.trim() === "") {
      newErrors.selectStatus = "Debe seleccionar un estado.";
    }
  
    if (!observacion || observacion.trim() === "") {
      newErrors.observacion = "Debe proporcionar una observación.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateErrors()) {
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3030/api/changeStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(processUpdate),
      });
  
      if (response.ok) {
        setIsModalOpen(true);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al cambiar estatus");
      }
    } catch (error) {
      setError("Error de red");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false)
    router.push("/")
  }


  if (loading) {
    return (
      <Loading text={"Cargando..."}/>
    );
  }

  if (error) {
    return (
      <div className="flex w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-11 container py-8 space-y-10">
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
        <h1 className="text-center text-4xl font-bold text-white">Actualización de estatus del Trámite</h1>

        <div className="flex w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-8">
            <div className="text-lg font-semibold text-gray-800 w-full space-y-8">
                <p className="flex flex-col items-center text-center">
                    <span className="font-bold text-xl text-gray-700">Número de Trámite:</span>
                    <span className="text-gray-600">{data[0]?.nro_tramite || "N/A"}</span>
                </p>

                {data.map((item) => (
                    <div key={item.persona_tipo_pers_id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">
                            {item.persona_tipo_pers_id === 1
                            ? "Datos del Solicitante"
                            : "Datos del Beneficiario"}
                        </h3>
                        <div className="ml-2 space-y-2">
                            <p className="flex justify-between">
                                <span className="font-medium text-gray-600">C.I:</span>
                                <span>{item.pers_cedula || "N/A"}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="font-medium text-gray-600">Apellidos:</span>
                                <span>{item.pers_apellidos || "N/A"}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="font-medium text-gray-600">Nombres:</span>
                                <span>{item.pers_nombres || "N/A"}</span>
                            </p>
                        </div>
                    </div>
                ))}

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Datos del Trámite</h3>
                    <div className="space-y-2">
                        <p className="flex justify-between">
                            <span className="font-medium text-gray-600">Fecha de Inicio:</span>
                            <span>{formatDate(data[0]?.tram_fecha_inicio)}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="font-medium text-gray-600">Monto:</span>
                            <span>{data[0]?.tram_monto || "N/A"} Bs.</span>
                        </p>
                        <p className="flex items-start">
                            <span className="font-medium text-gray-600 w-1/3">Estado actual:</span>
                            <span className="text-gray-800 max-h-24 overflow-y-auto break-words p-2 w-2/3 text-right">
                                {data[0]?.status_descripcion || "N/A"}
                            </span>
                        </p>
                        <p className="flex justify-between">
                            <span className="font-medium text-gray-600">Dependencia:</span>
                            <span>{data[0]?.depe_nombre || "N/A"}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="font-medium text-gray-600">Servicio:</span>
                            <span>{data[0]?.serv_descripcion || "N/A"}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="font-medium text-gray-600">Área:</span>
                            <span>{data[0]?.area_descripcion || "N/A"}</span>
                        </p>
                        <p className="flex items-start">
                          <span className="font-medium text-gray-600 w-1/3">Descripción:</span>
                            <span
                              className={`text-gray-800 ${
                                (data[0]?.tram_descripcion || "").length > 50
                                  ? "max-h-24 overflow-y-auto break-words p-2 w-2/3 text-wrap"
                                  : "w-2/3 text-right"
                              }`}
                            >
                              {data[0]?.tram_descripcion || "N/A"}
                            </span>
                        </p>
                    </div>
                </div>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }} 
                  className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md space-y-4"
                >
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Actualizar estado del trámite</h3>
                <div className="space-y-2">
                  <div>
                    <SelectInput 
                      id="selectStatus"
                      name="selectStatus"
                      value={selectStatus}
                      onChange={(e) => {
                        const { value } = e.target;
                        setSelectStatus(value);
                      }}
                      label="Seleccione el nuevo estado del trámite"
                      options={status && status.length > 0 
                        ? status.map((item) => ({ value: item.stat_id, label: item.stat_descripcion }))
                        : []
                      }
                    />
                    {errors.selectStatus && (
                      <p className="text-red-500 text-sm mt-1">{errors.selectStatus}</p>
                    )}
                  </div>

                  <div>
                    <TextAreaInput 
                      id="estatusObservacion"
                      name="estatusObservacion"
                      label="Observación del estado"
                      value={observacion}
                      onChange={(e) => {
                        const { value } = e.target;
                        setObservacion(value);
                      }}
                    />
                    {errors.observacion && (
                      <p className="text-red-500 text-sm mt-1">{errors.observacion}</p>
                    )}
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Actualizar estado
                </button>
              </form>
            </div>
        </div>
        {isModalOpen && (
            <ModalSucess closeModal={closeModal} title={"Cambio de estatus"} message={"El cambio de estatus se realizo con exito"}/>
        )}
    </div>
  );
}