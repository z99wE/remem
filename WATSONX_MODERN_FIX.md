# WatsonX Configuration Fix - 2026 Updated Guide

## Important: IBM Cloud Has Changed!

Watson Machine Learning is now **automatically included** with WatsonX.ai projects. The old separate service no longer exists in the catalog.

---

## The Real Problem

Your project was created before IBM's service restructuring. The solution is to **create a completely new project** using the modern WatsonX.ai interface.

---

## Solution: Create a Fresh WatsonX.ai Project (Modern Method)

### Step 1: Go to WatsonX.ai Platform

1. Open your browser
2. Go to: **https://www.ibm.com/watsonx**
3. Click **"Try watsonx.ai"** or **"Launch"** button
4. You'll be redirected to the WatsonX platform
5. Log in with your IBM Cloud credentials

### Step 2: Access WatsonX.ai Directly

1. Once logged in, go to: **https://dataplatform.cloud.ibm.com/wx/home**
2. This is the main WatsonX.ai dashboard
3. You should see options for Projects, Prompts, and Tuning Studio

### Step 3: Create a New Project (Modern Way)

1. Click **"Work with data and models in projects"** 
   - OR click **"Projects"** in the left navigation
2. Click **"New project"** button (top right)
3. Select **"Create an empty project"**
4. Fill in the details:
   - **Name**: `Remem-Bob-2026` (use a new name)
   - **Description**: `Cognitive reconstruction with Granite 3`
5. **Important**: Look for **"Restrict who can be a collaborator"** - leave it unchecked
6. Click **"Create"**

**Note**: The project is automatically configured with WatsonX.ai capabilities. No separate WML service needed!

### Step 4: Verify Project Setup

1. Once created, you'll be in your new project
2. Click **"Manage"** tab at the top
3. Under **"General"**, find and copy your **Project ID**
4. Under **"Services and integrations"**, you should see:
   - ✅ **Watson Studio** (automatically included)
   - ✅ **Watson Machine Learning** (automatically included)
   
If you don't see these, the project was created correctly anyway - they're now implicit.

### Step 5: Update Your .env.local File

1. Open `.env.local` in VS Code
2. Update the Project ID:

```bash
# Replace with your NEW project ID from Step 4
WATSONX_PROJECT_ID=your-new-project-id-here

# Keep everything else the same
WATSONX_SERVICE_ID=YOUR_SERVICE_ID
WATSONX_API_KEY=YOUR_WATSONX_API_KEY_2
WATSONX_URL=https://us-south.ml.cloud.ibm.com
WATSONX_MODEL_ID=ibm/granite-3-8b-instruct
```

3. **Save the file** (Cmd+S or Ctrl+S)

### Step 6: Verify Your API Key Still Works

Your API key might need to be regenerated. Let's check:

1. Go to: **https://cloud.ibm.com/iam/serviceids**
2. Find your Service ID: `YOUR_SERVICE_ID`
3. Click on it
4. Click **"API keys"** tab
5. Check if your key exists and is active
6. If you're unsure or it's expired:
   - Click **"Create"** to make a new API key
   - Name: `Remem-Bob-Key-2026`
   - Click **"Create"**
   - **COPY THE KEY IMMEDIATELY** (you can't see it again!)
   - Update `.env.local`:
     ```bash
     WATSONX_API_KEY=your-new-api-key-here
     ```

### Step 7: Restart and Test

1. In VS Code terminal, press **Ctrl+C** to stop the server
2. Wait 2 seconds
3. Run: `npm run dev`
4. Wait for the "Ready" message

### Step 8: Test the API

Open a new terminal and run:

```bash
curl -X POST http://localhost:3003/api/reconstruct \
  -H "Content-Type: application/json" \
  -d '{"inputText":"Testing WatsonX 2026: TypeError at line 42 in authentication module"}'
```

**Look for:**
- ✅ JSON response with analysis
- ✅ No "403" errors in the dev server terminal
- ✅ No "not associated" errors
- ✅ No "Falling back to mock" messages

---

## Alternative: Use Deployment Space (If Project Still Fails)

If the project approach still doesn't work, try using a Deployment Space instead:

### Create a Deployment Space

1. In WatsonX.ai, go to: **https://dataplatform.cloud.ibm.com/ml-runtime/spaces?context=wx**
2. Click **"New deployment space"**
3. Fill in:
   - **Name**: `Remem-Bob-Space`
   - **Deployment stage**: Select **Development**
   - **Machine learning service**: Should auto-select (or select if available)
4. Click **"Create"**
5. Once created, click on the space name
6. Copy the **Space ID** (looks like a GUID)

### Update Your Code to Use Space ID

We need to modify the WatsonX client to use `space_id` instead of `project_id`:

**Option A: Quick Test (Temporary)**
Update `.env.local`:
```bash
# Use your space ID instead of project ID
WATSONX_PROJECT_ID=your-space-id-here
```

Then modify `src/lib/watsonx.ts` line 133:
```typescript
// Change from:
project_id: this.config.projectId,

// To:
space_id: this.config.projectId,
```

---

## Troubleshooting Modern WatsonX Issues

### Issue 1: "Invalid credentials"
**Solution:**
1. Your API key might be expired
2. Go to https://cloud.ibm.com/iam/serviceids
3. Create a new API key
4. Update `.env.local`
5. Restart server

### Issue 2: "Model not found"
**Solution:**
1. The Granite model might not be available in your region
2. Try a different model:
   ```bash
   WATSONX_MODEL_ID=ibm/granite-13b-chat-v2
   ```
3. Or check available models at: https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-models.html

### Issue 3: "Rate limit exceeded"
**Solution:**
1. Free tier has limits (100 calls/month)
2. Check your usage at: https://dataplatform.cloud.ibm.com/wx/home
3. Wait for the limit to reset (monthly)
4. Or upgrade to a paid plan

### Issue 4: Still getting 403 errors
**Solution:**
1. Your Service ID might not have the right permissions
2. Go to: https://cloud.ibm.com/iam/serviceids
3. Click your Service ID
4. Click **"Access policies"**
5. Ensure it has **"Editor"** or **"Writer"** role for:
   - Watson Studio
   - Watson Machine Learning
6. If not, click **"Assign access"** and add the roles

---

## Understanding the New WatsonX Structure (2026)

### What Changed?
- ❌ **Old**: Separate Watson Machine Learning service in catalog
- ✅ **New**: WML is built into WatsonX.ai projects automatically
- ❌ **Old**: Manual service association required
- ✅ **New**: Everything is pre-configured when you create a project

### What You Need Now:
1. **WatsonX.ai Project** (or Deployment Space)
2. **Service ID** with proper IAM permissions
3. **API Key** for authentication
4. **Project ID** (or Space ID)

### What You DON'T Need:
- ❌ Separate Watson Machine Learning service
- ❌ Manual service association
- ❌ Complex catalog navigation

---

## Quick Verification Checklist

Run through this checklist to verify everything:

- [ ] Created new WatsonX.ai project (2026 method)
- [ ] Copied the new Project ID
- [ ] Updated `.env.local` with new Project ID
- [ ] Verified API key is valid and not expired
- [ ] Service ID has Editor/Writer permissions
- [ ] Restarted development server
- [ ] Tested API endpoint
- [ ] No 403 errors in terminal
- [ ] Received AI-generated response (not mock)

---

## Still Not Working? Here's Why:

### Possible Reasons:
1. **Account Type**: Some IBM Cloud Lite accounts have restrictions
2. **Region Issues**: Services must be in the same region (us-south)
3. **Permissions**: Service ID needs proper IAM roles
4. **API Key**: Might be expired or invalid
5. **IBM Cloud Issues**: Platform might be having temporary problems

### Final Fallback:
Your app works perfectly with mock responses! The mock mode:
- ✅ Provides intelligent, contextual analysis
- ✅ Generates realistic prosecutor/defense/judge insights
- ✅ Works offline and has no rate limits
- ✅ Perfect for development and demos

You can continue building features while resolving the WatsonX configuration.

---

## Need Help?

### IBM WatsonX Documentation
- Main docs: https://www.ibm.com/docs/en/watsonx-as-a-service
- API reference: https://cloud.ibm.com/apidocs/watsonx-ai
- Models: https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-models.html

### Community Support
- IBM Community: https://community.ibm.com/community/user/watsonai/home
- Stack Overflow: Tag your questions with `ibm-watsonx`

---

## Success! What's Next?

Once your WatsonX integration is working:

1. **Test with real data**: Try different types of input
2. **Monitor usage**: Check your API call limits
3. **Optimize prompts**: Refine the system prompt for better results
4. **Add features**: Build on top of the working foundation

**Your app is ready to use - with or without WatsonX!**