import { useEffect, useState } from "react";
import SelectInput from "../SelectInput";
import TextAreaInput from "../TextAreaInput";
import TextInput from "../TextInput";
import RadioGroup from "../RadioGroup";

export default function LocationInfo({ onNext, onPrev, updateFormData, formData, setIsAplicantBeneficiary }) {
  const [formState, setFormState] = useState({
    dataLocation: {
      estado_id: formData.estado_id || "",
      municipio_id: formData.municipio_id || "",
      parroquia_id: formData.parroquia_id || "",
      Direccion: formData.Direccion || "",
      TelefonoFijo: formData.TelefonoFijo || "",
      TelefonoCelular: formData.TelefonoCelular || "",
      Correo: formData.Correo || "",
    },
    isAplicantBeneficiary: formData.isAplicantBeneficiary || "SI",
  });

  const [errors, setErrors] = useState({});
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [parroquias, setParroquias] = useState([]);

  // Cargar los estados al montar el componente
  useEffect(() => {
    async function fetchEstados() {
      try {
        const res = await fetch("http://localhost:3030/api/estado", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
    
          const data = await res.json();
          if (res.ok) {
            setEstados(data);
          } else {
            setEstados(null);
          }
      } catch (error) {
        console.error("Error al cargar los estados:", error);
      }
    }
    fetchEstados();
  }, []);

  // Cargar los municipios cuando se seleccione un estado
  useEffect(() => {
    if (formState.dataLocation.estado_id) {
      async function fetchMunicipios() {
        try {
            const res = await fetch("http://localhost:3030/api/municipio", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ id_estado: formState.dataLocation.estado_id }),
  
            });
        
            const data = await res.json();
            if (res.ok) {
                setMunicipios(data);
            } else {
                setMunicipios(null);
            }
        } catch (error) {
          console.error("Error al cargar los municipios:", error);
        }
      }
      fetchMunicipios();
    }
  }, [formState.dataLocation.estado_id]);

  // Cargar las parroquias cuando se seleccione un municipio
  useEffect(() => {
    if (formState.dataLocation.municipio_id) {
      async function fetchParroquias() {
        try {
            const res = await fetch("http://localhost:3030/api/parroquia", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ id_estado: formState.dataLocation.estado_id, id_municipio: formState.dataLocation.municipio_id }),
  
            });
        
            const data = await res.json();
            if (res.ok) {
                setParroquias(data);
            } else {
                setParroquias(null);
            }
        } catch (error) {
          console.error("Error al cargar las parroquias:", error);
        }
      }
      fetchParroquias();
    }
  }, [formState.dataLocation.municipio_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormState((prev) => ({
      ...prev,
      ...(name === "isAplicantBeneficiary"
        ? { isAplicantBeneficiary: value }
        : {
            dataLocation: {
              ...prev.dataLocation,
              [name]: value,
            },
          }),
    }));
  };
  const validateErrors = () => {
    const newErrors = {};

    if (!formState.dataLocation.estado_id) newErrors.estado_id = "El estado es requerido";
    if (!formState.dataLocation.municipio_id) newErrors.municipio_id = "El municipio es requerido";
    if (!formState.dataLocation.parroquia_id) newErrors.parroquia_id = "La parroquia es requerida";
    if (!formState.dataLocation.Direccion) newErrors.Direccion = "La dirección es requerida";

    const hasContactInfo =
      formState.dataLocation.TelefonoFijo.trim() ||
      formState.dataLocation.TelefonoCelular.trim() ||
      formState.dataLocation.Correo.trim();

    if (!hasContactInfo) {
      newErrors.contacto = "Debe proporcionar al menos una forma de contacto (teléfono fijo, celular o correo)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateErrors()) {
      updateFormData(formState);
      setIsAplicantBeneficiary(formState.isAplicantBeneficiary === "SI");
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Parte 2: Información de localización y contacto</h2>

      <div className="grid grid-cols-2 gap-4">
        <SelectInput
          id="estado_id"
          name="estado_id"
          label="Estado"
          value={formState.dataLocation.estado_id}
          onChange={handleChange}
          options={estados.map((estado) => ({
            value: estado.estado_id,
            label: estado.estado_descripcion,
          }))}
          error={errors.estado_id}
        />
        <SelectInput
          id="municipio_id"
          name="municipio_id"
          label="Municipio"
          value={formState.dataLocation.municipio_id}
          onChange={handleChange}
          options={municipios.map((municipio) => ({
            value: municipio.muni_id,
            label: municipio.muni_descripcion,
          }))}
          error={errors.municipio_id}
        />
        <SelectInput
          id="parroquia_id"
          name="parroquia_id"
          label="Parroquia"
          value={formState.dataLocation.parroquia_id}
          onChange={handleChange}
          options={parroquias.map((parroquia) => ({
            value: parroquia.parr_id,
            label: parroquia.parr_descripcion,
          }))}
          error={errors.parroquia_id}
        />
      </div>

      <TextAreaInput
        id="Direccion"
        name="Direccion"
        label="Dirección de casa"
        value={formState.dataLocation.Direccion}
        onChange={handleChange}
        error={errors.Direccion}
      />

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          id="TelefonoFijo"
          name="TelefonoFijo"
          label="Teléfono de casa"
          type="tel"
          value={formState.dataLocation.TelefonoFijo}
          onChange={handleChange}
          error={errors.contacto}
        />
        <TextInput
          id="TelefonoCelular"
          name="TelefonoCelular"
          label="Teléfono celular"
          type="tel"
          value={formState.dataLocation.TelefonoCelular}
          onChange={handleChange}
          error={errors.contacto}
        />
      </div>

      <TextInput
        id="Correo"
        name="Correo"
        label="Correo"
        type="email"
        value={formState.dataLocation.Correo}
        onChange={handleChange}
        error={errors.contacto}
      />

        {/* {errors && <p className="text-red-500 text-xs">{errors}</p>} */}

        <RadioGroup
        label="¿Es el solicitante también el beneficiario?"
        name="isAplicantBeneficiary"
        value={formState.isAplicantBeneficiary}
        onChange={handleChange}
        options={[
            { value: "SI", label: "Sí" },
            { value: "NO", label: "No" },
        ]}
        />
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Atrás
        </button>
        <button
          type="submit"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
}