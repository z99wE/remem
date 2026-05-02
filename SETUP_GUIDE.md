# ReMem Setup Guide 🚀

Complete setup instructions for the ReMem Cognitive Restoration Engine.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Git** for version control
- **IBM WatsonX.AI Account** with API credentials

---

## 🔧 Installation Steps

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Remem-Bob
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your IBM WatsonX.AI credentials:

```env
WATSONX_API_KEY=your_actual_api_key_here
WATSONX_PROJECT_ID=your_actual_project_id_here
WATSONX_URL=https://us-south.ml.cloud.ibm.com
```

#### Getting IBM WatsonX.AI Credentials

1. Go to [IBM Cloud](https://cloud.ibm.com/)
2. Create or log into your account
3. Navigate to **Watson Machine Learning** service
4. Create a new instance or use existing one
5. Go to **Service Credentials** and create new credentials
6. Copy the **API Key** and **Project ID**
7. Paste them into your `.env.local` file

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

---

## 🎨 Project Structure

```
Remem-Bob/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API routes
│   │   │   └── reconstruct/      # Cognitive reconstruction endpoint
│   │   ├── globals.css           # Global styles & animations
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Main application
│   ├── components/               # React components
│   │   ├── ui/                   # Reusable UI components
│   │   ├── LandingPage.tsx       # Landing page
│   │   ├── InputInterface.tsx    # Input interface
│   │   ├── LoadingState.tsx      # Loading animation
│   │   └── OutputDashboard.tsx   # Results dashboard
│   ├── lib/                      # Utility libraries
│   │   ├── watsonx.ts            # WatsonX.AI client
│   │   ├── prompt-engineering.ts # Prompt templates
│   │   ├── export.ts             # Export functionality
│   │   └── utils.ts              # Helper functions
│   └── types/                    # TypeScript definitions
│       └── index.ts
├── public/                       # Static assets
├── .env.local.example            # Environment template
├── .gitignore                    # Git ignore rules
├── DESIGN_MOCKUPS.md            # Design specifications
├── README.md                     # Project documentation
└── package.json                  # Dependencies
```

---

## 🚀 Usage Guide

### 1. Landing Page

- View the cinematic hero section
- Understand the cognitive interruption problem
- Click **"RESTORE CONTEXT"** to begin

### 2. Input Interface

**Paste Your Cognitive Fragments:**
- Debugging logs
- Terminal outputs
- TODO lists
- AI prompts
- Coding notes
- Error traces
- Unfinished thoughts

**Optional Git Integration:**
- Click "Connect Git Repository"
- Enter repository URL or local path
- Select what to include:
  - ✓ Last 10 commits
  - ✓ Current branch context
  - ✓ Modified files

**Submit:**
- Click **"🧠 RESTORE CONTEXT →"**
- Wait for AI processing (5-10 seconds)

### 3. Output Dashboard

**View Your Analysis:**
- **Cognitive Recovery Score** (0-100)
  - Context Completeness
  - Thread Clarity
  - Actionability

- **Prosecutor Analysis** - What went wrong
- **Defense Reasoning** - Why it made sense
- **Judge Summary** - Verdict and recommendations
- **Next Actions** - Prioritized action items
- **Git Timeline** - Commit history visualization

**Export Options:**
- Click **"Export"** dropdown
- Choose format:
  - JSON (raw data)
  - Markdown (documentation)
  - HTML/PDF (printable report)

**Share:**
- Click **"Share"** to copy shareable link
- Send to team members or save for later

---

## 🧪 Testing

### Test with Sample Data

Use the validation data in `data_for_validation/` directory:

```bash
# Example scenarios:
- ai-agent-memory-leak/
- auth-retry-bug/
- deployment-failure/
- legacy-payment-system/
- monolith-migration-trauma/
```

Each scenario contains:
- `terminal_logs.txt`
- `todos.txt`
- `coding_notes.txt`
- `prompts.txt`
- `modified_files.txt`
- `expected_output.json`

### Manual Testing

1. Copy content from multiple files in a scenario
2. Paste into ReMem input interface
3. Optionally add Git context
4. Submit and verify output matches expectations

---

## 🎨 Customization

### Color Scheme

Edit `src/app/globals.css` to customize colors:

```css
:root {
  --coral: #FF6B6B;
  --gold: #FFE66D;
  --teal: #4ECDC4;
  --emerald: #44A08D;
  --rose: #F38181;
  --cream: #FCE38A;
}
```

### AI Model Configuration

Edit `src/lib/watsonx.ts` to adjust model parameters:

```typescript
parameters: {
  max_new_tokens: 2048,    // Max response length
  temperature: 0.7,        // Creativity (0-1)
  top_p: 0.9,             // Nucleus sampling
  top_k: 50,              // Top-k sampling
}
```

### Prompt Engineering

Modify `src/lib/prompt-engineering.ts` to customize:
- Analysis format
- Output structure
- Scoring criteria
- Severity levels

---

## 🐛 Troubleshooting

### Issue: "WatsonX credentials not configured"

**Solution:**
1. Verify `.env.local` file exists
2. Check API key and Project ID are correct
3. Restart development server after adding credentials

### Issue: API returns errors

**Solution:**
1. Check IBM Cloud service status
2. Verify API key has proper permissions
3. Check network connectivity
4. Review API rate limits

### Issue: Slow AI responses

**Solution:**
1. Reduce input text length
2. Simplify Git context
3. Check IBM Cloud region (use closest)
4. Consider upgrading WatsonX plan

### Issue: Export not working

**Solution:**
1. Check browser permissions for downloads
2. Disable popup blockers
3. Try different export format
4. Check browser console for errors

---

## 📦 Building for Production

### Build the Application

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start Production Server

```bash
npm run start
# or
yarn start
# or
pnpm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Deploy to Other Platforms

The app is a standard Next.js application and can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Google Cloud Run**
- **Docker** (create Dockerfile)

---

## 🔒 Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Rotate API keys regularly** - Every 90 days
3. **Use environment variables** - Never hardcode credentials
4. **Enable rate limiting** - Protect API endpoints
5. **Validate user input** - Already implemented
6. **Use HTTPS in production** - Required for security

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🆘 Support

- **Documentation:** [README.md](./README.md)
- **Design Specs:** [DESIGN_MOCKUPS.md](./DESIGN_MOCKUPS.md)
- **Issues:** Open an issue on GitHub
- **Email:** support@remem.dev (if applicable)

---

## 🎯 Next Steps

After setup, you can:

1. ✅ Test with sample validation data
2. ✅ Customize colors and branding
3. ✅ Add your own prompt templates
4. ✅ Integrate with your Git workflow
5. ✅ Deploy to production
6. ✅ Share with your team

---

**Remember where your mind left off.** 🧠✨

*Made with Bob*