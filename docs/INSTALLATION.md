# Installation & Setup Guide

## MAI - SAJE LIMITED Complete Installation Guide

---

## Prerequisites

- **Node.js**: 18+ 
- **npm**: 9+
- **Docker**: 20+
- **PostgreSQL**: 14+
- **Redis**: 7+
- **Git**: 2.37+

---

## 1. CLONE REPOSITORY

```bash
git clone https://github.com/albanee1201-create/mai-saje-rice-limited.git
cd mai-saje-rice-limited
```

---

## 2. ENVIRONMENT SETUP

### Create .env file

```bash
cp .env.example .env
```

### Edit .env with your values

```bash
# Application
NODE_ENV=development
PORT=3000
PORT_BACKEND=5000
APP_URL=http://localhost:3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mai_saje_db
DB_USER=admin
DB_PASSWORD=your_secure_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=24h

# Payment Gateways
PAYSTACK_SECRET_KEY=sk_test_xxxxx
PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST_xxxxx

# Email (SendGrid)
SENDGRID_API_KEY=your_sendgrid_key

# AWS
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET=mai-saje-bucket
AWS_REGION=us-east-1

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# Google Maps
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

---

## 3. BACKEND SETUP

### Install Dependencies

```bash
cd backend
npm install
```

### Create Database

```bash
# Using PostgreSQL CLI
createdb -U admin mai_saje_db

# Or using Docker
docker run -d \
  --name mai-saje-postgres \
  -e POSTGRES_DB=mai_saje_db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  postgres:14-alpine
```

### Run Migrations

```bash
npm run migrate
```

### Seed Database (Optional)

```bash
npm run seed
```

### Start Backend Development Server

```bash
npm run dev
```

Backend will be available at: `http://localhost:5000`

---

## 4. FRONTEND SETUP

### Install Dependencies

```bash
cd frontend
npm install
```

### Generate Environment Config

```bash
# .env.local
REACT_APP_API_URL=http://localhost:5000
REACT_APP_PAYSTACK_KEY=pk_test_xxxxx
REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_key
```

### Start Frontend Development Server

```bash
npm run dev
```

Frontend will be available at: `http://localhost:3000`

---

## 5. MOBILE APP SETUP

### Install Dependencies

```bash
cd mobile
npm install

# For iOS (macOS only)
cd ios
pod install
cd ..
```

### Android Setup

```bash
# Configure Android environment
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Start Android emulator or connect device
adb devices

# Run app
npm run android
```

### iOS Setup

```bash
# Run app on iOS simulator
npm run ios

# Or on physical device
npm run ios -- --device "iPhone"
```

---

## 6. DOCKER COMPOSE DEPLOYMENT

### Full Stack with Docker Compose

```bash
# From project root
docker-compose up -d

# View logs
docker-compose logs -f

# Services running:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:5000
# - PostgreSQL: localhost:5432
# - Redis: localhost:6379
# - Nginx: http://localhost:80
```

### Individual Service Commands

```bash
# Start specific service
docker-compose up -d backend

# Rebuild service
docker-compose build backend

# View logs
docker-compose logs -f backend

# Execute command in container
docker-compose exec backend npm run migrate

# Stop services
docker-compose stop

# Remove containers
docker-compose down

# Remove volumes (WARNING: deletes data)
docker-compose down -v
```

---

## 7. DEVELOPMENT WORKFLOW

### Branch Strategy

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: Add your feature"

# Push to remote
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Mobile tests
cd mobile
npm test
```

### Code Quality

```bash
# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

---

## 8. DATABASE MANAGEMENT

### Connect to PostgreSQL

```bash
# Docker container
docker exec -it mai-saje-postgres psql -U admin -d mai_saje_db

# Local installation
psql -U admin -d mai_saje_db -h localhost
```

### Useful SQL Commands

```sql
-- List all tables
\dt

-- Describe table
\d users

-- Query data
SELECT * FROM users LIMIT 10;

-- Create backup
pg_dump -U admin mai_saje_db > backup.sql

-- Restore from backup
psql -U admin mai_saje_db < backup.sql
```

---

## 9. API TESTING

### Using Postman

1. Import collection: `./docs/postman-collection.json`
2. Set environment variables:
   - `base_url`: http://localhost:5000
   - `auth_token`: (obtained from login)
3. Run requests

### Using cURL

```bash
# Register user
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123"
  }'

# Get products
curl -X GET http://localhost:5000/api/v1/products \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 10. TROUBLESHOOTING

### Backend Issues

**Port already in use**
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

**Database connection error**
```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Verify connection string in .env
# Format: postgresql://user:password@host:port/database
```

**Redis connection error**
```bash
# Check Redis is running
docker ps | grep redis

# Test connection
redis-cli ping
```

### Frontend Issues

**Port already in use**
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

**Module not found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**CORS errors**
```bash
# Check CORS_ORIGIN in backend .env
# Should include http://localhost:3000 for development
```

### Mobile App Issues

**Android build failure**
```bash
# Clear Android build cache
cd android
./gradlew clean
./gradlew build
cd ..
```

**iOS pod dependency issues**
```bash
cd ios
pod repo update
pod install
cd ..
npm run ios
```

---

## 11. PRODUCTION DEPLOYMENT

### Build Frontend

```bash
cd frontend
npm run build
# Output: .next/ directory
```

### Build Backend

```bash
cd backend
npm run build
# Output: build/ directory
```

### Docker Production Build

```bash
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
```

### Deploy to Cloud

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions on:
- AWS Deployment
- Google Cloud Deployment
- DigitalOcean Deployment
- Kubernetes Deployment

---

## 12. USEFUL COMMANDS SUMMARY

```bash
# Start full stack
docker-compose up -d

# View logs
docker-compose logs -f

# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test

# Format code
npm run format

# Lint code
npm run lint

# Database migrations
npm run migrate

# Seed database
npm run seed

# Stop all services
docker-compose down

# Remove all data (WARNING)
docker-compose down -v
```

---

## Support

For issues or questions:
- Email: support@mai-saje.com
- GitHub Issues: https://github.com/albanee1201-create/mai-saje-rice-limited/issues
- Documentation: https://mai-saje-docs.com

---

**Last Updated**: May 2024
**Installation Guide Version**: 1.0.0
