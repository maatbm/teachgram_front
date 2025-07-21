# Teachgram - A Modern Social Media Platform with React and TypeScript

Teachgram is a feature-rich social media application built with React and TypeScript that enables users to share posts, connect with friends, and manage their profiles. The platform provides a seamless user experience with features like infinite scrolling, real-time post updates, and secure authentication.

The application implements a modern architecture using React hooks for state management, TypeScript for type safety, and Tailwind CSS for responsive styling. It features a comprehensive authentication system with both email/password and social login options, a feed system with infinite scrolling, and robust profile management capabilities including post creation, friend management, and profile customization.

## Repository Structure
```
teachgram_front/
├── src/                          # Source code directory
│   ├── components/               # Reusable UI components
│   │   ├── button/              # Button components (Login, Primary, Return buttons)
│   │   ├── feed/                # Feed component for displaying posts
│   │   ├── profile/             # Profile-related components
│   │   └── ...                  # Other UI components
│   ├── contexts/                 # React context definitions
│   │   └── AuthContext.tsx      # Authentication context provider
│   ├── hooks/                   # Custom React hooks
│   │   ├── useSignup.ts        # Signup functionality
│   │   ├── useProfile.ts       # Profile management
│   │   └── ...                 # Other custom hooks
│   ├── pages/                   # Page components
│   │   ├── private/            # Protected routes
│   │   └── public/             # Public routes
│   ├── routes/                  # Routing configuration
│   └── services/                # API services
├── vite.config.ts              # Vite configuration
├── .env                        # Environment variables
└── package.json                # Project dependencies and scripts
```

## Environment Variables
The application uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```
VITE_API_BASE_URL="http://localhost:8080"  # Base URL for API requests
```

You can customize these variables based on your environment (development, staging, production).

## Usage Instructions
### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn
- Modern web browser with JavaScript enabled

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd teachgram_front

# Install dependencies
npm install
# or
yarn install

# Create .env file (see Environment Variables section)

# Start development server
npm run dev
# or
yarn dev
```

### Quick Start
1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:5173`

3. Sign up for a new account:
```typescript
// Example signup form data
const userData = {
  name: "John Doe",
  mail: "john@example.com",
  username: "johndoe",
  password: "securepassword",
  profileLink: "https://example.com/profile.jpg"
};
```

### More Detailed Examples
1. Creating a new post:
```typescript
// Using the CreatePost component
const post = {
  title: "My First Post",
  description: "Hello Teachgram!",
  photoLink: "https://example.com/photo.jpg",
  isPrivate: false
};
```

2. Managing profile:
```typescript
// Using the EditProfile component
const profileUpdate = {
  name: "John Doe Updated",
  description: "New bio",
  profileLink: "https://example.com/new-profile.jpg"
};
```

### Troubleshooting
1. Authentication Issues
   - Error: "Invalid credentials"
   - Solution: Verify your email and password combination
   - Check browser console for detailed error messages

2. Image Upload Issues
   - Error: "Invalid image URL"
   - Solution: Ensure the image URL is accessible and valid
   - Check if the image URL starts with http:// or https://

3. Performance Issues
   - Enable debug mode by setting `localStorage.setItem('debug', 'true')`
   - Check network tab for slow requests
   - Monitor console for performance warnings

4. API Connection Issues
   - Error: "Cannot connect to API"
   - Solution: Verify that the API server is running at the URL specified in your `.env` file
   - Check that `VITE_API_BASE_URL` is correctly set

## Data Flow
Teachgram implements a client-server architecture where the React frontend communicates with a REST API backend.

```ascii
User Input → React Components → Custom Hooks → API Services → Backend
     ↑                                                           |
     |                                                          |
     └───────────── State Updates ←── Response Data ────────────┘
```

Component Interactions:
1. User actions trigger component events
2. Components use custom hooks for business logic
3. Hooks communicate with API services
4. Services make HTTP requests to the backend
5. Responses update application state via contexts
6. State changes trigger component re-renders
7. Protected routes ensure authenticated access
8. Real-time updates maintain data consistency