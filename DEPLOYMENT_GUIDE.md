# E-Commerce Web App - Deployment Guide

This guide will walk you through deploying your Node.js + MongoDB E-Commerce Web App for free. We will use **MongoDB Atlas** for the database and **Render** for hosting the application.

---

## Step 1: Push Your Code to GitHub
Render (our web host) pulls your code directly from GitHub.

1. Go to [GitHub](https://github.com/) and log in (or sign up).
2. Click the `+` icon in the top right and select **New repository**.
3. Name your repository (e.g., `ecommerce-live`) and click **Create repository**.
4. In your VS Code terminal (for `d:\E-Commerce-Web-App`), I have already initialized Git for you. Just run these commands to link it to your GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
   git push -u origin main
   ```
   *(Make sure to replace the URL with your actual GitHub repository URL)*

---

## Step 2: Setup MongoDB Atlas (Cloud Database)
Your app currently uses a local database (`mongodb://127.0.0.1...`). We need a cloud database so your live website can access data from anywhere.

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Build a Database:
   - Choose the **M0 Free** cluster.
   - Select cloud provider (AWS/Google Cloud) and region closest to you (e.g., Mumbai).
   - Click **Create Deployment**.
3. Security Settings:
   - **Username & Password**: Create a database user (e.g., Username: `admin`, Password: `mySecurePassword`). **Save this password!**
   - **Network Access**: Choose "Allow Access from Anywhere" (`0.0.0.0/0`) so Render can connect to it.
4. Get your Connection String:
   - Go to your Cluster overview -> Click **Connect**.
   - Choose **Drivers** (Node.js).
   - Copy the connection string. It will look something like this:
     `mongodb+srv://admin:<password>@cluster0.mongodb.net/ecommerceDB?retryWrites=true&w=majority`
   - *Note: Replace `<password>` with the password you created in step 3.*

---

## Step 3: Deploy on Render (Web Hosting)
Now we will put your website on the internet using Render.

1. Go to [Render](https://render.com/) and sign up using your GitHub account.
2. Click on **New +** and select **Web Service**.
3. Select **Build and deploy from a Git repository**.
4. Connect your GitHub account and select the repository you created in Step 1.
5. Fill in the deployment details:
   - **Name**: `aura-mart-live` (or any name you like)
   - **Region**: Singapore (or whichever is closest)
   - **Branch**: `main`
   - **Root Directory**: Leave blank
   - **Environment**: `Node`
   - **Build Command**: `cd Backend && npm install`
   - **Start Command**: `cd Backend && node app.js`
   - **Instance Type**: Select the **Free** tier.
6. **Environment Variables (CRITICAL STEP):**
   Scroll down and click on **Advanced**, then click **Add Environment Variable**. Add the following:
   - Key: `PORT` | Value: `10000`
   - Key: `MONGO_URI` | Value: `[PASTE YOUR MONGODB CONNECTION STRING FROM STEP 2 HERE]`
   - Key: `JWT_SECRET` | Value: `mysecretkey` (or any strong random string)
   - Key: `GOOGLE_MAPS_API_KEY` | Value: `[PASTE YOUR GOOGLE MAPS API KEY HERE]`
7. Click **Create Web Service**.

---

## Step 4: Wait and Verify
- Render will now download your code and start the server. This may take 2-5 minutes.
- Once it says **Live** (with a green dot) in the terminal on Render, click the website URL at the top left of the Render dashboard (e.g., `https://aura-mart-live.onrender.com`).
- Your website is now live! Test creating an account, ordering a product, and checking out.

> **Tip:** Free Render instances go to "sleep" after 15 minutes of inactivity. The first time you open the link after it sleeps, it might take 30-45 seconds to load. This is normal for free hosting!
