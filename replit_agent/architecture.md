# Architecture Overview

## 1. Overview

The application is a full-stack developer portfolio website built with React, Node.js, and PostgreSQL. It showcases projects, skills, blog posts, and provides contact functionality with Telegram notifications. The architecture follows a modern client-server pattern with a well-defined API layer and a database-driven approach.

The system is designed to be deployed to various platforms including Replit, Vercel, Netlify, or AWS, with Docker support for containerized deployments.

## 2. System Architecture

### 2.1 High-Level Architecture

The application follows a standard full-stack architecture with the following components:

- **Frontend**: React-based single-page application (SPA)
- **Backend**: Node.js Express server
- **Database**: PostgreSQL with Drizzle ORM
- **API Layer**: RESTful API endpoints
- **External Integrations**: Telegram Bot API

```
                 ┌───────────────┐
                 │   Client SPA  │
                 │    (React)    │
                 └───────┬───────┘
                         │
                         │ HTTP Requests
                         ▼
┌────────────────────────────────────────┐
│             Express Server             │
├────────────────────────────────────────┤
│                                        │
│  ┌──────────────┐    ┌──────────────┐  │
│  │   API Routes │    │ Telegram Bot │  │
│  └───────┬──────┘    └──────────────┘  │
│          │                             │
│          ▼                             │
│  ┌──────────────┐                      │
│  │  Storage     │                      │
│  │  Interface   │                      │
│  └───────┬──────┘                      │
│          │                             │
│          ▼                             │
│  ┌──────────────┐                      │
│  │ Drizzle ORM  │                      │
│  └───────┬──────┘                      │
└──────────┼──────────────────────────────┘
           │
           ▼
    ┌─────────────┐
    │ PostgreSQL  │
    └─────────────┘
```

### 2.2 Directory Structure

The repository follows a monorepo approach with client and server code in a single repository:

- `/client`: Frontend React application
- `/server`: Backend Express server
- `/shared`: Shared code between client and server (schemas, types)
- `/migrations`: Database migration files
- `/netlify`: Netlify-specific functions

## 3. Key Components

### 3.1 Frontend Architecture

The frontend is built with React and structured around the following components:

#### 3.1.1 Core Technologies
- **React**: Main UI library
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling
- **Shadcn UI**: Component library based on Radix UI
- **Wouter**: Lightweight router
- **React Query**: For data fetching and state management
- **Framer Motion**: For animations
- **Zod**: For schema validation
- **React Hook Form**: For form handling

#### 3.1.2 Structure
- **Pages**: Route-based components (`home`, `blog`, `admin`, etc.)
- **Components**: Reusable UI components
- **Contexts**: Global state management (theme context)
- **Hooks**: Custom React hooks
- **Lib**: Utility functions and configurations

### 3.2 Backend Architecture

The backend is built with Node.js and Express, using a modular architecture:

#### 3.2.1 Core Technologies
- **Node.js**: Runtime environment
- **Express**: Web server framework
- **TypeScript**: For type safety
- **Drizzle ORM**: For database access
- **Zod**: For schema validation
- **Telegram Bot API**: For notifications

#### 3.2.2 Structure
- **Routes**: API endpoint definitions
- **Storage**: Database interface and implementations
- **Database**: Connection and schema definitions
- **Telegram Integration**: Notification system
- **Sitemap Generation**: For SEO optimization

### 3.3 Database Design

The application uses PostgreSQL with Drizzle ORM. The main database schema includes:

- **Users**: Authentication data
- **Projects**: Portfolio projects information
- **Blog Posts**: Blog content
- **Contact Messages**: Visitor messages
- **Website Info**: Editable website content
- **Skills**: Developer skills and expertise
- **Social Links**: Links to social profiles

### 3.4 API Structure

The API follows RESTful principles with these main endpoints:

- `/api/projects`: CRUD for projects
- `/api/blog`: Blog post management
- `/api/contact`: Contact form submission
- `/api/website-info`: Website content management
- `/api/skills`: Skills management
- `/api/social-links`: Social links management

## 4. Data Flow

### 4.1 Client-Server Communication

1. The React frontend makes HTTP requests to the Express backend
2. The backend processes requests through middleware
3. Routes handle specific endpoints and invoke business logic
4. The storage interface provides a consistent API for database operations
5. Database operations are executed through Drizzle ORM
6. The server returns JSON responses to the client
7. React Query manages client-side caching and state

### 4.2 Form Submission Flow

For contact submissions:

1. User fills out a form on the frontend
2. React Hook Form with Zod validates the input
3. The validated data is sent to the `/api/contact` endpoint
4. The server validates the data again using Zod schemas
5. The message is stored in the database
6. A notification is sent to the administrator via Telegram
7. A success response is returned to the client

## 5. External Dependencies

### 5.1 Third-Party Services

- **Telegram Bot API**: Used for notifications when contact forms are submitted
- **Neon Database**: Serverless Postgres provider for database (referenced in `db.ts`)

### 5.2 Key Libraries

#### Frontend
- Radix UI components (accordion, alert, avatar, etc.)
- React Hook Form + Zod
- React Query
- Framer Motion
- Tailwind CSS
- Wouter (for routing)

#### Backend
- Express
- Drizzle ORM
- Node-Telegram-Bot-API
- Neon Serverless

## 6. Deployment Strategy

The application supports multiple deployment options:

### 6.1 Containerized Deployment

- **Docker**: Dockerfile and docker-compose.yml for containerization
- **Docker Compose**: Multi-container setup with web and PostgreSQL services

### 6.2 Platform-Specific Deployments

- **Replit**: Configuration in `.replit` file
- **Vercel**: Configuration in `vercel.json`
- **Netlify**: Configuration in `netlify.toml` with serverless functions
- **AWS Serverless**: CloudFormation/SAM template in `template.yaml`
- **Heroku**: Configuration in `Procfile` and `heroku.yml`
- **Railway**: Configuration in `railway.toml`

### 6.3 CI/CD Considerations

The repository includes configuration files for various deployment platforms, suggesting a multi-environment deployment strategy:
- Development environment on Replit
- Production environments on cloud platforms

## 7. Security Considerations

- Environment variables for sensitive information
- Database credentials management
- Content security for user-generated content (blog posts)
- API endpoint validation

## 8. Scalability Aspects

- Stateless server design allows horizontal scaling
- Database-driven content enables separation of concerns
- Serverless deployment options for automatic scaling

## 9. Future Architecture Considerations

- Enhanced authentication and authorization
- Content delivery network (CDN) integration
- Server-side rendering (SSR) implementation
- More sophisticated caching strategies
- Analytics integration