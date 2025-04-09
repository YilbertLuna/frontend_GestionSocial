export default function InfoCard({ data, fields, styles, transformField }) {
    return (
        <div className={`flex justify-between items-center w-full max-w-2xl bg-white shadow-md rounded-lg p-4 border gap-1 ${styles?.container || ""}`}>
            {fields.map((field, index) => (
                <span
                    key={index}
                    className={`font-medium ${styles?.[field] || ""}`}
                >
                    {transformField ? transformField(field, data[field]) : data[field]}
                </span>
            ))}
        </div>
    );
}