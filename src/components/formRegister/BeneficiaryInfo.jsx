'use client'

import { useState } from "react"

export default function BeneficiaryInfo ({onNext, onPrev, updateFormData, formData}) {
    const [formState, setFormState] = useState({
        beneficiaryData : {
            benf_nombres: formData.benf_nombres || "",
            benf_apellidos: formData.benf_apellidos || "",
            benf_cedula: formData.benf_cedula  || "",
            benf_direccion: formData.benf_direccion || "",
            benf_parroquia: formData.benf_parroquia  || "",
            benf_municipio: formData.benf_municipio  || "",
            benf_estado: formData.benf_estado  || "",
            benf_fec_nac: formData.benf_fec_nac  || "",
            benf_document: formData.benf_document  || ""
        }
    })
    const [errors, setErrors] = useState({})
    const [isInstitution, setIsInstitution] = useState(false)

    const validateErrors = () => {
        const newErrors = {}

        if (!formState.beneficiaryData.benf_document) newErrors.beneficiaryDocumentType = "El tipo de documento es requerido"
        if (!formState.beneficiaryData.benf_cedula) newErrors.beneficiaryDocumentNumber = "El numero de documento es requerido"
    
        if (isInstitution) {
          if (!formState.beneficiaryData.benf_nombres) newErrors.institutionName = "El nombre de la institucion es requerida"
          if (!formState.beneficiaryData.benf_apellidos) newErrors.legalRepresentative = "El nombre del represetante legal es requerido"
        } else {
          if (!formState.beneficiaryData.benf_nombres) newErrors.beneficiaryFirstName = "Los nombres son requeridos"
          if (!formState.beneficiaryData.benf_apellidos) newErrors.beneficiaryLastName = "Los apellidos son requeridos"
          if (!formState.beneficiaryData.benf_fec_nac) newErrors.beneficiaryDateOfBirth = "La fecha de nacimiento es requerida"
        }
    
        if (!formState.beneficiaryData.benf_estado) newErrors.beneficiaryState = "El estado de recidencia es requerida"
        if (!formState.beneficiaryData.benf_municipio) newErrors.beneficiaryMunicipality = "El municipio es requerido"
        if (!formState.beneficiaryData.benf_parroquia) newErrors.beneficiaryParish = "La parroquia es requerida"
        if (!formState.beneficiaryData.benf_direccion) newErrors.beneficiaryAddress = "La direccion es requerida"
  
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            beneficiaryData: {
                ...prev.beneficiaryData,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateErrors()) {
            updateFormData(formState)
            onNext()
        }
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Informacion del beneficiario</h2>
        
            <div className="flex items-center space-x-2 mb-4">
                <label htmlFor="isInstitution" className="block text-sm font-medium text-gray-700">
                    ¿El beneficiairo es una institucion?
                </label>
                <input
                    id="isInstitution"
                    type="checkbox"
                    checked={isInstitution}
                    onChange={(e) => setIsInstitution(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                    <label htmlFor="benf_document" className="block text-sm font-medium text-gray-700">
                        Tipo de documento
                    </label>
                    <select
                        id="benf_document"
                        name="benf_document"
                        value={formState.beneficiaryData.benf_document}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.beneficiaryDocumentType ? "border-red-500" : "border-gray-300"
                        }`}
                    >
                        <option value="">Documento</option>
                        <option value="V">V</option>
                        <option value="E">E</option>
                        <option value="J">J</option>
                        <option value="G">G</option>
                        <option value="P">P</option>
                    </select>
                    {errors.beneficiaryDocumentType && (
                        <p className="mt-1 text-sm text-red-600">{errors.beneficiaryDocumentType}</p>
                    )}
                </div>
                <div className="space-y-2 col-span-3">
                <label htmlFor="benf_cedula" className="block text-sm font-medium text-gray-700">
                    Numero de documento
                </label>
                <input
                    id="benf_cedula"
                    name="benf_cedula"
                    type="text"
                    value={formState.beneficiaryData.benf_cedula}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.beneficiaryDocumentNumber ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.beneficiaryDocumentNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.beneficiaryDocumentNumber}</p>
                    )}
                </div>
            </div>

            {isInstitution ? (
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <label htmlFor="benf_nombres" className="block text-sm font-medium text-gray-700">
                        Nombre de la institucion
                    </label>
                    <input
                        id="benf_nombres"
                        name="benf_nombres"
                        type="text"
                        value={formState.beneficiaryData.benf_nombres}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.institutionName ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.institutionName && <p className="mt-1 text-sm text-red-600">{errors.institutionName}</p>}
                    </div>
                    <div className="space-y-2">
                    <label htmlFor="benf_apellidos" className="block text-sm font-medium text-gray-700">
                        Representante legal
                    </label>
                    <input
                        id="benf_apellidos"
                        name="benf_apellidos"
                        type="text"
                        value={formState.beneficiaryData.benf_apellidos}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.legalRepresentative ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.legalRepresentative && <p className="mt-1 text-sm text-red-600">{errors.legalRepresentative}</p>}
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="benf_nombres" className="block text-sm font-medium text-gray-700">
                                Nombres
                            </label>
                            <input
                                id="benf_nombres"
                                name="benf_nombres"
                                type="text"
                                value={formState.beneficiaryData.benf_nombres}
                                onChange={handleChange}
                                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.beneficiaryFirstName ? "border-red-500" : "border-gray-300"
                                  }`}
                            />
                            {errors.beneficiaryFirstName && <p className="mt-1 text-sm text-red-600">{errors.beneficiaryFirstName}</p>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="benf_apellidos" className="block text-sm font-medium text-gray-700">
                                Apellidos
                            </label>
                            <input
                                id="benf_apellidos"
                                name="benf_apellidos"
                                type="text"
                                value={formState.beneficiaryData.benf_apellidos}
                                onChange={handleChange}
                                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.beneficiaryLastName ? "border-red-500" : "border-gray-300"
                                  }`}
                            />
                            {errors.beneficiaryLastName && <p className="mt-1 text-sm text-red-600">{errors.beneficiaryLastName}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="benf_fec_nac" className="block text-sm font-medium text-gray-700">
                            Fecha de nacimiento
                        </label>
                        <input
                        id="benf_fec_nac"
                        name="benf_fec_nac"
                        type="date"
                        value={formState.beneficiaryData.benf_fec_nac}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.beneficiaryDateOfBirth ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.beneficiaryDateOfBirth && (
                          <p className="mt-1 text-sm text-red-600">{errors.beneficiaryDateOfBirth}</p>
                        )}
                    </div>
                </>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="benf_estado" className="block text-sm font-medium text-gray-700">
                        Estado de residencia
                    </label>
                    <input
                        type="text"
                        id="benf_estado"
                        name="benf_estado"
                        value={formState.beneficiaryData.benf_estado}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.beneficiaryState ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.beneficiaryState && <p className="mt-1 text-sm text-red-600">{errors.beneficiaryState}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="benf_municipio" className="block text-sm font-medium text-gray-700">
                        Municipio
                    </label>
                    <input
                        type="text"
                        id="benf_municipio"
                        name="benf_municipio"
                        value={formState.beneficiaryData.benf_municipio}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.beneficiaryMunicipality ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                    {errors.beneficiaryMunicipality && (
                        <p className="mt-1 text-sm text-red-600">{errors.beneficiaryMunicipality}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="benf_parroquia" className="block text-sm font-medium text-gray-700">
                        Parroquia
                    </label>
                    <input
                        type="text"
                        id="benf_parroquia"
                        name="benf_parroquia"
                        value={formState.beneficiaryData.benf_parroquia}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.beneficiaryParish ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.beneficiaryParish && <p className="mt-1 text-sm text-red-600">{errors.beneficiaryParish}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="benf_direccion" className="block text-sm font-medium text-gray-700">
                        Direccion
                    </label>
                    <textarea
                        id="benf_direccion"
                        name="benf_direccion"
                        value={formState.beneficiaryData.benf_direccion}
                        onChange={handleChange}
                        rows={3}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.beneficiaryAddress ? "border-red-500" : "border-gray-300"
                        }`}
                        />
                    {errors.beneficiaryAddress && <p className="mt-1 text-sm text-red-600">{errors.beneficiaryAddress}</p>}
                </div>
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onPrev}
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Atrás
                </button>
                <button
                    type="submit"
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Siguiente
                </button>
            </div>

        </form>
    )
}