"use client";

import { useState } from "react";
import TramiteItem from "../itemProcess";

export default function ListaTramites({ tramites, idPerson }) {
  const [expandedTramites, setExpandedTramites] = useState({});

  const toggleTramite = (tramiteId) => {
    setExpandedTramites(prev => ({
      ...prev,
      [tramiteId]: !prev[tramiteId]
    }));
  };

  if (tramites.length === 0) {
    return (
      <div>
        <h1 className="font-bold">Solicitudes</h1>
        <p>No hay solicitudes registradas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="font-bold">Solicitudes</h1>
      <div className="space-y-2">
        {tramites.map((tramite) => (
          <TramiteItem
            key={tramite.id_tramite}
            tramite={tramite}
            idPerson= {idPerson}
            isExpanded={expandedTramites[tramite.id_tramite] || false}
            onToggle={() => toggleTramite(tramite.id_tramite)}
          />
        ))}
      </div>
    </div>
  );
}