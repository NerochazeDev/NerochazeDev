# Portfolio Website Deployment Guide

This guide provides instructions for deploying your portfolio website to various hosting platforms. The application is a full-stack application with a React frontend, Express backend, and PostgreSQL database.

## Prerequisites

Before deployment, ensure you have:

1. **Node.js and npm**: The project requires Node.js version 16 or higher.
2. **PostgreSQL Database**: You need a PostgreSQL database connection string.
3. **Telegram Bot** (optional): If you want to receive contact form and project interest notifications via Telegram.

## Required Environment Variables

The following environment variables must be set in your deployment environment:

- **DATABASE_URL**: The PostgreSQL connection string for your database.
- **TELEGRAM_BOT_TOKEN** (optional): Your Telegram bot token for notifications.
- **TELEGRAM_CHAT_ID** (optional): Your Telegram chat ID to receive notifications.

## Build Process

The project includes a build script that:
1. Builds the React frontend with Vite 
2. Bundles the Express backend using esbuild
3. Moves all assets to the `/dist` directory

To build the project, run:
```bash
npm run build
```

## Deployment Options

### Option 1: Vercel Deployment

The project includes a `vercel.json` configuration file for easy deployment to Vercel.

1. Install the Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project root directory
3. Follow the prompts to configure your project
4. Add the required environment variables in the Vercel dashboard

### Option 2: Netlify Deployment

The project includes a `netlify.toml` configuration file for deployment to Netlify.

1. Install the Netlify CLI: `npm install -g netlify-cli`
2. Run `netlify deploy` in the project root directory
3. Follow the prompts to configure your project
4. Add the required environment variables in the Netlify dashboard

### Option 3: Traditional VPS or Docker Deployment

For deployment to a traditional VPS or using Docker:

1. Build the project: `npm run build`
2. Start the production server: `npm run start`

The server will listen on the port specified by the `PORT` environment variable, or default to port 5000.

#### Docker Deployment

You can create a `Dockerfile` for containerized deployment:

```Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "dist/index.js"]
```

Build and run the Docker container:
```bash
docker build -t portfolio-website .
docker run -p 5000:5000 --env-file .env portfolio-website
```

## Database Migration

Before deployment, ensure your database schema is up to date:

```bash
npm run db:push
```

This command will push the schema defined in `shared/schema.ts` to your PostgreSQL database.

## Configuring Telegram Notifications (Optional)

To enable Telegram notifications for contact form and project interest submissions:

1. Create a Telegram bot using BotFather
2. Get your bot token and chat ID
3. Set the `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` environment variables in your deployment environment

## Post-Deployment Verification

After deployment, verify:

1. The frontend loads correctly
2. API endpoints respond as expected
3. Database connections work
4. Telegram notifications are sent properly (if configured)

## Troubleshooting

If you encounter issues during deployment:

1. **Database Connection**: Ensure your DATABASE_URL is correctly formatted and the database is accessible from your hosting environment
2. **Build Errors**: Check for any path issues or missing dependencies
3. **Runtime Errors**: Check the server logs for errors
4. **Telegram Issues**: Verify your bot token and chat ID are correct

## Updating the Deployment

When you make changes to your codebase:

1. Push your changes to your repository
2. Trigger a new build in your deployment platform (usually automatic with Git integrations)
3. Verify the changes are live

For manual deployments, repeat the build and deploy steps.