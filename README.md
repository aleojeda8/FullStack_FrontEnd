# 💻 Mi App (Frontend)
 
Aplicación web de gestión de usuarios construida con **React**, **TypeScript** y **Vite**, que consume la API de [FullStack Backend](../FullStack_backend).
 
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF4154?style=for-the-badge&logo=react-router&logoColor=white)
 
---
 
## 📋 Índice
 
- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Variables de entorno](#-variables-de-entorno)
- [Scripts disponibles](#-scripts-disponibles)
- [Rutas de la aplicación](#-rutas-de-la-aplicación)
- [Conexión con la API](#-conexión-con-la-api)
- [Autor](#-autor)
---
 
## 📖 Descripción
 
Interfaz web para la gestión de usuarios, con pantallas de login, listado/creación de usuarios y solicitud de edición de datos. Se conecta al backend mediante peticiones autenticadas con **JWT**.
 
## ✨ Características
 
- 🔐 Login con autenticación JWT (token guardado en `localStorage`).
- 👥 Alta, listado, edición y baja de usuarios.
- ✉️ Solicitud de edición de datos personales vía email.
- 🧭 Ruteo declarativo con TanStack Router.
- 🎨 Estilado con CSS Modules por componente/página.
- 🧩 Componentes reutilizables (`Button`, `Modal`, `Navigation`).
## 🧰 Tecnologías
 
| Tecnología | Uso |
|---|---|
| React 18/19 | Librería de UI |
| TypeScript | Tipado estático |
| Vite | Bundler y servidor de desarrollo |
| TanStack Router | Ruteo de la aplicación |
| CSS Modules | Estilos aislados por componente |
 
## 📂 Estructura del proyecto
 
```
mi-app/
├── public/                        # Assets estáticos (imágenes, videos)
├── src/
│   ├── api/                       # Funciones de conexión con el backend
│   │   ├── createUser.ts
│   │   ├── deleteUser.ts
│   │   ├── getUsers.ts
│   │   ├── login.ts
│   │   ├── requestEditUser.ts
│   │   ├── types.ts
│   │   └── updateUser.ts
│   ├── components/
│   │   ├── blocks/                # Bloques compuestos (Navigation, Modal, LoginRightSide)
│   │   └── ui/                    # Componentes de UI genéricos (Button)
│   ├── config/
│   │   └── globals.ts             # Configuración global (API_URL)
│   ├── pages/
│   │   ├── CreateUser/
│   │   ├── Home/
│   │   └── Login/
│   ├── styles/                    # Estilos globales y variables CSS
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx                 # Definición de rutas
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```
 
## ⚙️ Instalación
 
```bash
# Clonar el repositorio
git clone https://github.com/aleojeda8/FullStack_FrontEnd.git
cd mi-app
 
# Instalar dependencias
npm install
 
# Levantar en modo desarrollo
npm run dev
```
 
La aplicación quedará disponible en `http://localhost:4173` (puerto por defecto de Vite).
 
## 🔑 Variables de entorno
 
Actualmente la URL de la API está definida en `src/config/globals.ts`:
 
```ts
export const API_URL = 'http://localhost:7000';
```
 
> 💡 Se recomienda migrar este valor a una variable de entorno de Vite (`VITE_API_URL`) para poder configurar distintos entornos (desarrollo, staging, producción) sin tocar el código.
 
## 📜 Scripts disponibles
 
| Comando | Descripción |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo |
| `npm run build` | Compila la aplicación para producción |
| `npm run preview` | Sirve localmente el build de producción |
 
## 🧭 Rutas de la aplicación
 
| Ruta | Página | Descripción |
|---|---|---|
| `/` | `Home` | Listado y gestión de usuarios |
| `/login` | `Login` | Inicio de sesión |
| `/create-user` | `CreateUser` | Alta de nuevo usuario |
 
## 🔗 Conexión con la API
 
La capa `src/api/` centraliza la comunicación con el backend. Todas las peticiones autenticadas envían el token guardado en `localStorage`:
 
```ts
headers: {
  Authorization: `Bearer ${token}`,
}
```
 
| Función | Endpoint consumido |
|---|---|
| `login()` | `POST /auth/login` |
| `getUsers()` | `GET /users` |
| `createUser()` | `POST /users` |
| `updateUser()` | `PUT /users/:id` |
| `deleteUser()` | `DELETE /users/:id` |
| `requestEditUser()` | `POST /users/request-edit` |
 
## 👨‍💻 Autor: Alejandro Ojeda
 
Proyecto frontend conectado a [FullStack Backend](https://github.com/aleojeda8/FullStack_backend).