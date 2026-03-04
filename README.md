# Guide Africa Premium

Guide de reference pour les meilleurs restaurants et hotels d'Afrique.

## Architecture

- **Backend**: Spring Boot 2.7.18 (Java 17), REST API, JWT Auth, JPA/Hibernate, Flyway
- **Frontend**: React 19, React Router 7, i18next (FR/EN), Leaflet maps, Recharts
- **Database**: H2 (dev), PostgreSQL/Supabase (prod)
- **Email**: Spring Mail with SMTP
- **PWA**: Service Worker, manifest.json
- **API Docs**: Swagger/OpenAPI at `/swagger-ui.html`
- **CI/CD**: GitHub Actions

## Setup Local

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.9+

### Backend
```bash
cd backend
export JWT_SECRET=your_jwt_secret_minimum_256_bits_long
./mvnw spring-boot:run -Dspring.profiles.active=dev
```
L'API demarre sur http://localhost:8080

### Frontend
```bash
cd frontend
npm install
npm start
```
L'app demarre sur http://localhost:3000

### Comptes de test (profil dev uniquement)
- **Admin**: admin@guideafrica.com / admin123
- **User**: aminata@example.com / password123

## Variables d'environnement

### Backend (Production)
| Variable | Description | Requis |
|----------|-------------|--------|
| JWT_SECRET | Secret JWT (min 256 bits) | Oui |
| DATABASE_URL | URL JDBC PostgreSQL | Oui |
| DATABASE_USERNAME | User PostgreSQL | Oui |
| DATABASE_PASSWORD | Password PostgreSQL | Oui |
| CORS_ORIGINS | Origins CORS (virgule) | Non (default: localhost) |
| UPLOAD_DIR | Repertoire uploads | Non (default: ./uploads) |
| MAIL_HOST | Serveur SMTP | Non |
| MAIL_USERNAME | Email SMTP | Non |
| MAIL_PASSWORD | Password SMTP | Non |
| MAIL_FROM | Email expediteur | Non |

### Frontend
| Variable | Description | Default |
|----------|-------------|---------|
| REACT_APP_API_URL | URL de l'API | /api/v1 |

## Build & Deploy

### Docker (recommande)
```bash
# Configurer les variables
cp backend/.env.example .env
# Editer .env avec vos valeurs
docker-compose up -d
```

### Manuel
```bash
# Backend
cd backend
./mvnw package -DskipTests
java -jar target/*.jar --spring.profiles.active=prod

# Frontend
cd frontend
npm run build
# Servir le dossier build/ avec nginx
```

### Supabase
Pour connecter a Supabase PostgreSQL :
```
DATABASE_URL=jdbc:postgresql://your-host:6543/postgres?prepareThreshold=0
DATABASE_USERNAME=postgres.your-project-ref
DATABASE_PASSWORD=your-password
```
Note: Port 6543 = PgBouncer pooler, `prepareThreshold=0` requis.

## Database Migrations

Les migrations SQL sont gerees par Flyway dans `backend/src/main/resources/db/migration/`.
- V1: Baseline (tables creees par Hibernate)
- Ajouter de nouvelles migrations: `V2__description.sql`, `V3__description.sql`, etc.

## Security

- JWT authentication avec token refresh
- Rate limiting sur endpoints d'auth (10 req/min par IP)
- Security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options)
- CORS configurable via variable d'environnement
- Password hashing avec BCrypt
- Input validation sur tous les endpoints

## Monitoring

- Health check: `GET /actuator/health`
- Docker healthchecks configures pour tous les services
- Structured logging via logback (JSON en prod)

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/v1/auth/register | Inscription | Non |
| POST | /api/v1/auth/login | Connexion | Non |
| POST | /api/v1/auth/forgot-password | Mot de passe oublie | Non |
| POST | /api/v1/auth/reset-password | Reset mot de passe | Non |
| GET | /api/v1/restaurants | Liste restaurants | Non |
| GET | /api/v1/restaurants/{id} | Detail restaurant | Non |
| GET | /api/v1/hotels | Liste hotels | Non |
| GET | /api/v1/hotels/{id} | Detail hotel | Non |
| GET | /api/v1/cities | Liste villes | Non |
| GET | /api/v1/search?q=... | Recherche globale | Non |
| GET | /api/v1/ratings/top/* | Classements | Non |
| GET | /api/v1/blog | Articles blog | Non |
| GET | /api/v1/events | Evenements | Non |
| POST | /api/v1/newsletter/subscribe | Newsletter | Non |
| POST | /api/v1/reservations | Creer reservation | Oui |
| GET | /api/v1/notifications | Notifications | Oui |
| GET | /api/v1/user/favorites | Mes favoris | Oui |
| GET | /api/v1/collections | Mes collections | Oui |
| GET | /api/v1/social | Feed social | Oui |
| GET | /api/v1/admin/stats | Stats admin | Admin |
| GET | /swagger-ui.html | Documentation API | Non |

## Tests

```bash
# Backend
cd backend
./mvnw test

# Frontend
cd frontend
npm test
npm run test:coverage
```

## Licence

Tous droits reserves - Guide Africa Premium
