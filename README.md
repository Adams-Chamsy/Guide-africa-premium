# Guide Africa Premium

Guide de reference pour les meilleurs restaurants et hotels d'Afrique.

## Architecture

- **Backend**: Spring Boot 2.7.18 (Java 14), REST API, JWT Auth, JPA/Hibernate
- **Frontend**: React 19, React Router 7, i18next (FR/EN), Leaflet maps
- **Database**: H2 (dev), PostgreSQL (prod)
- **Email**: Spring Mail with SMTP
- **PWA**: Service Worker, manifest.json

## Setup Local

### Prerequisites
- Java 14+
- Node.js 18+
- Maven 3.8+

### Backend
```bash
cd backend
./mvnw spring-boot:run
```
L'API demarre sur http://localhost:8080

### Frontend
```bash
cd frontend
npm install
npm start
```
L'app demarre sur http://localhost:3000

### Comptes de test (profil dev)
- **Admin**: admin@guideafrica.com / admin123
- **User**: aminata@example.com / password123

## Variables d'environnement

### Backend
| Variable | Description | Default |
|----------|-------------|---------|
| JWT_SECRET | Secret JWT (min 256 bits) | Dev secret |
| CORS_ORIGINS | Origins CORS (virgule) | localhost:3000,8080 |
| DB_HOST | Host PostgreSQL | localhost |
| DB_PORT | Port PostgreSQL | 5432 |
| DB_NAME | Nom de la base | guideafrica |
| DB_USERNAME | User PostgreSQL | guideafrica |
| DB_PASSWORD | Password PostgreSQL | - |
| UPLOAD_DIR | Repertoire uploads | ./uploads |
| MAIL_HOST | Serveur SMTP | smtp.gmail.com |
| MAIL_USERNAME | Email SMTP | - |
| MAIL_PASSWORD | Password SMTP | - |

### Frontend
| Variable | Description | Default |
|----------|-------------|---------|
| REACT_APP_API_URL | URL de l'API | /api/v1 |

## Build Production

### Docker
```bash
docker-compose up -d
```

### Manuel
```bash
# Backend
cd backend
./mvnw package -DskipTests -Pprod
java -jar target/*.jar --spring.profiles.active=prod

# Frontend
cd frontend
npm run build
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Inscription |
| POST | /api/v1/auth/login | Connexion |
| POST | /api/v1/auth/forgot-password | Mot de passe oublie |
| POST | /api/v1/auth/reset-password | Reset mot de passe |
| GET | /api/v1/restaurants | Liste restaurants |
| GET | /api/v1/hotels | Liste hotels |
| GET | /api/v1/cities | Liste villes |
| GET | /api/v1/ratings/top/* | Classements |
| POST | /api/v1/reservations | Creer reservation |
| GET | /api/v1/notifications | Notifications |

## Licence

Tous droits reserves - Guide Africa Premium
