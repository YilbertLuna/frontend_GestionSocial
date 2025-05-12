"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import ModalSucess from "@/components/modal/modalRegisterSucess";
import ModalError from "@/components/modal/ModalError";

export default function EditarTramite() {
  const { id_tramite } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [noRequeriments, setNoRequeriments] = useState(null);
  const [requisitosConsignados, setRequisitosConsignados] = useState(null);
  const [formState, setFormState] = useState({
    requeriments: {},
  });
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
    async function getInfo() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}requisitosNoConsignados/${id_tramite}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setNoRequeriments(data);
      } else {
        setNoRequeriments(null);
      }
    }

    getInfo();
  }, []);

  useEffect(() => {
    async function getInfo() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}requisitosConsignados/${id_tramite}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setRequisitosConsignados(data);
      } else {
        setRequisitosConsignados(null);
      }
    }

    getInfo();
  }, []);

  useEffect(() => {
    async function getInfo() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}home`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data);
      } else {
        setUser(null);
      }
    }

    getInfo();
  }, []);

  useEffect(() => {
    async function getdata() {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}dataProcess/${id_tramite}`,
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

    if (id_tramite) {
      getdata();
    }
  }, [id_tramite]);

  useEffect(() => {
    if (data && data[0]) {
      setFormState((prev) => ({
        ...prev,
        aplicationData: {
          description: data[0]?.tram_descripcion || "",
          monto: data[0]?.tram_monto || "",
        },
      }));
    }
  }, [data]);

  const cancelar = () => {
    router.back()
  }

  const handleMissingRequerimentChange = (e, info) => {
    const isChecked = e.target.checked;
  
    setFormState((prev) => {
      const updatedRequeriments = { ...prev.requeriments};
  
      if (isChecked) {
        updatedRequeriments[info.requ_id] = {
          ...info,
          estatus: "C",
          depe_id: user.dependencia_id || null,
          id_area: data[0].areas_area_id || null,
          serv_id: data[0].serv_id || null,
        };
      } else {
        delete updatedRequeriments[info.requ_id];
      }
  
      return {
        ...prev,
        requeriments: updatedRequeriments,
      };
    });
  };
  
  const handleSubmit = async () => {
  // Procesar los requisitos seleccionados
    const selectedRequeriments = Object.values(formState.requeriments || {}).map((req) => ({
      ...req,
      estatus: "C", // Seleccionados como consignados
    }));

  // Procesar los requisitos no seleccionados
    const unselectedRequeriments = (noRequeriments || [])
      .filter((req) => !(formState.requeriments || {})[req.requ_id])
      .map((req) => ({
        ...req,
        estatus: "U",
        depe_id: user.dependencia_id || null,
        id_area: data[0].areas_area_id || null,
        serv_id: data[0].serv_id || null,
      }));

  // Combinar ambos conjuntos de requisitos
    const allRequeriments = [...selectedRequeriments, ...unselectedRequeriments];

    const updatedFormState = {
      requeriments: allRequeriments,
      id_tramite: data[0]?.id_tramite || null,
    };


    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}updateProcess`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedFormState),
      })

      if (response.ok) {
        setIsModalOpen(true)
        setErrorMessage("")
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.message || "Error al registrar")
      }
    } catch (error) {
      alert("Error de red")
    }
  };

  const closeModal = () => {
    setIsModalOpen(false)
    router.back()
  }

  if (loading) {
    return <Loading text="Cargando datos del trámite..." />;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto py-8 space-y-10">
      <h1 className="text-center text-4xl font-bold text-white">
        Editar Trámite {id_tramite}
      </h1>

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
          
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Requisitos consignados</h3>
              {requisitosConsignados.map((item) => (
                <div
                  key={item.requ_id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm mb-2"
                >
                  <p className="text-gray-600">{item.requ_descripcion}</p>
                </div>
              ))}
          </div>
          <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md space-y-4"
            >
              <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">Edición del trámite</h3>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">agregar los Requisitos no consignados</h3>
                  {noRequeriments && noRequeriments.length > 0 ? (
                    <table className="table-auto w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Obligatorio</th>
                          <th className="px-4 py-2">Descripción</th>
                          <th className="px-4 py-2">Cantidad</th>
                          <th className="px-4 py-2">Seleccionar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {noRequeriments.map((data) => (
                          <tr key={data.requ_id}>
                            <td className="px-4 py-2 text-center">
                              {data.requi_obligatorio ? <span className="text-red-500">*</span> : ""}
                            </td>
                            <td className="px-4 py-2">{data.requ_descripcion}</td>
                            <td className="px-4 py-2 text-center">{data.requi_cantidad}</td>
                            <td className="px-4 py-2 text-center">
                              <input
                                type="checkbox"
                                onChange={(e) => handleMissingRequerimentChange(e, data)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-500">No hay requisitos no consignados.</p>
                  )}
              </div>
            
            <div className="flex flex-row gap-4">
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Guardar Cambios
              </button>
              <button
                onClick={cancelar}
                className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                cancelar
              </button>
            </div>
          </form>
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