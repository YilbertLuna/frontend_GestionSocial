import { useState, useEffect } from "react";
import TextInput from "../TextInput";
import TextAreaInput from "../TextAreaInput";
import SelectInput from "../SelectInput";

export default function ApplicationInfo({ onPrev, updateFormData, formData, onSubmit }) {
  const [formState, setFormState] = useState({
    aplicationData: {
      description: formData.aplicationData?.description || "",
      referido: formData.aplicationData?.referido || "",
      monto: formData.aplicationData?.monto || "",
    },
    requeriments: formData.requeriments || {},
  });

  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [user, setUser] = useState(null);
  const [area, setArea] = useState(null);
  const [help, setHelp] = useState(null);
  const [requeriments, setRequeriments] = useState(null);
  const [procedencia, setProcedencia] = useState(null);
  const [selectArea, setSelectArea] = useState({ id_area: formData.aplicationData?.id_area || "" });
  const [selectHelp, setSelectHelp] = useState({ id_ayuda: formData.aplicationData?.id_ayuda || "" });
  const [errors, setErrors] = useState({});

  const handleAreaChange = (e) => {
    const selectedAreaId = e.target.value;
    setSelectArea({ id_area: selectedAreaId });
  };

  const handleHelpChange = (e) => {
    const selectedHelpId = e.target.value;
    setSelectHelp({ id_ayuda: selectedHelpId });
  };

  const handleRequerimentChange = (e, data) => {
    const isChecked = e.target.checked;

    setFormState((prev) => {
      const updatedRequeriments = { ...prev.requeriments };

      if (isChecked) {
        updatedRequeriments[data.requ_id] = {
          ...data,
          estatus: "C",
        };
      } else {
        delete updatedRequeriments[data.requ_id];
      }

      return {
        ...prev,
        requeriments: updatedRequeriments,
      };
    });
  };

  const validateErrors = () => {
    const newErrors = {};

    if (!selectArea.id_area || selectArea.id_area.trim() === "") {
      newErrors.area = "Debe seleccionar un área.";
    }

    if (!selectHelp.id_ayuda || selectHelp.id_ayuda.trim() === "") {
      newErrors.assistanceType = "Debe seleccionar un tipo de ayuda.";
    }

    if (!formState.aplicationData.referido || formState.aplicationData.referido.trim() === "") {
      newErrors.referido = "Debe indicar si la persona viene referida.";
    }

    if (!formState.aplicationData.monto || isNaN(formState.aplicationData.monto) || parseFloat(formState.aplicationData.monto) <= 0) {
      newErrors.monto = "Debe ingresar un monto válido.";
    }

    if (!formState.aplicationData.description || formState.aplicationData.description.trim() === "") {
      newErrors.description = "Debe proporcionar una descripción de la ayuda.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    async function getArea() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}selectArea`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setArea(data);
      } else {
        setArea(null);
      }
    }

    getArea();
  }, []);

  useEffect(() => {
    if (selectArea.id_area && selectArea.id_area.trim() !== "") {
      async function getHelp() {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API}selectService`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              id_area: selectArea.id_area,
            }),
          });

          const response = await res.json();
          if (res.ok) {
            setHelp(response);
          } else {
            setHelp(null);
          }
        } catch (error) {
          setHelp(null);
        }
      }

      getHelp();
    }
  }, [selectArea]);

  useEffect(() => {
    async function getProcedencia() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}referido`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const response = await res.json();
        if (res.ok) {
          setProcedencia(response);
        } else {
          setProcedencia(null);
        }
      } catch (error) {
        setProcedencia(null);
      }
    }

    getProcedencia();
  }, []);

  useEffect(() => {
    if (
      selectHelp.id_ayuda &&
      selectHelp.id_ayuda.trim() !== "" &&
      selectArea.id_area &&
      selectArea.id_area.trim() !== ""
    ) {
      async function getRequeriments() {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API}requeriments`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              id_area: selectArea.id_area,
              id_ayuda: selectHelp.id_ayuda,
            }),
          });

          const response = await res.json();
          if (res.ok) {
            setRequeriments(response);
          } else {
            setRequeriments(null);
          }
        } catch (error) {
          setRequeriments(null);
        }
      }

      getRequeriments();
    }
  }, [selectHelp, selectArea]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateErrors()) {
      const processedRequeriments = requeriments.map((data) => ({
        ...data,
        estatus: formState.requeriments[data.requ_id]?.estatus || "U",
        depe_id: user.dependencia_id,
        id_area: selectArea.id_area,
        id_ayuda: selectHelp.id_ayuda,
      }));

      const updatedFormState = {
        ...formState,
        aplicationData: {
          ...formState.aplicationData,
          monto: parseFloat(formState.aplicationData.monto),
          id_area: selectArea.id_area,
          id_ayuda: selectHelp.id_ayuda,
        },
        requeriments: processedRequeriments,
      };

      updateFormData(updatedFormState);
      setReadyToSubmit(true);
    }
  };

  const handlePrev = () => {
    updateFormData({
      ...formState,
      aplicationData: {
        ...formState.aplicationData,
        id_area: selectArea.id_area,
        id_ayuda: selectHelp.id_ayuda,
      },
    });
    onPrev();
  };

  useEffect(() => {
    if (readyToSubmit) {
      onSubmit();
      setReadyToSubmit(false);
    }
  }, [readyToSubmit, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Part 3: Datos de la solicitud</h2>

      {/* Dependencia y Área */}
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          id="dependency"
          name="dependency"
          label="Dependencia"
          value={user?.dependencia_nombre || ""}
          onChange={() => {}}
          readOnly
        />
        <SelectInput
          id="area"
          name="area"
          label="Área"
          value={selectArea.id_area}
          onChange={handleAreaChange}
          options={area?.map((data) => ({
            value: data.area_id,
            label: data.area_descripcion,
          }))}
          error={errors.area}
        />
      </div>

      {/* Tipo de ayuda y Referido */}
      <div className="grid grid-cols-2 gap-4">
        <SelectInput
          id="assistanceType"
          name="assistanceType"
          label="Tipo de ayuda"
          value={selectHelp.id_ayuda}
          onChange={handleHelpChange}
          options={help?.map((data) => ({
            value: data.serv_id,
            label: data.serv_descripcion,
          }))}
          error={errors.assistanceType}
        />
        <SelectInput
          id="referredBy"
          name="referredBy"
          label="La persona viene referida?"
          value={formState.aplicationData.referido}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              aplicationData: {
                ...prev.aplicationData,
                referido: e.target.value,
              },
            }))
          }
          options={procedencia?.map((data) => ({
            value: data.procedencia,
            label: data.procedencia,
          }))}
          error={errors.referido}
        />
      </div>

      {/* Requisitos */}
      <div className="space-y-4">
        {requeriments && (
          <>
            <h2 className="text-xl font-bold">Requisitos</h2>
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
                {requeriments.map((data) => (
                  <tr key={data.requ_id}>
                    <td className="px-4 py-2 text-center">
                      {data.requi_obligatorio ? <span className="text-red-500">*</span> : ""}
                    </td>
                    <td className="px-4 py-2">{data.requ_descripcion}</td>
                    <td className="px-4 py-2 text-center">{data.requi_cantidad}</td>
                    <td className="px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        onChange={(e) => handleRequerimentChange(e, data)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Monto solicitado y Descripción */}
      <TextInput
        id="requestedAmount"
        name="requestedAmount"
        label="Monto solicitado"
        type="number"
        value={formState.aplicationData.monto}
        onChange={(e) =>
          setFormState((prev) => ({
            ...prev,
            aplicationData: {
              ...prev.aplicationData,
              monto: e.target.value,
            },
          }))
        }
        error={errors.monto}
      />

      <TextAreaInput
        id="helpDescription"
        name="helpDescription"
        label="Descripción de la ayuda"
        value={formState.aplicationData.description}
        onChange={(e) =>
          setFormState((prev) => ({
            ...prev,
            aplicationData: {
              ...prev.aplicationData,
              description: e.target.value,
            },
          }))
        }
        error={errors.description}
      />

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrev}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Atrás
        </button>
        <button
          type="submit"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}