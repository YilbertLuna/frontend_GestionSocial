'use client';
import { useState, useEffect } from 'react';
import TextInput from '../TextInput';
import TextAreaInput from '../TextAreaInput';
import SelectInput from '../SelectInput';

export default function BeneficiaryInfo({ onNext, onPrev, updateFormData, formData }) {
  const [formState, setFormState] = useState({
    beneficiaryData: {
      benf_nombres: formData.benf_nombres || "",
      benf_apellidos: formData.benf_apellidos || "",
      benf_cedula: formData.benf_cedula || "",
      benf_direccion: formData.benf_direccion || "",
      benf_parroquia: formData.benf_parroquia || "",
      benf_municipio: formData.benf_municipio || "",
      benf_estado: formData.benf_estado || "",
      benf_fec_nac: formData.benf_fec_nac || "",
      benf_document: formData.benf_document || "",
    },
  });

  const [errors, setErrors] = useState({});
  const [isInstitution, setIsInstitution] = useState(false);

  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [parroquias, setParroquias] = useState([]);

  // Cargar los estados al montar el componente
  useEffect(() => {
    async function fetchEstados() {
      try {
        const res = await fetch('http://localhost:3030/api/estado', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await res.json();
        if (res.ok) {
          setEstados(data);
        } else {
          setEstados([]);
        }
      } catch (error) {
        console.error('Error al cargar los estados:', error);
      }
    }
    fetchEstados();
  }, []);

  // Cargar los municipios cuando se seleccione un estado
  useEffect(() => {
    if (formState.beneficiaryData.benf_estado) {
      async function fetchMunicipios() {
        try {
          const res = await fetch('http://localhost:3030/api/municipio', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ id_estado: formState.beneficiaryData.benf_estado }),
          });

          const data = await res.json();
          if (res.ok) {
            setMunicipios(data);
          } else {
            setMunicipios([]);
          }
        } catch (error) {
          console.error('Error al cargar los municipios:', error);
        }
      }
      fetchMunicipios();
    } else {
      setMunicipios([]); // Limpiar municipios si no hay estado seleccionado
      setParroquias([]); // Limpiar parroquias también
    }
  }, [formState.beneficiaryData.benf_estado]);

  // Cargar las parroquias cuando se seleccione un municipio
  useEffect(() => {
    if (formState.beneficiaryData.benf_municipio) {
      async function fetchParroquias() {
        try {
          const res = await fetch('http://localhost:3030/api/parroquia', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              id_estado: formState.beneficiaryData.benf_estado,
              id_municipio: formState.beneficiaryData.benf_municipio,
            }),
          });

          const data = await res.json();
          if (res.ok) {
            setParroquias(data);
          } else {
            setParroquias([]);
          }
        } catch (error) {
          console.error('Error al cargar las parroquias:', error);
        }
      }
      fetchParroquias();
    } else {
      setParroquias([]); // Limpiar parroquias si no hay municipio seleccionado
    }
  }, [formState.beneficiaryData.benf_municipio]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      beneficiaryData: {
        ...prev.beneficiaryData,
        [name]: ["benf_estado", "benf_municipio", "benf_parroquia"].includes(name)
          ? Number(value) // Convertir a número si es uno de estos campos
          : value,
      },
    }));
  };
  
  const validateErrors = () => {
    const newErrors = {};
  
    if (!formState.beneficiaryData.benf_document) {
      newErrors.beneficiaryDocumentType = "El tipo de documento es requerido";
    }

    if (!formState.beneficiaryData.benf_cedula) {
      newErrors.beneficiaryDocumentNumber = "El número de documento es requerido";
    }
  
    if (isInstitution) {
      if (!formState.beneficiaryData.benf_nombres) {
        newErrors.institutionName = "El nombre de la institución es requerido";
      }

      if (!formState.beneficiaryData.benf_apellidos) {
        newErrors.legalRepresentative = "El nombre del representante legal es requerido";
      }

    } else {

      if (!formState.beneficiaryData.benf_nombres) {
        newErrors.beneficiaryFirstName = "Los nombres son requeridos";
      }
      
      if (!formState.beneficiaryData.benf_apellidos) {
        newErrors.beneficiaryLastName = "Los apellidos son requeridos";
      }

      if (!formState.beneficiaryData.benf_fec_nac) {
        newErrors.beneficiaryDateOfBirth = "La fecha de nacimiento es requerida";
      }
    }
  
    if (!formState.beneficiaryData.benf_estado || isNaN(formState.beneficiaryData.benf_estado)) {
      newErrors.beneficiaryState = "El estado de residencia es requerido y debe ser un número";
    }

    if (!formState.beneficiaryData.benf_municipio || isNaN(formState.beneficiaryData.benf_municipio)) {
      newErrors.beneficiaryMunicipality = "El municipio es requerido y debe ser un número";
    }
    if (!formState.beneficiaryData.benf_parroquia || isNaN(formState.beneficiaryData.benf_parroquia)) {
      newErrors.beneficiaryParish = "La parroquia es requerida y debe ser un número";
    }
    
    if (!formState.beneficiaryData.benf_direccion) {
      newErrors.beneficiaryAddress = "La dirección es requerida";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateErrors()) {
      updateFormData(formState);
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Información del beneficiario</h2>

      <div className="flex items-center space-x-2 mb-4">
        <label htmlFor="isInstitution" className="block text-sm font-medium text-gray-700">
          ¿El beneficiario es una institución?
        </label>
        <input
          id="isInstitution"
          type="checkbox"
          checked={isInstitution}
          onChange={(e) => setIsInstitution(e.target.checked)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <SelectInput
          id="benf_document"
          name="benf_document"
          label="Tipo de documento"
          value={formState.beneficiaryData.benf_document}
          onChange={handleChange}
          options={[
            { value: 'V', label: 'V' },
            { value: 'E', label: 'E' },
            { value: 'J', label: 'J' },
            { value: 'G', label: 'G' },
            { value: 'P', label: 'P' },
          ]}
          error={errors.beneficiaryDocumentType}
        />
        <TextInput
          id="benf_cedula"
          name="benf_cedula"
          label="Número de documento"
          value={formState.beneficiaryData.benf_cedula}
          onChange={handleChange}
          error={errors.beneficiaryDocumentNumber}
        />
      </div>

      {isInstitution ? (
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            id="benf_nombres"
            name="benf_nombres"
            label="Nombre de la institución"
            value={formState.beneficiaryData.benf_nombres}
            onChange={handleChange}
            error={errors.institutionName}
          />
          <TextInput
            id="benf_apellidos"
            name="benf_apellidos"
            label="Representante legal"
            value={formState.beneficiaryData.benf_apellidos}
            onChange={handleChange}
            error={errors.legalRepresentative}
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              id="benf_nombres"
              name="benf_nombres"
              label="Nombres"
              value={formState.beneficiaryData.benf_nombres}
              onChange={handleChange}
              error={errors.beneficiaryFirstName}
            />
            <TextInput
              id="benf_apellidos"
              name="benf_apellidos"
              label="Apellidos"
              value={formState.beneficiaryData.benf_apellidos}
              onChange={handleChange}
              error={errors.beneficiaryLastName}
            />
          </div>
          <TextInput
            id="benf_fec_nac"
            name="benf_fec_nac"
            label="Fecha de nacimiento"
            type="date"
            value={formState.beneficiaryData.benf_fec_nac}
            onChange={handleChange}
            error={errors.beneficiaryDateOfBirth}
          />
        </>
      )}

      <div className="grid grid-cols-2 gap-4">
        <SelectInput
          id="benf_estado"
          name="benf_estado"
          label="Estado"
          value={formState.beneficiaryData.benf_estado}
          onChange={handleChange}
          options={estados.map((estado) => ({
            value: estado.estado_id,
            label: estado.estado_descripcion,
          }))}
          error={errors.beneficiaryState}
        />
        <SelectInput
          id="benf_municipio"
          name="benf_municipio"
          label="Municipio"
          value={formState.beneficiaryData.benf_municipio}
          onChange={handleChange}
          options={municipios.map((municipio) => ({
            value: municipio.muni_id,
            label: municipio.muni_descripcion,
          }))}
          error={errors.beneficiaryMunicipality}
        />
        <SelectInput
          id="benf_parroquia"
          name="benf_parroquia"
          label="Parroquia"
          value={formState.beneficiaryData.benf_parroquia}
          onChange={handleChange}
          options={parroquias.map((parroquia) => ({
            value: parroquia.parr_id,
            label: parroquia.parr_descripcion,
          }))}
          error={errors.beneficiaryParish}
        />
      </div>

      <TextAreaInput
        id="benf_direccion"
        name="benf_direccion"
        label="Dirección"
        value={formState.beneficiaryData.benf_direccion}
        onChange={handleChange}
        error={errors.beneficiaryAddress}
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