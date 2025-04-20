export default function DatosPersona({ persona }) {
  return (
    <>
      <h1 className="font-bold">
        Datos del {persona.tipo_persona_tipo_pers_id === 1 ? "Solicitante" : "Beneficiario"}
      </h1>

      <div className="flex flex-row justify-between gap-4">
        <div className="text-gray-500 w-full space-y-2">
          <div className="ml-2">
            <p className="flex flex-row justify-between">
              Nombres: <span>{persona.pers_nombres || "N/A"}</span>
            </p>
            <p className="flex flex-row justify-between">
              Apellidos: <span>{persona.pers_apellidos || "N/A"}</span>
            </p>
            <p className="flex flex-row justify-between">
                Documento: <span>{persona.pers_nacionalidad}{" "}{persona.pers_cedula || "N/A"}</span>
            </p>
          </div>
        </div>
        <div className="text-gray-500 w-full space-y-2">
          <div className="ml-2">
            <p className="flex flex-row justify-between">
              Estado: <span>{persona.estado_descripcion || "N/A"}</span>
            </p>
            <p className="flex flex-row justify-between">
              Municipio: <span>{persona.muni_descripcion || "N/A"}</span>
            </p>
            <p className="flex flex-row justify-between">
              Parroquia: <span>{persona.parr_descripcion || "N/A"}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}