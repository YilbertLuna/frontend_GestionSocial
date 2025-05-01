'use client';

import { useState, useEffect } from 'react';
import BeneficiaryInfo from '../formRegister/BeneficiaryInfo';
import ApplicationInfo from '../formRegister/ApplicationInfo';
import RadioGroup from '../RadioGroup';

export default function NewRequestForm({ onSubmit, dataPerson }) {
  const [formData, setFormData] = useState({
    beneficiaryData: {},
    dataAplicant: {},
    aplicationData: {},
    dataLocation: {},
    isAplicantBeneficiary: "SI",
    requeriments: {},
  });

  const [currentStep, setCurrentStep] = useState(1);

  // Inicializar los datos de la persona en dataAplicant
  useEffect(() => {
    if (dataPerson) {
      setFormData((prev) => ({
        ...prev,
        dataAplicant: {
          pers_apellidos: dataPerson.pers_apellidos,
          pers_cedula: dataPerson.pers_cedula,
          pers_document: dataPerson.pers_nacionalidad,
          pers_fec_nac: dataPerson.pers_fec_nac,
          pers_nombres: dataPerson.pers_nombres,
        },
        dataLocation: {
          Direccion: dataPerson.pers_direccion || "",
          estado_id: dataPerson.parroquia_municipio_estado_estado_id || "",
          municipio_id: dataPerson.parroquia_municipio_muni_id || "",
          parroquia_id: dataPerson.parroquia_parr_id || "",
        }
      }));
    }
  }, [dataPerson]);

  const updateFormData = (updatedData) => {
    setFormData((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      {/* Paso 1: Pregunta inicial */}
      {currentStep === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Nueva Solicitud</h2>
          <RadioGroup
            label="¿Es el solicitante también el beneficiario?"
            name="isAplicantBeneficiary"
            value={formData.isAplicantBeneficiary}
            onChange={(e) =>
              updateFormData({ isAplicantBeneficiary: e.target.value })
            }
            options={[
              { value: "SI", label: "Sí" },
              { value: "NO", label: "No" },
            ]}
          />
          <button
            type="submit"
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Siguiente
          </button>
        </form>
      )}

      {/* Paso 2: Información del beneficiario (solo si es NO) */}
      {currentStep === 2 && formData.isAplicantBeneficiary === "NO" && (
        <BeneficiaryInfo
          onNext={handleNext}
          onPrev={handlePrev}
          updateFormData={updateFormData}
          formData={formData}
        />
      )}

      {/* Paso 2 o 3: Información de la solicitud */}
      {(currentStep === 2 && formData.isAplicantBeneficiary === "SI") ||
        (currentStep === 3 && formData.isAplicantBeneficiary === "NO") ? (
        <ApplicationInfo
          onPrev={formData.isAplicantBeneficiary === "SI" ? handlePrev : handleNext}
          updateFormData={updateFormData}
          formData={formData}
          onSubmit={handleSubmit}
        />
      ) : null}
    </div>
  );
}