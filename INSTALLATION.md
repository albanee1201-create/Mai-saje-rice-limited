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

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## 3. DOCKER COMPOSE DEPLOYMENT

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
```

---

## 4. ACCESS YOUR APPLICATION

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/health

---

## Support

For issues:
- Email: support@mai-saje.com
- GitHub: https://github.com/albanee1201-create/mai-saje-rice-limited
