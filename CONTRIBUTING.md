# Contributing to Guide Africa Premium

## Getting Started

### Prerequisites
- Java 14+ (JDK)
- Node.js 18+
- Maven 3.9+
- PostgreSQL 15+ (or Docker)

### Local Setup

1. Clone the repository
```bash
git clone https://github.com/Adams-Chamsy/Guide-africa-premium.git
cd Guide-africa-premium
```

2. Copy the environment file
```bash
cp .env.example .env
# Edit .env with your local values
```

3. Start the backend
```bash
cd backend
./mvnw spring-boot:run
```

4. Start the frontend
```bash
cd frontend
npm install
npm start
```

## Development Guidelines

### Backend (Spring Boot 2.7.18)
- Use `javax.validation` annotations (NOT `jakarta`)
- All new endpoints must have `@PreAuthorize` on write operations
- Use DTOs for all `@RequestBody` parameters (never expose entities directly)
- Sanitize user input with `HtmlSanitizer` utility
- Use `ResourceNotFoundException` instead of `RuntimeException`

### Frontend (React 19)
- Use functional components with hooks
- Wrap all translatable strings with `t()` from `useTranslation()`
- Use `key={item.id}` instead of `key={index}` for lists
- Use `useCallback` for event handlers passed to child components
- Always add `loading="lazy"` and meaningful `alt` text to images

### Commits
- Write clear, concise commit messages
- Reference issue numbers when applicable

### Code Style
- Backend: 4 spaces indentation
- Frontend: 2 spaces indentation (see `.prettierrc`)
- See `.editorconfig` for full style rules

## Project Structure

```
Guide-africa-premium/
├── backend/                 # Spring Boot API
│   ├── src/main/java/com/guideafrica/premium/
│   │   ├── controller/      # REST controllers
│   │   ├── dto/             # Request/Response DTOs
│   │   ├── exception/       # Custom exceptions
│   │   ├── model/           # JPA entities
│   │   ├── repository/      # Spring Data repositories
│   │   ├── service/         # Business logic
│   │   └── util/            # Utilities (sanitizer, etc.)
│   └── src/main/resources/
│       └── db/migration/    # Flyway migrations
├── frontend/                # React SPA
│   ├── src/
│   │   ├── api/             # API client (axios)
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── locales/         # i18n translations (fr/en)
│   │   └── pages/           # Page components
│   └── public/
├── .github/workflows/       # CI/CD
├── docker-compose.yml       # Local Docker setup
└── .env.example             # Environment template
```
