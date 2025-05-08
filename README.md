# Satrix - Plataforma de Facturación Automatizada con IA

**Satrix** es una plataforma web que automatiza el proceso de facturación electrónica usando inteligencia artificial. Está diseñada para usuarios que requieren generar CFDI a partir de boletos de viaje, envíos y consumos de alimentos, optimizando la experiencia mediante extracción automática de datos con Google Cloud Vision AI y Document AI.

## 🧠 Funcionalidades Clave

- Extracción automática de token y RFC desde imágenes o PDFs usando OCR.
- Interfaz intuitiva, responsiva y optimizada para escritorio y móviles.
- Facturación electrónica inmediata con validación contra base de datos.
- Recuperación de CFDI por token y RFC.
- Asistente virtual para soporte al usuario.
- Cumplimiento con normativas fiscales mexicanas y principios de seguridad de OWASP.

## 🛠 Tecnologías Usadas

- **Frontend**: Angular 16 + Angular CLI 19.2.7
- **Backend**: Node.js 22.14.0 + Express
- **Base de datos**: MariaDB 11.7.2
- **OCR y AI**: Google Cloud Vision AI + Document AI
- **Almacenamiento temporal**: Multer
- **Seguridad**: dotenv, HTTPS, control de acceso basado en roles

## 🚀 Instalación Local

### Clonar el proyecto
```bash
git clone https://github.com/tuusuario/satrix.git
cd satrix
```

### Backend (Node.js)
```bash
cd backend-gemini
npm install
```

#### Crear archivo `.env`
```env
GOOGLE_APPLICATION_CREDENTIALS=./keys/clave.json
PUERTO=3001
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_clave
DB_NAME=satrix
```

#### Ejecutar servidor backend
```bash
npm start
```

### Frontend (Angular)
```bash
cd ../satrix
npm install
ng serve
```

Abrir navegador en `http://localhost:4200`.

## 🧪 Pruebas

### Pruebas Unitarias (Frontend)
```bash
ng test
```

### (Opcional) Pruebas de extremo a extremo (si se implementan)
```bash
ng e2e
```

## 📦 Estructura del Proyecto

```
/satrix
  └── src/app/pages/           # Vistas principales (facturación, recuperación, etc.)
/backend-gemini
  ├── routes/                  # Rutas Express
  ├── services/                # Lógica de OCR y validaciones
  ├── uploads/                 # Archivos temporales
  └── .env                     # Variables sensibles (no subir)
```

## 🔒 Seguridad y Buenas Prácticas

- Variables sensibles en `.env` (no incluidas en Git).
- Datos transmitidos únicamente por HTTPS.
- Sanitización de entradas del usuario.
- Cumple con OWASP, ISO/IEC 27001 y NIST SP 800-53.

## 💵 Costos Estimados (Producción)

| Servicio                      | Estimado mensual USD |
|------------------------------|----------------------|
| Google Vision AI OCR         | $2,250               |
| Backend (Cloud Run)          | $25 – $50            |
| Base de Datos (Cloud SQL)    | $30 – $60            |
| Frontend (Firebase/CDN)      | $5 – $15             |
| Almacenamiento (CloudStorage)| $5 – $10             |
| **Total estimado**           | ~$2,315 – $2,385     |

## 👥 Equipo de Desarrollo

- Sofia Ruvalcaba de la Noval
- Evelyn Madai Yam Falcon
- Francisco Antonio Hidalgo Alvarado
