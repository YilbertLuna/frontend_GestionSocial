export default function TramiteItem({ tramite, isExpanded, onToggle }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "ENTREGADO":
        return "bg-green-100 text-green-800";
      case "APROBADO":
        return "bg-blue-100 text-blue-800";
      case "CALIFICA":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        className={`w-full text-left p-4 flex justify-between items-center ${
          isExpanded ? 'bg-gray-50' : ''
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center space-x-4">
          <span className="font-medium">
            {tramite.nro_tramite || "N/A"}
          </span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusClass(tramite.status_descripcion)}`}
          >
            {tramite.status_descripcion || "N/A"}
          </span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="flex flex-col w-full p-4 border-t">
          <div className="grid grid-cols-2 gap-4 mb-4">

            <div className="">
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Nombre del beneficiario:</span>{" "}
                    {tramite.pers_nombres}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Apellido del beneficiario:</span>{" "}
                    {tramite.pers_apellidos}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Documento del beneficiario:</span>{" "}
                    {tramite.pers_nacionalidad}{" "}{tramite.pers_cedula}
                </p>
                </div>
            
            <div>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Dependencia:</span>{" "}
                    {tramite.depe_nombre || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Fecha inicio:</span>{" "}
                    {formatDate(tramite.tram_fecha_inicio)}
                </p>
                {tramite.tram_monto !== "0.00" && (
                    <p className="text-sm text-gray-600">
                    <span className="font-medium">Monto:</span> Bs.{" "}
                    {tramite.tram_monto || "N/A"}
                    </p>
                )}
                {tramite.tram_descripcion !== "0" &&
                    tramite.tram_descripcion && (
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Descripción:</span>{" "}
                        {tramite.tram_descripcion || "N/A"}
                    </p>
                )}
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Area:</span>{" "}
                    {tramite.area_descripcion || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Ayuda:</span>{" "}
                    {tramite.serv_descripcion || "N/A"}
                </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Cronología del trámite:</h3>
            <ul className="space-y-2">
              {tramite.cronologia?.map((item, idx) => (
                <li key={idx} className="border-b pb-2 last:border-b-0">
                  <p className="text-sm">
                    <span className="font-medium">
                      {formatDate(item.cronologia_fecha)}:
                    </span>{" "}
                    {item.cronologia_status || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Por: {item.usuario_nombre} ({item.usuarios_usua_cedula}) -{" "}
                    {item.dependencia_nombre}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs">Editar tramite</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs">Imprimir tramite</button>
          </div>
        </div>
      )}
    </div>
  );
}