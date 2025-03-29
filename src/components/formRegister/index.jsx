"use client"

import { useState } from "react"
import ApplicationInfo from "./ApplicationInfo"
import ApplicantInfo from "./AplicantInfo"
import BeneficiaryInfo from "./BeneficiaryInfo"
import LocationInfo from "./LocationInfo"

export default function ApplicationForm() {
  const [step, setStep] = useState(1)
  const [isAplicantBeneficiary, setIsAplicantBeneficiary] = useState(true)
  const [formData, setFormData] = useState({})

  const handleNext = () => setStep(step + 1)
  const handlePrev = () => setStep(step - 1)

  const updateFormData = (newData) => {
    setFormData((prevData => ({...prevData, ...newData})))
    console.log(formData)
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
          <BeneficiaryInfo onNext={handleNext} onPrev={handlePrev} updateFormData={updateFormData} formData={formData}/>
        )}
        {((step === 3 && isAplicantBeneficiary) || (step === 4 && !isAplicantBeneficiary)) && (
          <ApplicationInfo onNext={handleNext} onPrev={handlePrev} sendData={updateFormData}/>
        )}
      </div>
    </div>
  )
}