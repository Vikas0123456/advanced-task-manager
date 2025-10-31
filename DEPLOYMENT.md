# Vercel Deployment Guide

## Option 1: Deploy via Vercel Website (Recommended)

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"Add New Project"** or **"New Project"**
4. Import your repository: `Vikas0123456/advanced-task-manager`
5. Vercel will auto-detect Vite. Verify these settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. Click **"Deploy"**
7. Wait for deployment to complete (usually 1-2 minutes)
8. Your app will be live at a URL like: `https://advanced-task-manager-xxxxx.vercel.app`

## Option 2: Deploy via Vercel CLI

1. Run in terminal:
   ```bash
   npx vercel
   ```

2. Follow the prompts:
   - Login to Vercel (will open browser)
   - Link to existing project or create new
   - Confirm settings

3. To deploy to production:
   ```bash
   npx vercel --prod
   ```

## Automatic Deployments

Once connected to Vercel:
- Every push to `main` branch will automatically deploy
- Pull requests get preview deployments
- All deployments are tracked in Vercel dashboard

## Environment Variables

If you need to add environment variables later:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add any required variables

