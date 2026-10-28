# Архитектура монорепозитория book-store

## Обзор проекта

Монорепозиторий `book-store` представляет собой современную систему управления книжным магазином, построенную на микросервисной архитектуре с использованием TypeScript и Node.js. Проект включает в себя веб-приложение для пользователей, административную панель, API-шлюз и несколько микросервисов для управления различными аспектами бизнес-логики.

## Технологический стек

### Основные технологии:
- **Framework**: Next.js 16.1.6 (веб-приложение)
- **Язык программирования**: TypeScript 5.9.2
- **Пакетный менеджер**: pnpm
- **Система сборки**: Nx 23.1.1
- **Runtime**: Node.js
- **Базы данных**: PostgreSQL (через Prisma ORM)
- **Кэширование**: Redis
- **Мессенджер**: RabbitMQ
- **Авторизация**: JWT

### Библиотеки и инструменты:
- React 18.2.0
- Fastify (для микросервисов)
- Zod (валидация данных)
- Zustand (управление состоянием)
- Tailwind CSS + shadcn/ui (UI компоненты)
- Prisma ORM
- i18next (локализация)

## Структура монорепозитория

```
.
├── apps/                     # Приложения
│   ├── api-gateway/          # API шлюз
│   ├── auth-service/         # Сервис аутентификации
│   ├── catalog-service/      # Сервис каталога книг
│   ├── notification-service/ # Сервис уведомлений
│   ├── profile-service/      # Сервис профилей пользователей
│   ├── web-admin/            # Административная панель
│   └── web-store/            # Веб-магазин (Next.js)
├── packages/                 # Общие пакеты
│   ├── access-control/       # Контроль доступа
│   ├── contracts/            # Контракты API
│   ├── errors/               # Общие ошибки
│   ├── fastify/              # Fastify плагины
│   ├── fastify-plugins/      # Плагины для Fastify
│   ├── grpc/                 # gRPC сервисы
│   ├── http/                 # HTTP клиенты
│   ├── localization/         # Локализация
│   ├── rabbitmq/             # RabbitMQ интеграция
│   ├── shared/               # Общие утилиты
│   └── ui/                   # UI компоненты
├── infrastructure/           # Инфраструктурные компоненты
│   ├── docker-compose/       # Docker конфигурации
│   ├── mailpit/              # Mailpit для тестирования email
│   ├── pgadmin/              # PostgreSQL Admin
│   ├── postgres/             # PostgreSQL
│   ├── rabbitmq/             # RabbitMQ
│   ├── redis/                # Redis
│   └── scripts/              # Скрипты
├── tools/                    # Инструменты разработки
└── docs/                     # Документация
```

## Приложения (apps/)

### 1. api-gateway
**Назначение**: Центральный API шлюз для маршрутизации запросов между клиентом и микросервисами.
- **Точка входа**: `src/server.ts`
- **Основные модули**: Fastify сервер, middleware, маршрутизация
- **Внешние зависимости**: Fastify, @org/fastify-plugins, @org/shared
- **Способ запуска**: `nx serve api-gateway` или `pnpm run serve`

### 2. web-store
**Назначение**: Веб-приложение для пользователей магазина (Next.js)
- **Точка входа**: `src/app/` (App Router)
- **Основные модули**: Страницы, компоненты, маршруты, локализация
- **Внешние зависимости**: Next.js, React, @org/ui, @org/http, @org/localization
- **Способ запуска**: `nx dev web-store` или `pnpm run dev`

### 3. auth-service
**Назначение**: Сервис аутентификации и авторизации пользователей
- **Точка входа**: `src/server.ts`
- **Основные модули**: JWT, OAuth, пользовательские данные
- **Внешние зависимости**: Fastify, Prisma, Redis, @org/contracts
- **Способ запуска**: `nx serve auth-service` или `pnpm run serve`

### 4. catalog-service
**Назначение**: Сервис управления каталогом книг и товарами
- **Точка входа**: `src/server.ts`
- **Основные модули**: Каталог, категории, товары, поиск
- **Внешние зависимости**: Fastify, Prisma, @org/contracts, @org/grpc
- **Способ запуска**: `nx serve catalog-service` или `pnpm run serve`

### 5. notification-service
**Назначение**: Сервис отправки уведомлений пользователям
- **Точка входа**: `src/server.ts`
- **Основные модули**: Email, SMS, push уведомления
- **Внешние зависимости**: RabbitMQ, Fastify, @org/contracts
- **Способ запуска**: `nx serve notification-service` или `pnpm run serve`

### 6. profile-service
**Назначение**: Сервис управления профилями пользователей
- **Точка входа**: `src/server.ts`
- **Основные модули**: Профили, настройки, данные пользователя
- **Внешние зависимости**: Fastify, Prisma, @org/contracts
- **Способ запуска**: `nx serve profile-service` или `pnpm run serve`

### 7. web-admin
**Назначение**: Административная панель для управления магазином
- **Точка входа**: `src/main.ts`
- **Основные модули**: Панель управления, настройки, отчеты
- **Внешние зависимости**: React, Vite, @org/ui, @org/http
- **Способ запуска**: `nx serve web-admin` или `pnpm run dev`

## Общие пакеты (packages/)

### 1. access-control
**Назначение**: Модуль контроля доступа и прав пользователей
- **Публичный интерфейс**: Функции проверки прав, middleware
- **Зависимости**: @org/contracts
- **Потребители**: api-gateway, auth-service, catalog-service

### 2. contracts
**Назначение**: Контракты API и типы данных для взаимодействия между сервисами
- **Публичный интерфейс**: Интерфейсы, схемы, DTO
- **Зависимости**: @org/localization, Zod
- **Потребители**: Все микросервисы

### 3. errors
**Назначение**: Общие классы ошибок и обработчики исключений
- **Публичный интерфейс**: Классы ошибок, обработчики
- **Зависимости**: Zod
- **Потребители**: Все микросервисы

### 4. fastify
**Назначение**: Базовые Fastify конфигурации и утилиты
- **Публичный интерфейс**: Конфигурации сервера, middleware
- **Зависимости**: Fastify, pino
- **Потребители**: Все Fastify сервисы

### 5. fastify-plugins
**Назначение**: Плагины для Fastify серверов
- **Публичный интерфейс**: Модули плагинов
- **Зависимости**: Fastify, @org/contracts, @org/errors
- **Потребители**: api-gateway, auth-service, catalog-service

### 6. grpc
**Назначение**: gRPC клиенты и серверные модули
- **Публичный интерфейс**: gRPC сервисы
- **Зависимости**: @org/contracts
- **Потребители**: catalog-service

### 7. http
**Назначение**: HTTP клиенты для взаимодействия между сервисами
- **Публичный интерфейс**: Клиенты запросов
- **Зависимости**: 
- **Потребители**: Все сервисы

### 8. localization
**Назначение**: Модуль локализации и управления языками
- **Публичный интерфейс**: Переводы, детектор языка
- **Зависимости**: i18next
- **Потребители**: web-store, web-admin

### 9. rabbitmq
**Назначение**: Интеграция с RabbitMQ для асинхронного взаимодействия
- **Публичный интерфейс**: Клиенты очередей
- **Зависимости**: amqplib
- **Потребители**: notification-service

### 10. shared
**Назначение**: Общие утилиты и вспомогательные функции
- **Публичный интерфейс**: Утилиты, хелперы
- **Зависимости**: pino, argon2
- **Потребители**: Все сервисы

### 11. ui
**Назначение**: UI компоненты и дизайн-система
- **Публичный интерфейс**: Компоненты, стили, темы
- **Зависимости**: React, Tailwind CSS, shadcn/ui
- **Потребители**: web-store, web-admin

## Инфраструктура (infrastructure/)

### 1. docker-compose/
**Назначение**: Конфигурации Docker Compose для разработки и продакшена
- **Файлы**: docker-compose.dev.yaml, docker-compose.prod.yaml
- **Конфигурация**: PostgreSQL, Redis, RabbitMQ, Mailpit

### 2. postgres/
**Назначение**: Конфигурация PostgreSQL сервера
- **Файлы**: run.sh, Dockerfile

### 3. redis/
**Назначение**: Конфигурация Redis сервера
- **Файлы**: run.sh, Dockerfile

### 4. rabbitmq/
**Назначение**: Конфигурация RabbitMQ сервера
- **Файлы**: run.sh, Dockerfile

### 5. mailpit/
**Назначение**: Mailpit для тестирования email
- **Файлы**: run.sh, Dockerfile

### 6. scripts/
**Назначение**: Скрипты автоматизации
- **Файлы**: generate-docker-pnpm-workspace.mjs

## Граф зависимостей

```
web-store --> @org/ui
web-store --> @org/http
web-store --> @org/localization
web-store --> @org/shared
web-store --> @org/access-control
web-store --> @org/contracts
web-store --> @org/errors

api-gateway --> @org/fastify
api-gateway --> @org/fastify-plugins
api-gateway --> @org/shared
api-gateway --> @org/contracts
api-gateway --> @org/errors

auth-service --> @org/fastify
auth-service --> @org/fastify-plugins
auth-service --> @org/grpc
auth-service --> @org/localization
auth-service --> @org/rabbitmq
auth-service --> @org/shared
auth-service --> @org/contracts
auth-service --> @org/errors
auth-service --> Prisma

catalog-service --> @org/fastify
catalog-service --> @org/fastify-plugins
catalog-service --> @org/grpc
catalog-service --> @org/shared
catalog-service --> @org/contracts
catalog-service --> @org/errors
catalog-service --> Prisma

notification-service --> @org/rabbitmq
notification-service --> @org/fastify
notification-service --> @org/contracts

profile-service --> @org/fastify
profile-service --> @org/shared
profile-service --> @org/contracts
profile-service --> Prisma

web-admin --> @org/ui
web-admin --> @org/http
web-admin --> @org/localization
web-admin --> @org/shared

@org/access-control --> @org/contracts

@org/fastify-plugins --> @org/contracts
@org/fastify-plugins --> @org/errors
@org/fastify-plugins --> Fastify

@org/grpc --> @org/contracts

@org/rabbitmq --> amqplib

@org/http --> 

@org/localization --> 

@org/shared --> argon2
@org/shared --> pino
@org/shared --> zod

@org/ui --> React
@org/ui --> Tailwind CSS
@org/ui --> shadcn/ui
```

## Конфигурация и соглашения

### Основные конфигурационные файлы:
- `package.json` - корневой package.json с общими скриптами и зависимостями
- `nx.json` - конфигурация Nx workspace
- `tsconfig.base.json` - базовая конфигурация TypeScript
- `pnpm-workspace.yaml` - определение рабочих пространств pnpm

### Алиасы импортов:
- `@org/*` - ссылки на внутренние пакеты монорепозитория
- `#lib/*` и `#components/*` - в пакете ui для локальных модулей

### Переменные окружения:
- `.env` файлы в каждом сервисе для конфигурации
- Основные переменные: DATABASE_URL, REDIS_URL, JWT_SECRET, RABBITMQ_URL

## Команды разработки

### Основные команды:
- `nx dev web-store` - запуск веб-магазина в режиме разработки
- `nx serve api-gateway` - запуск API шлюза
- `nx serve auth-service` - запуск сервиса аутентификации
- `nx build web-store` - сборка веб-магазина
- `nx lint` - линтинг кода
- `nx test` - запуск тестов
- `pnpm compose:dev:up` - запуск инфраструктуры в dev режиме

### Скрипты для инфраструктуры:
- `pnpm infra:up` - запуск всех сервисов инфраструктуры
- `pnpm compose:dev:build` - сборка docker образов для разработки
- `pnpm compose:prod:build` - сборка docker образов для продакшена

## Неясности и технический долг

1. **Неполная документация**: В некоторых пакетах отсутствует подробное описание назначения и использования.
2. **Отсутствие project.json файлов**: Некоторые приложения (например, web-store) не имеют project.json файлов, что может затруднить работу с Nx.
3. **Неполные описания сервисов**: В некоторых случаях сложно определить конкретное назначение сервисов без анализа их исходного кода.
4. **Конфигурация Docker**: Некоторые конфигурации Docker могут быть не полностью документированы в текущем состоянии.

