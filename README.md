# Professional Developer Portfolio

A professional developer portfolio website with advanced project management capabilities, showcasing technical expertise through an interactive and dynamic user experience.

## Features

- 🎨 Modern, responsive design with Tailwind CSS and shadcn/ui components
- 🔄 React frontend with TypeScript for type safety
- 🖥️ Express backend API
- 🗄️ PostgreSQL database for data persistence
- 📱 Telegram Bot integration for real-time notifications
- 📂 Project showcase and management
- 📝 Integrated blog with tagging system
- 📊 Skills and experience showcase
- 📧 Contact form with Telegram notifications

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: Telegram Bot API
- **Build Tools**: Vite, esbuild

## Getting Started

### Prerequisites

- Node.js 16 or higher
- PostgreSQL database

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/developer-portfolio.git
   cd developer-portfolio
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Copy the example environment file:
   ```
   cp .env.example .env
   ```

4. Update the `.env` file with your database connection string and optional Telegram credentials

5. Push the database schema:
   ```
   npm run db:push
   ```

6. Start the development server:
   ```
   npm run dev
   ```

7. Visit http://localhost:5000 in your browser

## Deployment

This project can be deployed to various platforms:

### Docker Deployment

1. Make sure Docker and Docker Compose are installed
2. Build and start the containers:
   ```
   docker-compose up -d
   ```

### Vercel Deployment

This project includes a `vercel.json` configuration file for deploying to Vercel.

### Netlify Deployment

This project includes a `netlify.toml` configuration file for deploying to Netlify.

**For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**

## Project Structure

```
.
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── lib/             # Utility functions and hooks
│   │   ├── pages/           # Page components
│   │   └── main.tsx         # Entry point
├── server/                  # Backend Express application
│   ├── routes.ts            # API routes
│   ├── storage.ts           # Storage interface
│   └── index.ts             # Server entry point
├── shared/                  # Shared code between client and server
│   └── schema.ts            # Database schema and types
└── migrations/              # Database migrations
```

## Database Management

Database schema is defined in `shared/schema.ts` using Drizzle ORM.

To update the database schema:
1. Make changes to `shared/schema.ts`
2. Run `npm run db:push` to push changes to the database

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.