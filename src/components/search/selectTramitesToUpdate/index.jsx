"use client"

import Search from "@/components/searchForm"
import InfoCard from "@/components/inforCard"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export default function SelectTramites() {
    const [inputValue, setInputValue] = useState(null)
    const [tramites, setTramites] = useState(null)
    const [empiti, setEmpiti] = useState(false)
    const userSearch = useRef(null)
    const [errorMessage, setErrorMessage] = useState("")
    const pathname = usePathname()

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
        async function selectTramite() {
           if (!inputValue || inputValue.trim() === "") {
                setTramites(null);
                setErrorMessage("");
                return;
            }
     
            try {
                const response = await fetch("http://localhost:3030/api/selectProcess", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        nro_tramite: inputValue,
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
     
        selectTramite();
     
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
                placeholder="Buscar por numero de tramite"
            />

            <div className="flex flex-col justify-center items-center space-y-4 w-full">
                {tramites?.map((tramite, index) => (
                    <InfoCard
                        key={index}
                        data={tramite}
                        fields={["nro_tramite", "pers_apellidos", "pers_nombres", "pers_cedula"]}
                        transformField={transformField}
                        pathname={pathname}
                    />
                ))}
            </div>
        </>
    )
}