# Task 1 — System Requirement Analysis

**Student:** นายอธิชนม์ แก้วหล้า  
**Student ID:** 66315030406  
**Course:** 1305308 Platform Development  
**Project:** Recipe Sharing Platform with Ratings

---

## 1. Problem Statement

Home cooks and cooking enthusiasts often face the problem of not having a reliable way to find trusted recipes and lack a central platform to share their culinary creations with the community. Existing recipe websites lack a community-driven quality verification system through user ratings, making it difficult to identify high-quality recipes. Users need a simple and trustworthy platform where they can discover new recipes, share their own recipes, and provide feedback through ratings and comments. This platform addresses the need for a community-driven recipe sharing system that enables users to participate and benefit from shared cooking knowledge, and quickly identify popular and tested recipes.

---

## 2. Core User Stories

### User

1. **I want to view a list of recipes** so I can discover new dishes to try.

2. **I want to rate and review recipes** (1-5 stars) with comments so I can help other users find quality recipes.

3. **I want to search for recipes** by title or ingredients so I can find recipes that match what I have in my kitchen.

4. **I want to authenticate** (register/login) so I can create recipes and rate others' recipes.

5. **I want to view recipe details** including ingredients, instructions, and community ratings so I have all the information needed to cook successfully.

6. **I want to manage my recipes** so I can view, edit, or delete recipes I created.

### Admin

7. **As an admin, I want to edit any recipe** so I can moderate inappropriate content.

8. **As an admin, I want to delete any recipe** so I can remove spam or inappropriate content.

---

## 3. Non-Functional Requirements

1. **Performance** — The platform must load recipe listings within 3 seconds on standard internet connection.

2. **Security** — User data and recipes must be stored securely in localStorage with client-side validation and XSS attack prevention.

3. **Usability** — The platform must be responsive and work on mobile devices, tablets, and desktops (320px to 1920px screen widths).

4. **Scalability** — localStorage should support sufficient recipes and ratings within browser storage limits (approximately 5-10MB per domain).

5. **Data Integrity** — Ratings must be limited to 1-5 range and users cannot rate the same recipe twice.

---

## 4. Key Risks & Threats

1. **Technical Risk — localStorage Limitations and Performance**

   When the platform grows, localStorage may become full (approximately 5-10MB per domain) and retrieving large amounts of data from localStorage may slow down the application, especially with many recipes and ratings.

2. **Security Risk — XSS and Unauthorized Data Access**

   Attackers may attempt to access or modify recipes or ratings of other users through direct localStorage manipulation, XSS attacks via user input, or accessing unprotected data in localStorage.

3. **Operational Risk — Spam and Inappropriate Content**

   Malicious users may spam the platform with fake recipes, inappropriate images, or offensive comments in ratings, reducing community quality.

---

**Total User Stories:** 8 (6 for Regular User + 2 for Admin)  
**Total Non-Functional Requirements:** 5  
**Total Risks Identified:** 3

