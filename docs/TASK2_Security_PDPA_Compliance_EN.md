# Task 2 — Security & PDPA Compliance (OWASP + Privacy-by-Design)

**Student:** นายอธิชนม์ แก้วหล้า  
**Student ID:** 66315030406  
**Course:** 1305308 Platform Development  
**Project:** Recipe Sharing Platform with Ratings

---

## 1. Three OWASP Top 10 Items Relevant to Your Project

### 1. Broken Access Control — Insufficient Permission Control

**Why it's a risk:**

1. Users can edit or delete recipes created by others by directly modifying localStorage through browser DevTools.
2. Users may attempt to rate the same recipe multiple times by manipulating data in localStorage.
3. Regular users may access other users' personal data (email, user data) by reading localStorage.
4. Users may modify localStorage to add mock tokens or change user IDs to bypass authentication checks.

**Mitigation method:**

- Verify ownership (user_id) before allowing any edit/delete operations by comparing the recipe's user_id with currentUser.id from localStorage, and check if currentUser.role === 'admin' for admin privileges. Throw an error if unauthorized.

---

### 2. Cryptographic Failures — Sensitive Data Exposure

**Why it's a risk:**

1. Personal data (PII) such as names and emails are stored in localStorage in plain text without encryption.
2. Users can directly access data in localStorage through browser DevTools.
3. All user data is stored without protection, risking unauthorized access.
4. Legal liability under PDPA for personal data breaches.

**Mitigation method:**

- Do not store passwords in localStorage (mock authentication mode). Store only necessary user data (name, email, role) and separate data by user_id. For production, use backend API with encrypted database storage and HTTPS for all data transmission.

---

### 3. Injection — Cross-Site Scripting (XSS)

**Why it's a risk:**

1. Attackers can steal data from localStorage (user data, tokens) through XSS attacks by injecting malicious scripts.
2. Attackers can steal session or authentication state by stealing mock tokens.
3. Attackers can display harmful content to users.
4. Complete system compromise through stolen authentication and user data.

**Mitigation method:**

- Use React's built-in XSS protection (auto-escapes content by default). Sanitize all user input before saving to localStorage by removing HTML tags and escaping special characters. Never use dangerouslySetInnerHTML. Validate and sanitize image URLs before displaying.

---

## 2. PDPA Data Flow (Bullet-point Summary)

### 1. Data Collection

- Name, email, and password during registration
- Recipe content (title, ingredients, instructions, image URL) when creating recipes
- Rating data (1-5 stars, optional comments) when rating recipes
- User consent through acceptance of terms of service

### 2. Processing

- Do not store passwords (mock authentication mode)
- Standardize email addresses to lowercase for consistency
- Validate all input fields
- Create mock tokens for authentication
- Perform access control checks through Protected Routes
- Sanitize data before saving to localStorage to prevent XSS

### 3. Storage

- Store all data in browser localStorage (client-side)
- Do not store passwords (mock authentication)
- Data stored in JSON format in localStorage
- localStorage limitations (approximately 5-10MB per domain)
- Note: This is a mock implementation for development

### 4. Sharing

- **Public data:** Recipe content, user display names, ratings/comments visible to all users
- **Private data:** Email addresses not exposed in API responses
- **No third-party sharing:** No sharing with external services, analytics, or advertisers
- **Internal use only:** Personal data used only for platform functions

---

## 3. Privacy-by-Design (Summary of Measures)

- **Data Minimization** — Collect only necessary data (name, email for authentication; recipe content for sharing)
- **Clear Consent** — Obtain consent through terms of service acceptance before collecting data
- **Retention Policy** — Delete data when users delete their accounts
- **Access Control** — Restrict access to user's own data; admin can manage all content
- **Security by Default** — Input validation, XSS protection, ownership verification

---

## 4. Security Checklist (5 Important Points)

1. **Input Validation & Output Encoding** — Validate all form inputs, sanitize data before saving, use React's built-in XSS protection

2. **Authentication Management (Mock Mode)** — Do not store passwords in localStorage, use mock tokens, verify user ID before operations, use Protected Routes

3. **XSS Protection** — Use React's built-in XSS protection, sanitize data before saving to localStorage, avoid dangerouslySetInnerHTML, validate and sanitize URLs

4. **Ownership Verification** — Verify user_id from localStorage before edit/delete operations, use Protected Routes, check authentication state before showing Edit/Delete buttons

5. **Secure localStorage Management** — Limit data stored in localStorage, separate data by user_id, verify data before reading from localStorage, handle errors when localStorage is full

---

**Note:** This is a mock implementation for development — for production, real backend API and database must be used for proper security.

