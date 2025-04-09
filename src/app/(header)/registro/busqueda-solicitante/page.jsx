'use client'

import { useState, useEffect, useRef } from "react"

export default function BuscarPersonas() {
   const [inputValue, setInputValue] = useState(null)
   const [persons, setPersons] = useState(null)
   const [empiti, setEmpiti] = useState(false)
   const userSearch = useRef(null)
   const [errorMessage, setErrorMessage] = useState("")

   function submitInputValue() {
      if(userSearch.current?.value.trim() === "" || userSearch.current?.value === undefined){
        setEmpiti(true)
        setPersons(null)
        return
      }
      setEmpiti(false)
      setInputValue(String(userSearch.current?.value))
  }

      useEffect(() => {
     async function searchPerson() {
       if (!inputValue || inputValue.trim() === "") {
         setPersons(null);
         setErrorMessage("");
         return;
       }
   
       try {
         const response = await fetch("http://localhost:3030/api/searchPersons", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           credentials: "include",
           body: JSON.stringify({
             person: inputValue,
           }),
         });
   
         const data = await response.json();
   
         if (response.ok) {
           setErrorMessage("");
           setPersons(data);
         } else {
           setPersons(null);
           setErrorMessage(data.message || "No se encontró la persona.");
         }
       } catch (error) {
         setPersons(null);
         setErrorMessage("Error de red. Intenta nuevamente.");
       }
     }
   
     searchPerson();
   }, [inputValue]);

   return (
      <div className="container mx-auto py-8 space-y-10">
         <h1 className="text-center text-4xl font-bold text-white">Busqueda de solicitante</h1>

         <div>
            <form onSubmit={ e => {
               e.preventDefault()
               submitInputValue()
            }} className="flex flex-row items-center justify-center w-full">
               <div className="flex bg-white border rounded-lg gap-3 p-3">
                  <div className="felx justify-center items-center w-full">
                     <input
                        ref={userSearch}
                        className="w-[340px] border rounded-lg p-3 focus:outline-none"
                        type="text" 
                        placeholder="Busca a la persona por nombre o por cedula"/>
                  </div>
                  {empiti && <p className="text-red-500 text-xs">Ingresa un dato</p>}
                  {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>} 
                  <div className="flex justify-center items-center">
                     <button
                        type="submit" 
                        className="border border-gray-300 rounded-lg p-3">
                        Buscar
                     </button>
                  </div>
               </div>
            </form>
         </div>


         <div className="flex flex-col justify-center items-center space-y-4 w-full">
            {
               persons?.map((person, index) => {
               const { pers_nombres, pers_apellidos, pers_cedula, tipo_persona_tipo_pers_id } = person;
               return (
                  <div 
                     key={index} 
                     className="flex justify-between items-center w-full max-w-2xl bg-white shadow-md rounded-lg p-4 border"
                  >
                     <span className="font-medium text-gray-700">{pers_apellidos}</span>
                     <span className="font-medium text-gray-700">{pers_nombres}</span>
                     <span className="font-medium text-gray-700">{pers_cedula}</span>
                     <span 
                     className={`font-medium ${
                        tipo_persona_tipo_pers_id === 1 
                           ? "text-blue-500 bg-blue-100 px-2 py-1 rounded" 
                           : tipo_persona_tipo_pers_id === 2 
                           ? "text-green-500 bg-green-100 px-2 py-1 rounded" 
                           : "text-gray-500 bg-gray-100 px-2 py-1 rounded"
                     }`}
                     >
                     {tipo_persona_tipo_pers_id === 1 
                        ? "Solicitante" 
                        : tipo_persona_tipo_pers_id === 2 
                        ? "Beneficiario" 
                        : "Desconocido"}
                     </span>
                  </div>
               );
               })
            }
         </div>
      </div>
   )
}