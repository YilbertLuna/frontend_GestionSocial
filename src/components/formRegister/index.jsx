"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ApplicationInfo from "./ApplicationInfo"
import ApplicantInfo from "./AplicantInfo"
import BeneficiaryInfo from "./BeneficiaryInfo"
import LocationInfo from "./LocationInfo"
import ModalSucess from "../modal/modalRegisterSucess"
import ModalError from "../modal/ModalError"

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
  const [errorMessage, setErrorMessage] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const handleNext = (currentStepData) => {
    updateFormData(currentStepData);
    setStep(step + 1);
  };
  
  const handlePrev = (currentStepData) => {
    updateFormData(currentStepData);
    setStep(step - 1);
  };

  const updateFormData = (newData) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, ...newData }
      return updatedData;
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}newRegister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
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
  }

  const closeModal = () => {
    setIsModalOpen(false)
    router.push("/")
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
    </div>
  )
}