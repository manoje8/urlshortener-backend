# SHORTIFY (URL Shortener)


Shortify is a robust URL shortening service that empowers users to create memorable, trackable short URLs from lengthy links. It prioritizes user security with a secure password reset flow, email verification, and encrypted password storage using industry-standard hashing algorithms.

### API Endpoints

SHORTIFY offers a comprehensive suite of API endpoints for user management, URL creation, and analytics:

**User Management**

1. **Create User:** `(POST /auth/register)` - Creates a new user account.
2. **User Login:** `(POST /auth/login)` - Authenticates a user with email and password. 
3. **Forgot Password:** `(POST /auth/forgot-password)` - Initiates password reset by sending an OTP (One-Time Password) to the user's registered email.
4. **Reset Password:** `(POST /auth/reset-password)` - Validates the OTP and email, then updates the user's password in the database using a secure hashing algorithm.

**URL Shortening & Management**

1. **Create ShortURL**: `(POST /short-url/create)` - Creates a short URL for a provided long URL and stores it in the database.
2. **ShortId**: `(GET /short-url/:shortId)` -Redirects users to the original long URL associated with a specific shortId.
3. **Dashboard**: `(GET /short-url/dashboard)` - Retrieves URLs created by the user, ordered by creation time in ascending order.
4. **All URL's**: `(GET /short-url/urls)` - Retrieves all URLs that have been created by an user.
5. **URL Hit Count**: `(GET /short-url/hit-count)` - Retrieves the number of times each shortened URL has been used.

### Deployment

Access the live SHORTIFY website at: [Shortify (Server)]()

### Installation and Setup

**Prerequisites:**

- Node.js
- npm (Node Package Manager)

**Instructions:**

1. Clone the repository:

```
git clone https://github.com/manoje8/repo-name.git
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev  (OR)
npm start
```

The server will start on port `3000` by default. You can access the application routes in your browser.

### Technologies Used

- Node.js: JavaScript runtime environment for server-side applications.
- Express.js: Web application framework for Node.js.
- Mongoose: Object Data Modeling (ODM) library for MongoDB.
- bcrypt: Secure password hashing library.
- cors: Enables Cross-Origin Resource Sharing (CORS) for API requests.
- dotenv: Loads environment variables from a `.env` file.
- jsonwebtoken: JSON Web Token library for secure authentication.
- nanoid - Generates random, unique strings for short URLs.
- nodemailer: Library for sending email messages.
- nodemon: Development utility that restarts the server automatically on code changes.
- morgan: HTTP request logger middleware for debugging purposes.