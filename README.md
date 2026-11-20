# RehabHur — Frontend

Aplicación web de telerehabilitación construida con React 19, TypeScript y Vite.
Consume la API REST de `rehabhur-api`.

## Requisitos

- Node.js 20 o superior
- npm
- La API de RehabHur corriendo (por defecto en `http://localhost:3000`)

## Desarrollo

```sh
npm install
npm run dev
```

Vite publica la aplicación en `http://localhost:5173`.

## Conexión con la API

La URL base se configura con la variable de entorno `VITE_API_URL`. Si no se
define, se usa `http://localhost:3000/api/v1`.

```sh
cp .env.example .env
```

La API debe tener CORS habilitado, ya que el front corre en otro puerto.

## Scripts

- `npm run dev`: servidor de desarrollo con HMR.
- `npm run build`: verificación de tipos y build de producción.
- `npm run lint`: análisis con ESLint.
- `npm run preview`: vista previa del build.

## Módulos conectados

- **Ejercicios**: listado, búsqueda, creación, edición y eliminación contra
  `/api/v1/exercises`.
- **Opciones del formulario**: regiones corporales, tipos de movimiento y
  materiales desde `/api/v1/options`.
- **Personas**: listado por rol, creación, edición y eliminación contra
  `/api/v1/persons`.

Los datos de la API son en memoria: se reinician al reiniciar el servidor.

## Docker

Antes de empezar:

- Tener Docker Desktop abierto.
- Tener la API corriendo en `http://localhost:3000`.

Crear la imagen:

```sh
docker build --build-arg VITE_API_URL=http://localhost:3000/api/v1 -t rehabhur-front .
```

Correr el contenedor:

```sh
docker run -d --name rehabhur-front -p 8080:80 rehabhur-front
```

Con `docker ps` se puede ver si está corriendo. La aplicación queda en
`http://localhost:8080`.



