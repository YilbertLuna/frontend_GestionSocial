"use client"

import { useState } from "react"
import ApplicationInfo from "./ApplicationInfo"
import ApplicantInfo from "./AplicantInfo"
import BeneficiaryInfo from "./BeneficiaryInfo"
import LocationInfo from "./LocationInfo"

export default function ApplicationForm() {
  const [step, setStep] = useState(1)
  const [isAplicantBeneficiary, setIsAplicantBeneficiary] = useState(true)
  const [formData, setFormData] = useState({
    aplicationData: {},
    beneficiaryData: {},
    dataAplicant: {},
    dataLocation: {},
    isAplicantBeneficiary: "",
    requeriments: {}

  })

  const handleNext = () => setStep(step + 1)
  const handlePrev = () => setStep(step - 1)

  const updateFormData = (newData) => {
    setFormData((prevData => ({...prevData, ...newData})))
    console.log(formData)
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3030/api/newRegister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Registro exitoso")
      } else {
        alert("Error al registrar")
      }
    } catch (error) {
      alert("Error de red")
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">

        {step === 1 && <ApplicantInfo onNext={handleNext} updateFormData={updateFormData} formData={formData}/>}
        {step === 2 && (
          <LocationInfo
            onNext={handleNext}
            onPrev={handlePrev}
            updateFormData={updateFormData}
            formData={formData}
            setIsAplicantBeneficiary={setIsAplicantBeneficiary}
          />
        )}
        {step === 3 && !isAplicantBeneficiary &&(
          <BeneficiaryInfo 
            onNext={handleNext}
            onPrev={handlePrev}
            updateFormData={updateFormData}
            formData={formData}/>
        )}
        {((step === 3 && isAplicantBeneficiary) || (step === 4 && !isAplicantBeneficiary)) && (
          <ApplicationInfo
            onNext={handleNext}
            onPrev={handlePrev}
            updateFormData={updateFormData}
            formData={formData} 
            onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  )
}