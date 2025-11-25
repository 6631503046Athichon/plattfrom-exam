# 📝 ขั้นตอนต่อไปสำหรับนักศึกษา

**สถานะปัจจุบัน:** โค้ดเสร็จสมบูรณ์ทั้ง Backend และ Frontend แล้ว ✅

---

## 🎯 สิ่งที่เหลือทำ (3 ขั้นตอน)

### 1️⃣ ถ่าย Screenshots (15-20 นาที)
### 2️⃣ รวม PDF (10-15 นาที)
### 3️⃣ สร้าง ZIP file (5 นาที)

---

## 📸 ขั้นตอนที่ 1: ถ่าย Screenshots

### เปิดแอพ:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```
ต้องเห็น: `Server running on port 5000 🚀`

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
ต้องเห็น: `Local: http://localhost:5174/`

### เปิดเบราว์เซอร์และถ่ายรูป:

1. ไปที่ http://localhost:5174
2. กด Windows + Shift + S (Windows) หรือ Cmd + Shift + 4 (Mac)
3. ถ่ายภาพหน้าจอตามลำดับ:

**ภาพที่ 1: Homepage**
- แสดง Hero section + Search bar + Recipe cards
- บันทึกเป็น: `screenshots/01-homepage.png`

**ภาพที่ 2: Register Page**
- คลิก "Register" บน Navbar
- บันทึกเป็น: `screenshots/02-register.png`

**ภาพที่ 3: Login Page**
- คลิก "Login" บน Navbar
- บันทึกเป็น: `screenshots/03-login.png`

**ภาพที่ 4: Create Recipe**
- ล็อกอินก่อน (ใช้ user ที่เคยสร้างจาก test)
- คลิก "Create Recipe"
- กรอกข้อมูล:
  - Title: "Pad Thai"
  - Ingredients: "Rice noodles\nShrimp\nEggs\nFish sauce"
  - Instructions: "1. Soak noodles\n2. Cook shrimp..."
  - Image URL: `https://images.unsplash.com/photo-1559314809-0d155014e29e`
- บันทึกเป็น: `screenshots/04-create-recipe.png`

**ภาพที่ 5: Recipe Detail**
- คลิกเข้าไปดู recipe ที่เพิ่งสร้าง
- แสดงส่วน Ingredients, Instructions, Rating
- บันทึกเป็น: `screenshots/05-recipe-detail.png`

**ภาพที่ 6: Rating System**
- ที่หน้า Recipe Detail
- Scroll ลงไปส่วน "Leave a Rating"
- แสดงฟอร์ม rating (ดาว 5 ดวง + comment box)
- บันทึกเป็น: `screenshots/06-rating-form.png`

**ภาพที่ 7: My Recipes**
- คลิก "My Recipes" บน Navbar
- แสดงรายการ recipes ที่สร้างไว้
- บันทึกเป็น: `screenshots/07-my-recipes.png`

---

## 📄 ขั้นตอนที่ 2: รวม PDF

### A. เพิ่ม Screenshots ใน TASK5

1. สร้างโฟลเดอร์ `screenshots/` ในโปรเจกต์
2. วาง screenshots 7 รูปใน `screenshots/`
3. เปิดไฟล์ `docs/TASK5_Implementation.md`
4. หาส่วน `## Screenshots`
5. เปลี่ยนจาก `screenshots/homepage.png` เป็น path ที่ถูกต้อง

### B. รวมเป็น PDF

**วิธีที่ 1: ใช้ VS Code**
```
1. ติดตั้ง Extension: "Markdown PDF"
2. เปิดแต่ละไฟล์ .md
3. Ctrl+Shift+P > "Markdown PDF: Export (pdf)"
4. บันทึก 5 ไฟล์ PDF
5. ใช้ Adobe / PDF Merger รวมเป็นไฟล์เดียว
```

**วิธีที่ 2: ใช้เว็บไซต์**
```
1. ไปที่ https://www.markdowntopdf.com/
2. Upload ทีละไฟล์:
   - TASK1_System_Requirements.md
   - TASK2_Security_PDPA_Compliance.md
   - TASK3_AI_Assisted_Design.md
   - TASK4_Architecture_Design.md
   - TASK5_Implementation.md
3. Download เป็น PDF
4. ไปที่ https://www.ilovepdf.com/merge_pdf
5. รวม 5 ไฟล์เป็นไฟล์เดียว
6. ตั้งชื่อ: 66315030406_Final_Exam.pdf
```

### C. ตรวจสอบ PDF

- [ ] เปิดได้ปกติ
- [ ] ครบ 5 Tasks
- [ ] Screenshots แสดงผลชัด
- [ ] ขนาดไม่เกิน 50 MB

---

## 🗜️ ขั้นตอนที่ 3: สร้าง ZIP

### A. ใช้ PowerShell Script (แนะนำ)

```powershell
# เปิด PowerShell ที่โฟลเดอร์โปรเจกต์
# รันคำสั่ง:
.\create-submission-zip.ps1
```

จะได้ไฟล์: `66315030406_Recipe_Platform.zip`

### B. หรือใช้มือ

1. ลบโฟลเดอร์:
   - `backend/node_modules/`
   - `frontend/node_modules/`
   - `backend/database.db`
   - `backend/.env`

2. เลือกโฟลเดอร์:
   - `backend/`
   - `frontend/`
   - `docs/`
   - `README.md`
   - `SUBMISSION_GUIDE.md`

3. คลิกขวา > Send to > Compressed (zipped) folder
4. ตั้งชื่อ: `66315030406_Recipe_Platform.zip`

### C. ตรวจสอบ ZIP

```bash
# แตกไฟล์ไปโฟลเดอร์ใหม่
# ลองติดตั้งและรัน:
cd backend
npm install
npm start

cd ../frontend
npm install
npm run dev

# ต้องทำงานได้ปกติ
```

---

## ✅ Checklist สุดท้าย

### ไฟล์ที่ต้องส่ง (2 ไฟล์):

- [ ] `66315030406_Final_Exam.pdf` (10-30 MB)
- [ ] `66315030406_Recipe_Platform.zip` (1-5 MB)

### เนื้อหาใน PDF:

- [ ] Task 1: System Requirements
- [ ] Task 2: Security & PDPA
- [ ] Task 3: AI-Assisted Design
- [ ] Task 4: Architecture & UX/UI
- [ ] Task 5: Implementation + 7 Screenshots

### เนื้อหาใน ZIP:

- [ ] backend/ (ไม่มี node_modules)
- [ ] frontend/ (ไม่มี node_modules)
- [ ] docs/
- [ ] README.md
- [ ] ทดสอบ npm install ได้

---

## 📤 การส่งงาน

1. ตรวจสอบไฟล์ทั้ง 2 ไฟล์อีกครั้ง
2. ส่งตามที่อาจารย์กำหนด (Google Classroom / Email / LMS)
3. เก็บ backup ไว้ใน Google Drive / OneDrive

---

## 🎓 สรุปโปรเจกต์

### สิ่งที่ทำเสร็จแล้ว:

✅ **Backend (13 API Endpoints):**
- Authentication (Register, Login, Get User)
- Recipe CRUD (Create, Read, Update, Delete, Search)
- Rating System (Add, Update, Delete, View)

✅ **Frontend (6 Pages):**
- Home Page with search
- Recipe Detail with ratings
- Create/Edit Recipe Form
- My Recipes
- Login/Register

✅ **Database:**
- 3 Tables: users, recipes, ratings
- Foreign Keys & Constraints
- SQL Injection Prevention

✅ **Security:**
- JWT Authentication
- Password Hashing (bcrypt)
- Input Validation
- OWASP Top 10 Compliance

✅ **Documentation:**
- All 5 Tasks completed
- Architecture diagrams
- PDPA analysis
- AI-assisted design

### ระยะเวลาทำ:

- Backend: 2 ชั่วโมง
- Frontend: 2.5 ชั่วโมง
- Documentation: 1.5 ชั่วโมง
- Testing: 1 ชั่วโมง
- **รวม: 7 ชั่วโมง**

---

## 💡 Tips

1. **Screenshots ให้ชัด**: ใช้ความละเอียด Full HD (1920x1080)
2. **PDF ไม่ใหญ่เกิน**: Compress รูปก่อนใส่ (ประมาณ 70-80% quality)
3. **Test ZIP ก่อนส่ง**: แตกไฟล์ลองรันจริง
4. **Backup**: เก็บไว้หลายที่

---

## 📞 ข้อมูลติดต่อ

**นักศึกษา:** นายอธิชนม์ แก้วหล้า
**รหัส:** 66315030406
**วิชา:** 1305308 Platform Development

---

**เวลาที่เหลือในการเตรียมไฟล์: ประมาณ 30-50 นาที**

**ขอให้โชคดี! 🍀**
