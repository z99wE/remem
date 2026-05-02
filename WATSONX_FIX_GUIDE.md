# WatsonX Configuration Fix Guide
## Beginner-Level Step-by-Step Instructions

### Problem
Your WatsonX project ID is not associated with a Watson Machine Learning (WML) service instance, causing API calls to fail with a 403 error.

---

## Solution: Create a New WatsonX Project with Proper WML Association

### Step 1: Log into IBM Cloud
1. Go to https://cloud.ibm.com
2. Click **Log in** (top right)
3. Enter your IBM Cloud credentials
4. You should see your IBM Cloud dashboard

---

### Step 2: Navigate to WatsonX.ai
1. In the top search bar, type **"watsonx"**
2. Click on **"watsonx.ai"** from the results
3. OR go directly to: https://dataplatform.cloud.ibm.com/wx/home

---

### Step 3: Create a New Project (Properly Configured)

#### Option A: Create from Scratch
1. Click **"Projects"** in the left sidebar
2. Click **"New project"** button (blue button, top right)
3. Select **"Create an empty project"**
4. Fill in the details:
   - **Name**: `Remem-Bob-Project` (or any name you prefer)
   - **Description**: `AI-powered cognitive reconstruction app`
5. **IMPORTANT**: Under **"Associate a service"**:
   - Click **"Associate service"**
   - Select **"Watson Machine Learning"**
   - If you don't see it, click **"New service"** and create one:
     - Service name: `Watson-ML-Remem-Bob`
     - Plan: **Lite** (free tier)
     - Click **"Create"**
6. Click **"Create"** to create the project

#### Option B: Use Existing Project and Add WML
1. Click **"Projects"** in the left sidebar
2. Find your existing project (the one with ID `43c9f9c2-0fe6-4e7f-8257-dd06389dc546`)
3. Click on the project name to open it
4. Click **"Manage"** tab
5. Scroll to **"Associated services"**
6. Click **"Associate service"**
7. Select **"Watson Machine Learning"**
8. If you don't have one, create it (see Option A step 5)
9. Click **"Associate"**

---

### Step 4: Get Your New Project ID

1. Once your project is created/updated, you'll be in the project view
2. Click on the **"Manage"** tab (top of page)
3. Look for **"General"** section
4. Find **"Project ID"** - it looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
5. Click the **copy icon** next to the Project ID
6. **Save this ID** - you'll need it in the next step

---

### Step 5: Update Your .env.local File

1. Open your project in VS Code (you're already here!)
2. Open the `.env.local` file
3. Find the line that says:
   ```
   WATSONX_PROJECT_ID=43c9f9c2-0fe6-4e7f-8257-dd06389dc546
   ```
4. Replace the old ID with your new Project ID:
   ```
   WATSONX_PROJECT_ID=your-new-project-id-here
   ```
5. **Save the file** (Cmd+S on Mac, Ctrl+S on Windows)

---

### Step 6: Verify Your API Key is Still Valid

Your API key might have expired or been regenerated. Let's verify:

1. Go back to IBM Cloud: https://cloud.ibm.com
2. Click on **"Manage"** (top menu) → **"Access (IAM)"**
3. Click **"Service IDs"** in the left sidebar
4. Find your Service ID: `ServiceId-128a50bb-376b-421b-8292-7cac027f6dc1`
5. Click on it
6. Click **"API keys"** tab
7. Check if your API key exists and is active
8. If not, or if you're unsure:
   - Click **"Create"** to create a new API key
   - Name it: `Remem-Bob-API-Key`
   - Click **"Create"**
   - **IMPORTANT**: Copy the API key immediately (you can't see it again!)
   - Update `.env.local` with the new key:
     ```
     WATSONX_API_KEY=your-new-api-key-here
     ```

---

### Step 7: Restart Your Development Server

1. In VS Code, go to the Terminal (bottom panel)
2. Press **Ctrl+C** to stop the current server
3. Wait 2 seconds
4. Run: `npm run dev`
5. Wait for the server to start (you'll see "Ready" message)

---

### Step 8: Test the API

Run this command in a new terminal to test:

```bash
curl -X POST http://localhost:3003/api/reconstruct \
  -H "Content-Type: application/json" \
  -d '{"inputText":"Testing WatsonX API with error: TypeError at line 42"}'
```

**What to look for:**
- ✅ **Success**: You should see a JSON response with analysis
- ✅ **No error messages** in the terminal about "403" or "not associated"
- ❌ **Still failing**: See troubleshooting below

---

## Troubleshooting

### Error: "Invalid API Key"
**Solution**: Your API key might be wrong or expired
1. Go back to Step 6 and create a new API key
2. Update `.env.local` with the new key
3. Restart the server (Step 7)

### Error: "Project not found"
**Solution**: The project ID might be wrong
1. Go back to Step 4 and double-check the Project ID
2. Make sure you copied it correctly (no extra spaces)
3. Update `.env.local`
4. Restart the server

### Error: "Insufficient permissions"
**Solution**: Your Service ID needs proper permissions
1. Go to IBM Cloud → Manage → Access (IAM)
2. Click "Service IDs"
3. Click your Service ID
4. Click "Access policies"
5. Ensure it has "Editor" or "Writer" role for Watson Machine Learning
6. If not, click "Assign access" and add the role

### Still Not Working?
**Create everything fresh:**
1. Create a new Service ID (IBM Cloud → Manage → Access (IAM) → Service IDs → Create)
2. Give it "Editor" role for Watson Machine Learning
3. Create an API key for it
4. Create a new WatsonX project with WML associated
5. Update ALL credentials in `.env.local`:
   - `WATSONX_SERVICE_ID`
   - `WATSONX_API_KEY`
   - `WATSONX_PROJECT_ID`

---

## Quick Reference: What Each Credential Does

```bash
# Your Service ID - identifies your app to IBM Cloud
WATSONX_SERVICE_ID=ServiceId-xxxxx

# Your API Key - password for authentication
WATSONX_API_KEY=xxxxx

# Your Project ID - which WatsonX project to use
WATSONX_PROJECT_ID=xxxxx

# The API endpoint - usually doesn't need to change
WATSONX_URL=https://us-south.ml.cloud.ibm.com

# The AI model to use - Granite 3 8B Instruct
WATSONX_MODEL_ID=ibm/granite-3-8b-instruct
```

---

## Need More Help?

### IBM Cloud Documentation
- WatsonX.ai: https://cloud.ibm.com/docs/watsonx
- Watson Machine Learning: https://cloud.ibm.com/docs/watson-machine-learning

### Common Issues
1. **Free tier limits**: Lite plan has usage limits (100 API calls/month)
2. **Region mismatch**: Ensure your services are in the same region (us-south)
3. **Service instance**: Must have Watson Machine Learning service created

---

## Success Checklist

- [ ] Created/updated WatsonX project
- [ ] Associated Watson Machine Learning service with project
- [ ] Copied new Project ID
- [ ] Updated `.env.local` with new Project ID
- [ ] Verified API key is valid
- [ ] Restarted development server
- [ ] Tested API endpoint
- [ ] No 403 errors in terminal
- [ ] Received AI-generated response

---

**Once you complete these steps, your WatsonX integration should work perfectly!**

If you're still having issues after following this guide, please share:
1. The exact error message from the terminal
2. Which step you're stuck on
3. Screenshots of your IBM Cloud project settings (if possible)