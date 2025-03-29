'use client'

import { useState } from "react"

export default function ApplicantInfo({onNext, updateFormData, formData}) {
  const [formState, setFormState] = useState({
    dataAplicant: {
      pers_nombres: formData.pers_nombres || "",
      pers_apellidos: formData.pers_apellidos || "",
      pers_document: formData.pers_document || "",
      pers_cedula: formData.pers_cedula || "",
      pers_fec_nac: formData.pers_fec_nac || "",
      // pers_foto: formData.pers_foto || ""
    }
  })
  const [errors ,setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      dataAplicant: {
        ...prev.dataAplicant,
        [name === 'documentType' ? 'pers_document' : 
         name === 'pers_cedula' ? 'pers_cedula' : name]: value
      }
    }));
  }
  
  const validateErrors = () => {
    const newErrors = {}

    if (!formState.dataAplicant.pers_apellidos) newErrors.lastName = "Los apellidos sonrequeridos"
    if (!formState.dataAplicant.pers_cedula) newErrors.documentNumber = "El numero de documento es requerido"
    if (!formState.dataAplicant.pers_document) newErrors.typeNumber = "El tipo de documento es requerido"
    if (!formState.dataAplicant.pers_fec_nac) newErrors.dateOfBirth = "La fecha de nacimiento es requerida"
    if (!formState.dataAplicant.pers_nombres) newErrors.name = "Los nombres son requeridos"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateErrors()){
      updateFormData(formState);
      onNext()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Parte 1: Informacion del solicitante</h2>

    <div className="grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <label htmlFor="pers_document" className="block text-sm font-medium text-gray-700">
            Tipo de documento
          </label>
          <select
            id="pers_document"
            name="pers_document"
            value={formState.dataAplicant.pers_document}
            onChange={handleChange}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.documentType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Documento</option>
            <option value="V">V</option>
            <option value="E">E</option>
            <option value="J">J</option>
            <option value="G">G</option>
            <option value="P">P</option>
          </select>
          {errors.typeNumber && <p className="text-red-500 text-xs">{errors.typeNumber}</p>}
        </div>
        <div className="space-y-2 col-span-3">
          <label htmlFor="pers_cedula" className="block text-sm font-medium text-gray-700">
            Numero de documento
          </label>
          <input
            id="pers_cedula"
            name="pers_cedula"
            type="text"
            value={formState.dataAplicant.pers_cedula}
            onChange={handleChange}
            className="lock w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.documentNumber && <p className="text-red-500 text-xs">{errors.documentNumber}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="pers_nombres" className="block text-sm font-medium text-gray-700">
            Nombres
          </label>
          <input
            type="text"
            id="pers_nombres"
            name="pers_nombres"
            value={formState.dataAplicant.pers_nombres}
            onChange={handleChange}
            className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="pers_apellidos" className="block text-sm font-medium text-gray-700">
            Apellidos
          </label>
          <input
            type="text"
            id="pers_apellidos"
            name="pers_apellidos"
            value={formState.dataAplicant.pers_apellidos}
            onChange={handleChange}
            
            className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="pers_fec_nac" className="block text-sm font-medium text-gray-700">
          Fecha de nacimiento
        </label>
        <input
          id="pers_fec_nac"
          name="pers_fec_nac"
          type="date"
          value={formState.dataAplicant.pers_fec_nac}
          onChange={handleChange}
          
          className="lock w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.dateOfBirth && <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Next
      </button>
    </form>
  )
}