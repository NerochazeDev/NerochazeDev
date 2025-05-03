# Deployment Guide for Nerochaze Portfolio Website

This document provides instructions for deploying the Nerochaze Portfolio website to various platforms.

## Table of Contents

- [General Preparation](#general-preparation)
- [Deploying on Replit](#deploying-on-replit)
- [Deploying on Vercel](#deploying-on-vercel)
- [Deploying on Netlify](#deploying-on-netlify)
- [Deploying on AWS](#deploying-on-aws)
- [Environment Variables](#environment-variables)

## General Preparation

Before deploying to any platform, make sure:

1. You have run `npm run build` to generate the production build
2. You have set up all the necessary environment variables
3. Your database is properly configured and accessible from your chosen hosting platform

## Deploying on Replit

Replit deployment is the simplest option as it's already configured in the `.replit` file:

1. Click the "Deploy" button in the Replit interface
2. Replit will automatically run the build command and start the server
3. Your app will be available at `https://[repl-name].[username].replit.app`

## Deploying on Vercel

The project includes a `vercel.json` file for easy deployment on Vercel:

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root directory
3. Follow the prompts to link to your Vercel account
4. Your site will be deployed and available at a Vercel URL

For subsequent deployments:
```bash
vercel --prod
```

## Deploying on Netlify

The project includes a `netlify.toml` configuration file:

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Log in to Netlify: `netlify login`
3. Deploy the site: `netlify deploy`
4. For production: `netlify deploy --prod`

Alternatively, connect your GitHub repository to Netlify for automatic deployments.

## Deploying on AWS

The project includes an AWS SAM template (`template.yaml`) for deploying to AWS:

1. Install the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
2. Configure AWS credentials: `aws configure`
3. Build the application: `sam build`
4. Deploy the application: `sam deploy --guided`

Follow the prompts to configure your deployment. After the first deployment, you can use `sam deploy` for subsequent updates.

### AWS Deployment Architecture

The AWS deployment consists of:
- Lambda function for the backend API
- S3 bucket for static assets
- CloudFront distribution for content delivery
- IAM roles for security

## Environment Variables

The following environment variables need to be configured:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `TELEGRAM_BOT_TOKEN` | Token for Telegram bot integration | Yes |
| `NODE_ENV` | Environment (`development`, `production`) | Yes |

### Setting Environment Variables

**Replit**: Set in the Secrets tab of your Repl

**Vercel**: Set in the project settings under "Environment Variables"

**Netlify**: Set in the site settings under "Build & deploy" > "Environment"

**AWS**: Store in AWS Secrets Manager as specified in the template

## SEO and Indexing

After deployment, don't forget to:

1. Submit your sitemap to Google Search Console and Bing Webmaster Tools
2. Verify your site's metadata appears correctly in the [Rich Results Test](https://search.google.com/test/rich-results)
3. Set up proper domain redirect rules if you're using a custom domain

## Troubleshooting

- **Database Connection Issues**: Check if your database is accessible from your hosting provider
- **Build Failures**: Ensure all dependencies are installed and the build script runs correctly
- **API Errors**: Check server logs for more detailed error messages

For further assistance, refer to the documentation of your chosen hosting platform or contact support.