# Task 2 — Security & PDPA Compliance (OWASP + Privacy-by-Design) (20 points)

**Student:** Mr. Athichon Kaewla
**Student ID:** 66315030406
**Course:** 1305308 Platform Development
**Project:** Recipe Sharing Platform with Ratings

---

## 1. Three OWASP Top 10 Items Relevant to This Project

### OWASP #1: A01:2021 – Broken Access Control

#### Why This is a Risk for Our Platform

Broken Access Control occurs when users can act outside of their intended permissions. In our Recipe Sharing Platform, several scenarios could expose this vulnerability:

- **Unauthorized Recipe Modification:** A malicious user could attempt to modify or delete recipes created by other users by directly calling API endpoints with different recipe IDs
- **Rating Manipulation:** Users could try to rate the same recipe multiple times by manipulating API requests
- **Admin Function Access:** Regular users might attempt to access admin-only functions if not properly protected
- **Profile Data Exposure:** Users could access other users' private data (email, password hash) through API manipulation

**Real-World Impact:**
- User A creates a popular recipe
- User B modifies the recipe ID in an API request and deletes User A's recipe
- Platform loses trust and valuable content

#### Mitigation Method

**Implementation in Our Platform:**

```javascript
// middleware/auth.js
export const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await getUserById(decoded.userId);
  next();
};

// controllers/recipeController.js
export const updateRecipe = async (req, res) => {
  const recipe = await getRecipeById(req.params.id);

  // Check ownership before allowing update
  if (recipe.user_id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' });
  }

  // Proceed with update
};
```

**Protection Measures:**
1. **JWT Authentication:** Require valid tokens for protected endpoints
2. **Ownership Verification:** Check user ownership before edit/delete operations
3. **Role-Based Access Control (RBAC):** Implement user and admin roles
4. **Database Constraints:** Unique constraint on (recipe_id, user_id) in ratings table prevents duplicate ratings

---

### OWASP #2: A02:2021 – Cryptographic Failures

#### Why This is a Risk for Our Platform

Cryptographic Failures (previously known as Sensitive Data Exposure) occur when sensitive data is not properly protected. In our platform, we handle:

- **User Passwords:** The most critical sensitive data
- **JWT Tokens:** Authentication credentials
- **Email Addresses:** Personal identifiable information (PII)
- **User Comments:** May contain personal information

**Real-World Impact:**
- Database breach exposes plain-text passwords
- Attacker gains access to all user accounts
- Users who reuse passwords across sites are compromised on multiple platforms
- Legal liability under PDPA for data breach

**What Could Go Wrong:**
- Storing passwords in plain text or using weak hashing (MD5, SHA1)
- Transmitting sensitive data over HTTP instead of HTTPS
- Exposing JWT secrets in client-side code
- Not setting secure flags on cookies

#### Mitigation Method

**Implementation in Our Platform:**

```javascript
// Password Hashing with bcrypt
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { password } = req.body;

  // Generate salt and hash password
  const salt = await bcrypt.genSalt(10); // 10 rounds
  const password_hash = await bcrypt.hash(password, salt);

  // Store only the hash, never plain password
  await createUser({ ...userData, password_hash });
};

// Password Verification
export const login = async (req, res) => {
  const user = await getUserByEmail(req.body.email);

  // Compare plain password with hash
  const isValid = await bcrypt.compare(req.body.password, user.password_hash);

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
};

// JWT Token Generation
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d' // Token expires after 7 days
  });
};
```

**Protection Measures:**
1. **bcrypt Password Hashing:** Use industry-standard bcrypt with appropriate salt rounds (10+)
2. **JWT with Expiration:** Tokens automatically expire after 7 days
3. **Environment Variables:** Store JWT_SECRET in .env file, never in code
4. **HTTPS Enforcement:** Use HTTPS in production to encrypt data in transit
5. **Exclude Sensitive Fields:** Never return password_hash in API responses
6. **Token Storage:** Store tokens securely (httpOnly cookies or secure localStorage)

---

### OWASP #3: A03:2021 – Injection (SQL Injection)

#### Why This is a Risk for Our Platform

SQL Injection occurs when untrusted data is sent to an interpreter as part of a command or query. In our Recipe Sharing Platform, user inputs include:

- **Search Queries:** Users search for recipes by keywords
- **Recipe Content:** Title, ingredients, instructions contain user text
- **Email/Name:** User registration data
- **Comments:** Rating comments with free text

**Real-World Attack Example:**

```javascript
// VULNERABLE CODE (Don't do this!)
const searchQuery = req.query.search;
const sql = `SELECT * FROM recipes WHERE title LIKE '%${searchQuery}%'`;
// If searchQuery = "' OR '1'='1", this returns all recipes

// If searchQuery = "'; DROP TABLE recipes; --"
// This could delete the entire recipes table!
```

**Real-World Impact:**
- Attacker gains access to all database records
- Sensitive data (emails, password hashes) exposed
- Data can be modified or deleted
- Complete system compromise

#### Mitigation Method

**Implementation in Our Platform:**

```javascript
// config/database.js - Parameterized Queries
export const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// controllers/recipeController.js - Safe Implementation
export const getAllRecipes = async (req, res) => {
  const { search = '' } = req.query;

  // Use parameterized query with ? placeholders
  let sql = `
    SELECT * FROM recipes r
    WHERE 1=1
  `;

  const params = [];

  if (search) {
    sql += ' AND (r.title LIKE ? OR r.ingredients LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  // Parameters are properly escaped by the database driver
  const recipes = await query(sql, params);
  res.json(recipes);
};

// Input Validation with express-validator
import { body } from 'express-validator';

export const validateRecipe = [
  body('title')
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 200 })
    .escape(), // Escapes HTML characters

  body('ingredients')
    .trim()
    .notEmpty()
    .isLength({ min: 10 }),

  // Validation middleware checks for errors
];
```

**Protection Measures:**
1. **Parameterized Queries:** Always use ? placeholders, never string concatenation
2. **Input Validation:** Use express-validator to sanitize all user inputs
3. **ORM/Query Builder:** SQLite3 library automatically escapes parameters
4. **Least Privilege:** Database user has only necessary permissions (not admin)
5. **Input Sanitization:** Trim, escape HTML, and validate data types
6. **Error Handling:** Don't expose raw SQL errors to users

---

## 2. PDPA Data Flow

### Personal Data Collected

According to Thailand's Personal Data Protection Act (PDPA), we collect and process the following personal data:

| Data Type | Purpose | Legal Basis | Retention Period |
|-----------|---------|-------------|------------------|
| Name | User identification, recipe attribution | Consent | Account lifetime |
| Email Address | Authentication, communication | Consent | Account lifetime |
| Password (hashed) | Authentication | Consent | Account lifetime |
| IP Address (logs) | Security, abuse prevention | Legitimate Interest | 90 days |
| Recipe Content | Service provision | Consent | Until user deletion |
| Rating Comments | Service provision | Consent | Until user deletion |

---

### PDPA Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA COLLECTION                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User Registration Form                                     │
│  ├─ Name (required)                                        │
│  ├─ Email (required)                                       │
│  └─ Password (required)                                    │
│                                                             │
│  User Consent:                                             │
│  ☑ I agree to Terms of Service and Privacy Policy         │
│                                                             │
│  Purpose: Authentication and service provision             │
│  Legal Basis: Explicit consent (PDPA Section 19)          │
│                                                             │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA PROCESSING                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Backend Server (Node.js + Express)                        │
│  ├─ Input Validation (express-validator)                  │
│  ├─ Email normalization                                    │
│  ├─ Password hashing (bcrypt, salt rounds: 10)           │
│  ├─ JWT token generation                                   │
│  └─ Access control checks                                  │
│                                                             │
│  Processing Principles:                                    │
│  ✓ Purpose Limitation: Only for stated purposes           │
│  ✓ Data Minimization: Only essential data collected       │
│  ✓ Accuracy: User can update their own data              │
│  ✓ Storage Limitation: Deleted on account deletion       │
│                                                             │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA STORAGE                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SQLite Database (Local File Storage)                      │
│  ├─ users table                                           │
│  │  ├─ id, name, email                                    │
│  │  ├─ password_hash (NOT plain password)               │
│  │  ├─ role, created_at                                  │
│  │  └─ Encrypted fields for sensitive data              │
│  ├─ recipes table                                         │
│  │  └─ user_id (foreign key), title, content            │
│  └─ ratings table                                         │
│     └─ user_id, recipe_id, rating, comment               │
│                                                             │
│  Security Measures:                                        │
│  ✓ Database file permissions (read/write restricted)     │
│  ✓ No plain-text passwords stored                        │
│  ✓ Foreign key constraints for data integrity            │
│  ✓ Regular backups (encrypted)                           │
│  ✓ Access logs for auditing                              │
│                                                             │
│  Location: Server in Thailand (PDPA compliant)            │
│  Access: Only authorized backend processes                │
│                                                             │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA SHARING                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Internal Sharing (Within Platform):                       │
│  ├─ Public: Recipe titles, ingredients, instructions      │
│  ├─ Public: User's display name (not email)              │
│  ├─ Public: Ratings and comments                          │
│  └─ Private: Email, password hash (never exposed)        │
│                                                             │
│  External Sharing:                                         │
│  ├─ NONE - No third-party sharing                        │
│  ├─ No analytics services                                 │
│  ├─ No advertising networks                               │
│  └─ No data sales                                         │
│                                                             │
│  PDPA Rights Honored:                                      │
│  ✓ Right to Access: Users can view their data            │
│  ✓ Right to Rectification: Users can edit profile        │
│  ✓ Right to Erasure: Account deletion removes all data   │
│  ✓ Right to Data Portability: Export functionality       │
│  ✓ Right to Object: Opt-out options provided            │
│  ✓ Right to Withdraw Consent: Delete account anytime    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Data Flow Summary (Bullet Points)

#### **Data Collection**
- Name, email, and password collected during registration
- Recipe content (title, ingredients, instructions, optional image URL) collected when creating recipes
- Rating data (1-5 stars, optional comment) collected when rating recipes
- IP addresses logged automatically for security purposes
- User consent obtained through Terms of Service acceptance
- Privacy Policy clearly explains data usage

#### **Data Processing**
- Passwords immediately hashed with bcrypt (10 salt rounds) before storage
- Email addresses normalized to lowercase for consistency
- Input validation performed on all fields (length, format, type)
- JWT tokens generated for authentication (7-day expiration)
- Access control checks performed on every protected endpoint
- User ownership verified before any data modification

#### **Data Storage**
- All data stored in SQLite database on server
- Password hashes stored (never plain-text passwords)
- Database file has restricted read/write permissions (OS-level)
- Foreign key constraints ensure data integrity
- Unique constraints prevent duplicate entries (e.g., email, recipe-user ratings)
- Server located in Thailand for PDPA compliance
- Regular encrypted backups performed
- Access logs maintained for audit trail (90-day retention)

#### **Data Sharing**
- **Public Data:** Recipe content, user display names, ratings/comments visible to all users
- **Private Data:** Email addresses and password hashes NEVER exposed in API responses
- **No Third-Party Sharing:** Zero data shared with external services, analytics, or advertisers
- **Internal Use Only:** Personal data used solely for platform functionality
- **User Control:** Users decide what recipes to publish (all recipes are public by default)

---

## 3. Security Checklist (5 Items)

### ✅ 1. Input Validation on All Forms

**Implementation:**
- Use `express-validator` middleware on all API endpoints
- Validate data types, lengths, and formats
- Sanitize inputs to remove HTML/JavaScript
- Reject requests with validation errors

**Code Example:**
```javascript
export const validateRecipe = [
  body('title').trim().notEmpty().isLength({ min: 3, max: 200 }),
  body('ingredients').trim().notEmpty().isLength({ min: 10 }),
  body('instructions').trim().notEmpty().isLength({ min: 20 }),
  body('image_url').optional().isURL(),
  validate // Middleware that checks for errors
];
```

**Protection Against:**
- SQL Injection
- Cross-Site Scripting (XSS)
- Buffer overflow attacks
- Data integrity issues

---

### ✅ 2. Password Hashing (bcrypt)

**Implementation:**
- Use bcryptjs library with 10+ salt rounds
- Never store plain-text passwords
- Hash passwords before database insertion
- Use secure comparison (bcrypt.compare) for login

**Code Example:**
```javascript
// Registration
const salt = await bcrypt.genSalt(10);
const password_hash = await bcrypt.hash(password, salt);

// Login verification
const isValid = await bcrypt.compare(inputPassword, user.password_hash);
```

**Protection Against:**
- Password database breaches
- Rainbow table attacks
- Brute force attacks (slow hashing)
- Dictionary attacks

---

### ✅ 3. Rate Limiting on API Endpoints

**Implementation:**
- Limit number of requests per IP address
- Implement exponential backoff for failed login attempts
- Prevent spam recipe/rating creation

**Recommended Configuration:**
```javascript
import rateLimit from 'express-rate-limit';

// General API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests, please try again later'
});

// Strict rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts per window
  message: 'Too many login attempts, please try again later'
});

app.use('/api/', apiLimiter);
app.use('/api/auth/', authLimiter);
```

**Protection Against:**
- Brute force attacks
- DDoS attacks
- Spam content creation
- API abuse

---

### ✅ 4. HTTPS Encryption (Production)

**Implementation:**
- Use Let's Encrypt for free SSL certificates
- Enforce HTTPS redirect from HTTP
- Set secure headers (HSTS, CSP)
- Use secure cookies with httpOnly and secure flags

**Configuration:**
```javascript
// In production
if (process.env.NODE_ENV === 'production') {
  // Enforce HTTPS
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });

  // Security headers
  app.use(helmet({
    hsts: { maxAge: 31536000, includeSubDomains: true },
    contentSecurityPolicy: { directives: { defaultSrc: ["'self'"] } }
  }));
}
```

**Protection Against:**
- Man-in-the-middle attacks
- Packet sniffing
- Session hijacking
- Cookie theft

---

### ✅ 5. Access Logs for Audit Trail

**Implementation:**
- Log all API requests with timestamp
- Record user actions (create, update, delete)
- Monitor failed authentication attempts
- Store logs securely for PDPA compliance

**Code Example:**
```javascript
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

// Create write stream for access logs
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);

// Log format: timestamp, IP, method, URL, status, user
morgan.token('user', (req) => req.user?.email || 'anonymous');

app.use(morgan(
  ':date[iso] :remote-addr :method :url :status :user',
  { stream: accessLogStream }
));

// Custom audit logging for sensitive operations
export const auditLog = (action, userId, details) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    action,
    userId,
    details
  };
  fs.appendFileSync('logs/audit.log', JSON.stringify(logEntry) + '\n');
};

// Usage
await deleteRecipe(recipeId);
auditLog('DELETE_RECIPE', req.user.id, { recipeId });
```

**Benefits:**
- PDPA compliance (data processing records)
- Security incident investigation
- User activity monitoring
- Compliance audits
- Identify unusual patterns

**Log Retention:**
- Access logs: 90 days
- Audit logs: 1 year
- Security logs: 2 years

---

## Summary

This Recipe Sharing Platform implements comprehensive security measures aligned with OWASP Top 10 guidelines and full PDPA compliance. The three critical vulnerabilities addressed are Broken Access Control, Cryptographic Failures, and SQL Injection, each with robust mitigation strategies. The platform's data flow respects user privacy through transparent collection, secure processing, encrypted storage, and zero third-party sharing. The security checklist ensures defense-in-depth with multiple layers of protection from input validation to audit logging.

---

**Document Version:** 1.0
**Date:** November 24, 2025
**Status:** Final
**PDPA Compliance:** Full
**OWASP Coverage:** A01, A02, A03 (2021)
