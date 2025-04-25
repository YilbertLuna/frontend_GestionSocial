# Gestión Social

Este es un proyecto desarrollado para la Gobernación del Estado Táchira, diseñado para gestionar solicitudes sociales de manera eficiente. Este sistema permite registrar, buscar, actualizar y visualizar información relacionada con solicitantes, beneficiarios y trámites.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Rutas Principales](#rutas-principales)
- [Componentes Principales](#componentes-principales)
- [Configuración y Ejecución](#configuración-y-ejecución)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Contribuciones](#contribuciones)

---

## Descripción General

El sistema de Gestión Social es una aplicación web construida con **Next.js** que permite a los usuarios realizar las siguientes acciones:

- Registrar nuevos trámites.
- Buscar trámites existentes por número, cédula o nombre.
- Actualizar el estado de los trámites.
- Visualizar información detallada de solicitantes y beneficiarios.
- Gestionar datos relacionados con áreas, servicios y requisitos.

El sistema está diseñado para ser modular, escalable y fácil de mantener.

---

## Estructura del Proyecto

El proyecto sigue una estructura organizada para facilitar el desarrollo y mantenimiento:

```
├── .env.example          # Variables de entorno de ejemplo
├── .gitignore            # Archivos y carpetas ignorados por Git
├── compose.yaml          # Configuración de Docker Compose
├── Dockerfile            # Configuración del contenedor Docker
├── eslint.config.mjs     # Configuración de ESLint
├── jsconfig.json         # Configuración de rutas absolutas
├── next.config.mjs       # Configuración de Next.js
├── package.json          # Dependencias y scripts del proyecto
├── postcss.config.mjs    # Configuración de PostCSS
├── README.md             # Documentación del proyecto
├── tailwind.config.mjs   # Configuración de Tailwind CSS
├── public/               # Archivos estáticos
├── src/                  # Código fuente principal
│   ├── app/              # Páginas y layouts de Next.js
│   ├── components/       # Componentes reutilizables
│   ├── middleware.js     # Middleware para autenticación
│   └── globals.css       # Estilos globales
```

---

## Rutas Principales

### **Páginas Públicas**

- `/login`: Página de inicio de sesión.

### **Páginas Privadas**

- `/`: Página de bienvenida.
- `/registro/nuevo-registro`: Registro de nuevos trámites.
- `/registro/busqueda-solicitud`: Búsqueda de trámites por número, cédula o nombre.
- `/registro/busqueda-solicitante`: Búsqueda de solicitantes por cédula, nombre o apellido.
- `/registro/tramite/[id_tram]`: Visualización de información detallada de un trámite.
- `/registro/persona/[id_person]`: Visualización de información detallada de un solicitante o beneficiario.
- `/estatus/cambio-estatus`: Búsqueda y actualización del estado de un trámite.
- `/estatus/status-tramite/[id_tram]`: Actualización del estado de un trámite específico.

---

## Componentes Principales

### **Formulario**

- `FormLoginUser`: Formulario de inicio de sesión.
- `ApplicationForm`: Formulario para registrar nuevos trámites, dividido en pasos.

### **Búsqueda**

- `SearchTramites`: Componente para buscar trámites.
- `SearchPersons`: Componente para buscar solicitantes.
- `SelectTramites`: Componente para buscar trámites y actualizarlos.

### **Visualización**

- `InfoCard`: Tarjeta para mostrar información resumida.
- `DatosPersona`: Muestra información detallada de un solicitante o beneficiario.
- `ListaTramites`: Lista de trámites asociados a un solicitante.

### **Modales**

- `ModalSucess`: Modal para mostrar mensajes de éxito.
- `ModalError`: Modal para mostrar mensajes de error.

### **Otros**

- `Navbar`: Barra de navegación principal.
- `Loading`: Indicador de carga.
- `TextInput`, `TextAreaInput`, `SelectInput`, `RadioGroup`: Componentes reutilizables para formularios.

---

## Configuración y Ejecución

### **Requisitos Previos**

- Node.js (v20.7.0 o superior)
- Docker (opcional, para contenedores)

### **Instalación**

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Configura las variables de entorno:
   Copia el archivo `.env.example` a `.env` y completa los valores necesarios.

### **Ejecución en Desarrollo**

```bash
npm run dev
```

### **Construcción para Producción**

```bash
npm run build
npm start
```

### **Ejecución con Docker**

1. Construye la imagen:

   ```bash
   docker-compose build
   ```

2. Inicia el contenedor:
   ```bash
   docker-compose up
   ```

---

## Tecnologías Utilizadas

- **Framework**: [Next.js](https://nextjs.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Autenticación**: Middleware con [jose](https://github.com/panva/jose)
- **Componentes**: React y React Icons
- **Gestión de Formularios**: [React Hook Form](https://react-hook-form.com/)
- **Contenedores**: Docker y Docker Compose

---

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Añadida nueva funcionalidad"
   ```
4. Envía tus cambios:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request en GitHub.

---

## Autor

Desarrollado por [Yilbert Luna](https://github.com/YilbertLuna).
