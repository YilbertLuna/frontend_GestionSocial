'use client'

import { useState } from "react"

export default function LocationInfo({onNext, onPrev, updateFormData, formData, setIsAplicantBeneficiary}) {

    const [formState, setFormState] = useState({
        dataLocation: {
            Estado: formData.Estado || "",
            Municipio: formData.Municipio || "",
            Parroquia: formData.Parroquia || "",
            Direccion: formData.Direccion || "",
            TelefonoFijo: formData.TelefonoFijo || "",
            TelefonoCelular: formData.TelefonoCelular || "",
            Correo: formData.Correo || "",
        },
        isAplicantBeneficiary: formData.isAplicantBeneficiary || "SI"
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormState((prev) => {
            if (name === "isAplicantBeneficiary") {
                return {
                    ...prev,
                    [name]: value,
                };
            }
    
            return {
                ...prev,
                dataLocation: {
                    ...prev.dataLocation,
                    [name]: value,
                },
            };
        });
    };

    const validateErrors = () => {
        const newErrors = {};
    
        // Validación de campos obligatorios
        if (!formState.dataLocation.Estado) newErrors.Estado = "El estado es requerido";
        if (!formState.dataLocation.Municipio) newErrors.Municipio = "El municipio es requerido";
        if (!formState.dataLocation.Parroquia) newErrors.Parroquia = "La parroquia es requerida";
        if (!formState.dataLocation.Direccion) newErrors.Direccion = "La dirección es requerida";
    
        const hasContactInfo =
            formState.dataLocation.TelefonoFijo.trim() ||
            formState.dataLocation.TelefonoCelular.trim() ||
            formState.dataLocation.Correo.trim();

        if (!hasContactInfo) {
            newErrors.contacto = "Debe proporcionar al menos una forma de contacto (telefono fijo, telefono celular o correo)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateErrors()) {
            updateFormData(formState)
            setIsAplicantBeneficiary(formState.isAplicantBeneficiary === "SI");
            onNext();
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Parte 2: Informacion de localizacion y contacto</h2>
            
            <div className="grid grid-cols-2 gap-4">

                <div className="space-y-2">
                    <label htmlFor="Estado" className="block text-sm font-medium text-gray-700">
                        Estado de residencia
                    </label>
                    <input
                        type="text"
                        id="Estado"
                        name="Estado"
                        value={formState.dataLocation.Estado}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                            ${errors.Estado ?"border-red-500" : "border-gray-300"}`}
                    />
                    {errors.Estado && <p className="text-red-500">{errors.Estado}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="Municipio" className="block text-sm font-medium text-gray-700">
                        Municipio
                    </label>
                    <input
                        type="text"
                        id="Municipio"
                        name="Municipio"
                        value={formState.dataLocation.Municipio}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                            ${errors.Municipio ?"border-red-500" : "border-gray-300"}`}
                    />
                    {errors.Municipio && <p className="text-red-500">{errors.Municipio}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="Parroquia" className="block text-sm font-medium text-gray-700">
                        Parroquia
                    </label>
                    <input
                        type="text"
                        id="Parroquia"
                        name="Parroquia"
                        value={formState.dataLocation.Parroquia}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                            ${errors.Parroquia? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.Parroquia && <p className="text-red-500">{errors.Parroquia}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="Direccion" className="block text-sm font-medium text-gray-700">
                    Direccion de casa
                </label>
                <textarea
                id="Direccion"
                name="Direccion"
                value={formState.dataLocation.Direccion}
                onChange={handleChange}
                rows={3}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${errors.Direccion ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.Direccion && <p className="text-red-500">{errors.Direccion}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="TelefonoFijo" className="block text-sm font-medium text-gray-700">
                        Teléfono de casa
                    </label>
                    <input
                        id="TelefonoFijo"
                        name="TelefonoFijo"
                        type="tel"
                        value={formState.dataLocation.TelefonoFijo}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                            ${errors.contacto ? "border-red-500" : "border-gray-300"}`}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="TelefonoCelular" className="block text-sm font-medium text-gray-700">
                        Teléfono celular
                    </label>
                    <input
                        id="TelefonoCelular"
                        name="TelefonoCelular"
                        type="tel"
                        value={formState.dataLocation.TelefonoCelular}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                            ${errors.contacto ? "border-red-500" : "border-gray-300"}`}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="Correo" className="block text-sm font-medium text-gray-700">
                    Correo
                </label>
                <input
                    id="Correo"
                    name="Correo"
                    type="email"
                    value={formState.dataLocation.Correo}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                        ${errors.contacto ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.contacto && <p className="text-red-500">{errors.contacto}</p>}
            </div>

            <div className="space-y-2">
                <span className="block text-sm font-medium text-gray-700">¿Es el solicitante también el beneficiario?</span>
                <div className="flex space-x-4 mt-1">
                    <div className="flex items-center">
                        <input
                            id="SI"
                            name="isAplicantBeneficiary"
                            type="radio"
                            value="SI"
                            checked={formState.isAplicantBeneficiary === "SI"}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="SI" className="ml-2 block text-sm text-gray-700">
                            SI
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="NO"
                            name="isAplicantBeneficiary"
                            type="radio"
                            value="NO"
                            checked={formState.isAplicantBeneficiary === "NO"}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="NO" className="ml-2 block text-sm text-gray-700"> {/* Cambiado para que coincida con el id */}
                            NO
                        </label>
                    </div>
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