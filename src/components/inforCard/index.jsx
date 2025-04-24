import Link from "next/link";

export default function InfoCard({ data, fields, styles, transformField, pathname }) {
    return (
        <div className={`flex justify-between items-center w-full max-w-2xl bg-white shadow-md rounded-lg p-4 border gap-1 ${styles?.container || ""}`}>
            {fields.map((field, index) => {
                const id = data.id_tramite || data.pers_cedula;
                let linkPath;

                if (pathname === "/registro/busqueda-solicitud") {
                    linkPath = `/registro/tramite/${id}`;
                } else if (pathname === "/estatus/cambio-estatus") {
                    linkPath = `/estatus/status-tramite/${id}`;
                } else {
                    linkPath = `/registro/persona/${id}`;
                }

                return (
                    <Link href={linkPath} key={index}>
                        <span
                            key={index}
                            className={`font-medium ${styles?.[field] || ""}`}
                        >
                            {transformField ? transformField(field, data[field]) : data[field]}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}