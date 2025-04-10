"use client"

import Search from "@/components/searchForm"
import InfoCard from "@/components/inforCard"
import { useState, useEffect, useRef } from "react"

export default function SearchTramites() {
    const [inputValue, setInputValue] = useState(null)
    const [tramites, setTramites] = useState(null)
    const [empiti, setEmpiti] = useState(false)
    const userSearch = useRef(null)
    const [errorMessage, setErrorMessage] = useState("")
 
    function submitInputValue() {
       if(userSearch.current?.value.trim() === "" || userSearch.current?.value === undefined){
          setEmpiti(true)
          setTramites(null)
          return
       }
       setEmpiti(false)
       setInputValue(String(userSearch.current?.value))
    }

    useEffect(() => {
        async function searchTramite() {
           if (!inputValue || inputValue.trim() === "") {
                setTramites(null);
                setErrorMessage("");
                return;
            }
     
            try {
                const response = await fetch("http://localhost:3030/api/searchTramite", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        tramite: inputValue,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setErrorMessage("");
                    setTramites(data);
                } else {
                    setTramites(null);
                    setErrorMessage(data.message || "No se encontró la persona.");
                }
            } catch (error) {
                setTramites(null);
                setErrorMessage("Error de red. Intenta nuevamente.");
            }
        }
     
        searchTramite();
     
    }, [inputValue]);

    const transformField = (field, value) => {
        if (field === "persona_tipo_pers_id") {
            if(value === 1) return "Solicitante"
            else if(value === 2) return "Beneficiario"
        }
        return value;
    };

    return (
        <>
            <Search
                submitInputValue={submitInputValue}
                search={userSearch}
                empiti={empiti}
                errorMessage={errorMessage}
                />

            <div className="flex flex-col justify-center items-center space-y-4 w-full">
                {tramites?.map((person, index) => (
                    <InfoCard
                        key={index}
                        data={person}
                        fields={["nro_tramite", "pers_apellidos", "pers_nombres", "pers_cedula", "persona_tipo_pers_id"]}
                        styles={{
                        persona_tipo_pers_id: person.persona_tipo_pers_id === 1
                                ? "text-blue-500 bg-blue-100 px-2 py-1 rounded"
                                : person.persona_tipo_pers_id === 2
                                ? "text-green-500 bg-green-100 px-2 py-1 rounded"
                                : "",
                        }}
                        transformField={transformField}
                    />
                ))}
            </div>
        </>
    )
}