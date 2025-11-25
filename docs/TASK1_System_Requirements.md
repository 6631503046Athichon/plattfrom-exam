# Task 1 — System Requirement Analysis (20 points)

**Student:** Mr. Athichon Kaewla
**Student ID:** 66315030406
**Course:** 1305308 Platform Development
**Project:** Recipe Sharing Platform with Ratings

---

## 1. Problem Statement

Home cooks and food enthusiasts often struggle to find reliable recipes and have no centralized platform to share their culinary creations with a community. Existing recipe websites lack proper user-generated content validation through community ratings, making it difficult to identify quality recipes. Users need a simple, trustworthy platform where they can discover new dishes, share their own recipes, and provide feedback through ratings and comments. This platform addresses the need for a community-driven recipe sharing system that empowers users to both contribute and benefit from collective culinary knowledge. By implementing a rating system, users can quickly identify popular and well-tested recipes, saving time and reducing cooking failures.

---

## 2. Core User Stories (Minimum 5)

### User Story 1: Browse Recipes
**As a** home cook
**I want to** browse all available recipes on the platform
**So that** I can discover new dishes to try and expand my cooking repertoire

**Acceptance Criteria:**
- View all recipes in a grid/list format
- See recipe title, image, and average rating at a glance
- Access recipe details by clicking on any recipe card

---

### User Story 2: Share Recipes
**As a** recipe creator
**I want to** share my recipes with the community
**So that** others can benefit from my cooking experience and try my dishes

**Acceptance Criteria:**
- Create new recipes with title, ingredients, instructions, and optional image
- Edit my own recipes after publishing
- Delete my recipes if needed
- View all recipes I have created in one place

---

### User Story 3: Rate and Review Recipes
**As a** registered user
**I want to** rate recipes I've tried (1-5 stars) and leave comments
**So that** I can help other users find quality recipes and provide constructive feedback

**Acceptance Criteria:**
- Rate any recipe (except my own) from 1 to 5 stars
- Add optional text comments with my rating
- View all ratings and reviews for a recipe
- Edit or delete my own ratings

---

### User Story 4: Search for Recipes
**As a** user planning a meal
**I want to** search recipes by title or ingredients
**So that** I can find recipes that match what I have in my kitchen

**Acceptance Criteria:**
- Enter search terms in a search bar
- Get filtered results matching recipe titles or ingredients
- See results update dynamically
- Return to all recipes by clearing the search

---

### User Story 5: User Authentication
**As a** new visitor
**I want to** register for an account and login securely
**So that** I can create recipes and rate others' recipes

**Acceptance Criteria:**
- Register with name, email, and password
- Login with email and password
- Receive a secure authentication token
- Access protected features (create recipe, rate)
- Logout safely

---

### User Story 6: View Recipe Details
**As a** user interested in cooking
**I want to** view complete recipe details including ingredients, instructions, and community ratings
**So that** I have all information needed to cook the dish successfully

**Acceptance Criteria:**
- See full recipe details (title, image, ingredients, instructions)
- View average rating and number of reviews
- Read all user comments and ratings
- See who created the recipe and when

---

### User Story 7: Manage My Recipes
**As a** recipe contributor
**I want to** view and manage all my submitted recipes
**So that** I can keep my recipe collection organized and up-to-date

**Acceptance Criteria:**
- Access "My Recipes" page
- View all recipes I've created
- Quickly edit or delete any of my recipes
- See ratings my recipes have received

---

## 3. Non-Functional Requirements (Minimum 3)

### NFR 1: Performance
- **Requirement:** The platform must load recipe listings within 3 seconds on standard broadband connections
- **Measurement:** Page load time < 3 seconds
- **Rationale:** Users expect fast response times for a good user experience
- **Implementation:** Optimize database queries, implement pagination, use efficient image loading

### NFR 2: Security
- **Requirement:** All user passwords must be securely hashed using bcrypt, and API authentication must use JWT tokens
- **Measurement:** No plain-text passwords in database, token expiration set to 7 days
- **Rationale:** Protect user credentials and prevent unauthorized access
- **Implementation:** bcrypt password hashing with salt rounds, JWT authentication middleware, HTTPS in production

### NFR 3: Usability
- **Requirement:** The platform must be fully responsive and usable on mobile devices, tablets, and desktops
- **Measurement:** All features accessible on screens from 320px to 1920px width
- **Rationale:** Users may access recipes from various devices (phone in kitchen, tablet on counter)
- **Implementation:** Responsive design using Tailwind CSS, mobile-first approach, touch-friendly UI elements

### NFR 4: Scalability
- **Requirement:** The database should support at least 1,000 recipes and 10,000 ratings without performance degradation
- **Measurement:** Query response time remains < 500ms with full dataset
- **Rationale:** Platform should handle growth in content and users
- **Implementation:** Indexed database queries, efficient SQLite schema design, pagination for large datasets

### NFR 5: Data Integrity
- **Requirement:** Rating values must be constrained to 1-5 range, and users cannot rate the same recipe twice
- **Measurement:** Database constraints enforce rules, no duplicate ratings allowed
- **Rationale:** Maintain data quality and prevent rating manipulation
- **Implementation:** Database CHECK constraints, UNIQUE constraints, server-side validation

---

## 4. Key Risks & Threats (3 Items)

### Risk 1: Technical Risk — Database Performance with Large Images
**Description:** As the platform grows, storing and retrieving large recipe images could slow down the application significantly, especially with SQLite's file-based nature.

**Impact:** High — Poor performance could lead to user frustration and abandonment

**Mitigation Strategies:**
- Store only image URLs in the database, not the actual image files
- Use external image hosting services (e.g., Cloudinary, AWS S3)
- Implement image compression and optimization before upload
- Use lazy loading for images in recipe lists
- Set maximum image size limits (e.g., 5MB)

**Contingency Plan:** If performance degrades, migrate to PostgreSQL with separate file storage

---

### Risk 2: Security Risk — Unauthorized Data Access
**Description:** Attackers could attempt to access or modify other users' recipes or ratings through API manipulation, broken authentication, or SQL injection attacks.

**Impact:** Critical — Could compromise user data privacy and platform integrity

**Mitigation Strategies:**
- Implement JWT authentication on all protected endpoints
- Use parameterized queries to prevent SQL injection
- Validate user ownership before allowing edit/delete operations
- Implement rate limiting to prevent brute force attacks
- Use HTTPS in production to encrypt data in transit
- Apply CORS restrictions to limit API access

**Contingency Plan:** Regular security audits, immediate patching of vulnerabilities, user notification system for breaches

---

### Risk 3: Operational Risk — Spam and Inappropriate Content
**Description:** Malicious users could spam the platform with fake recipes, inappropriate images, or offensive comments in ratings, degrading the quality of the community.

**Impact:** Medium — Could damage platform reputation and user trust

**Mitigation Strategies:**
- Implement content moderation system (manual or automated)
- Add reporting functionality for users to flag inappropriate content
- Implement admin role for content management
- Require email verification for new accounts
- Add rate limiting on recipe and rating creation (e.g., max 10 recipes per day)
- Store user activity logs for audit trails

**Contingency Plan:** Admin dashboard for quick content removal, temporary user banning system, community guidelines enforcement

---

## Summary

This Recipe Sharing Platform addresses a clear need in the home cooking community by providing a centralized, community-driven platform for sharing and discovering recipes. The system requirements focus on core user needs (browsing, creating, rating) while maintaining high standards for performance, security, and usability. The identified risks have been analyzed with practical mitigation strategies to ensure platform reliability and safety.

**Total User Stories:** 7
**Total Non-Functional Requirements:** 5
**Total Risks Identified:** 3

---

**Document Version:** 1.0
**Date:** November 24, 2025
**Status:** Final
