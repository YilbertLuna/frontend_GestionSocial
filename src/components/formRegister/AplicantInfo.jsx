import { useState } from "react";
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";

export default function ApplicantInfo({ onNext, updateFormData, formData }) {
  const [formState, setFormState] = useState({
    dataAplicant: {
      pers_nombres: formData.dataAplicant?.pers_nombres || "",
      pers_apellidos: formData.dataAplicant?.pers_apellidos || "",
      pers_document: formData.dataAplicant?.pers_document || "",
      pers_cedula: formData.dataAplicant?.pers_cedula || "",
      pers_fec_nac: formData.dataAplicant?.pers_fec_nac || "",
    },
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      dataAplicant: {
        ...prev.dataAplicant,
        [name]: value,
      },
    }));
  };

  const validateErrors = () => {
    const newErrors = {};
    if (!formState.dataAplicant.pers_apellidos) newErrors.lastName = "Los apellidos son requeridos";
    if (!formState.dataAplicant.pers_cedula) newErrors.documentNumber = "El número de documento es requerido";
    if (!formState.dataAplicant.pers_document) newErrors.typeNumber = "El tipo de documento es requerido";
    if (!formState.dataAplicant.pers_fec_nac) newErrors.dateOfBirth = "La fecha de nacimiento es requerida";
    if (!formState.dataAplicant.pers_nombres) newErrors.name = "Los nombres son requeridos";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateErrors()) {
      updateFormData({ dataAplicant: formState.dataAplicant }); // Asegúrate de pasar un objeto válido
      onNext(); // Avanza al siguiente paso
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Parte 1: Información del solicitante</h2>

      <div className="grid grid-cols-2 gap-4">
        <SelectInput
          id="pers_document"
          name="pers_document"
          label="Tipo de documento"
          value={formState.dataAplicant.pers_document}
          onChange={handleChange}
          options={[
            { value: "V", label: "V" },
            { value: "E", label: "E" },
            { value: "J", label: "J" },
            { value: "G", label: "G" },
            { value: "P", label: "P" },
          ]}
          error={errors.typeNumber}
        />
        <TextInput
          id="pers_cedula"
          name="pers_cedula"
          label="Número de documento"
          value={formState.dataAplicant.pers_cedula}
          onChange={handleChange}
          error={errors.documentNumber}
          className="col-span-3" // Hace que el campo ocupe 3 columnas
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          id="pers_nombres"
          name="pers_nombres"
          label="Nombres"
          value={formState.dataAplicant.pers_nombres}
          onChange={handleChange}
          error={errors.name}
        />
        <TextInput
          id="pers_apellidos"
          name="pers_apellidos"
          label="Apellidos"
          value={formState.dataAplicant.pers_apellidos}
          onChange={handleChange}
          error={errors.lastName}
        />
      </div>

      <TextInput
        id="pers_fec_nac"
        name="pers_fec_nac"
        label="Fecha de nacimiento"
        type="date"
        value={formState.dataAplicant.pers_fec_nac}
        onChange={handleChange}
        error={errors.dateOfBirth}
      />

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Siguiente
      </button>
    </form>
  );
}