# 📦 คู่มือการเตรียมไฟล์ส่งงาน Final Exam

**นักศึกษา:** นายอธิชนม์ แก้วหล้า (66315030406)
**วิชา:** 1305308 Platform Development

---

## ✅ เอกสารที่ต้องส่ง

### 1. ไฟล์ PDF เดียว (รวมทุก Task)
### 2. Source Code (.zip ไม่รวม node_modules)
### 3. Screenshots (อยู่ใน PDF แล้ว)

---

## 📸 ขั้นตอนที่ 1: ถ่าย Screenshots

### Screenshots ที่ต้องมี:

1. **Home Page** - หน้าแรกพร้อม recipe cards
2. **Recipe Detail Page** - รายละเอียดสูตรอาหาร + rating
3. **Create Recipe Form** - ฟอร์มสร้างสูตรใหม่
4. **My Recipes Page** - รายการสูตรของตัวเอง
5. **Login Page** - หน้าล็อกอิน
6. **Register Page** - หน้าสมัครสมาชิก
7. **Rating System** - แสดงการให้ rating พร้อม comments

### วิธีถ่าย Screenshots:

1. **เปิดแอพ:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. **เปิดเบราว์เซอร์:** http://localhost:5174

3. **ถ่ายภาพ:**
   - Windows: กด `Windows + Shift + S`
   - Mac: กด `Cmd + Shift + 4`
   - หรือใช้ Extension: Awesome Screenshot

4. **บันทึกในโฟลเดอร์:**
   ```
   screenshots/
   ├── 01-homepage.png
   ├── 02-recipe-detail.png
   ├── 03-create-recipe.png
   ├── 04-my-recipes.png
   ├── 05-login.png
   ├── 06-register.png
   └── 07-rating-system.png
   ```

---

## 📄 ขั้นตอนที่ 2: รวม PDF

### วิธีรวมไฟล์ MD เป็น PDF:

**Option A: ใช้ VS Code Extension**
1. ติดตั้ง Extension: "Markdown PDF"
2. เปิดไฟล์ .md
3. กด `Ctrl+Shift+P` > "Markdown PDF: Export (pdf)"
4. บันทึกทีละไฟล์

**Option B: ใช้ Pandoc**
```bash
# Install pandoc (Windows)
choco install pandoc

# รวม markdown เป็น PDF
pandoc docs/TASK1_System_Requirements.md \
       docs/TASK2_Security_PDPA_Compliance.md \
       docs/TASK3_AI_Assisted_Design.md \
       docs/TASK4_Architecture_Design.md \
       docs/TASK5_Implementation.md \
       -o Final_Exam_Documentation.pdf
```

**Option C: ใช้เว็บไซต์**
1. ไปที่ https://www.markdowntopdf.com/
2. อัพโหลดไฟล์ .md ทีละไฟล์
3. Download เป็น PDF
4. รวมด้วย Adobe Acrobat / PDF Merge

### ใส่ Screenshots ใน PDF:

ใน TASK5_Implementation.md ส่วน Screenshots:
```markdown
## Screenshots

### 1. Home Page
![Home Page](screenshots/01-homepage.png)
*Features: Hero section with search bar, recipe grid layout*

### 2. Recipe Detail Page
![Recipe Detail](screenshots/02-recipe-detail.png)
*Features: Full recipe view, rating system*
```

**แล้ว convert เป็น PDF ใหม่** (screenshots จะติดมาด้วย)

---

## 🗜️ ขั้นตอนที่ 3: สร้าง ZIP ไฟล์

### วิธีที่ 1: ใช้ Script (แนะนำ)

**Windows (PowerShell):**
```powershell
# สร้างไฟล์ create-submission-zip.ps1
# จากนั้นรัน:
.\create-submission-zip.ps1
```

**หรือรันคำสั่งนี้:**
```powershell
$exclude = @('node_modules', '.git', 'database.db', '.env')
$destination = "66315030406_Recipe_Platform.zip"

# Delete old zip if exists
if (Test-Path $destination) {
    Remove-Item $destination
}

# Create zip
Compress-Archive -Path backend,frontend,docs,README.md,SUBMISSION_GUIDE.md -DestinationPath $destination -Force

Write-Host "✅ Created: $destination" -ForegroundColor Green
```

### วิธีที่ 2: ใช้ GUI

**Windows Explorer:**
1. เลือกโฟลเดอร์: `backend`, `frontend`, `docs`, `README.md`
2. คลิกขวา > Send to > Compressed (zipped) folder
3. ตั้งชื่อ: `66315030406_Recipe_Platform.zip`

**ก่อน zip ต้องลบ:**
- ❌ `backend/node_modules/`
- ❌ `frontend/node_modules/`
- ❌ `backend/database.db` (เก็บไว้ใน .gitignore)
- ❌ `backend/.env` (มีข้อมูล secret)
- ❌ `.git/` folder

---

## 📋 Checklist ก่อนส่ง

### ✅ ไฟล์ PDF

- [ ] มี Task 1: System Requirements
- [ ] มี Task 2: Security & PDPA
- [ ] มี Task 3: AI-Assisted Design
- [ ] มี Task 4: Architecture & UX/UI
- [ ] มี Task 5: Implementation + Screenshots
- [ ] ไฟล์ชื่อ: `66315030406_Final_Exam.pdf`
- [ ] ขนาดไม่เกิน 50 MB

### ✅ ไฟล์ .ZIP

- [ ] มีโฟลเดอร์ `backend/`
- [ ] มีโฟลเดอร์ `frontend/`
- [ ] มีโฟลเดอร์ `docs/`
- [ ] มี `README.md` หลัก
- [ ] **ไม่มี** `node_modules/`
- [ ] **ไม่มี** `.env` file
- [ ] ไฟล์ชื่อ: `66315030406_Recipe_Platform.zip`
- [ ] ขนาดประมาณ 1-5 MB

### ✅ Screenshots

- [ ] Homepage with recipes
- [ ] Recipe detail page
- [ ] Create recipe form
- [ ] My recipes page
- [ ] Login page
- [ ] Register page
- [ ] Rating system
- [ ] ครบ 7 รูป ความละเอียดชัด

---

## 📤 วิธีส่งงาน

ตามที่อาจารย์กำหนด เช่น:
1. Google Classroom
2. Email
3. LMS ของมหาวิทยาลัย

**ไฟล์ที่ส่ง:**
1. `66315030406_Final_Exam.pdf`
2. `66315030406_Recipe_Platform.zip`

---

## 🔍 ตรวจสอบไฟล์ก่อนส่ง

### ทดสอบ ZIP file:

1. แตก zip ไฟล์
2. ลองติดตั้ง dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. ลองรัน:
   ```bash
   # Backend
   cd backend && npm start

   # Frontend
   cd frontend && npm run dev
   ```
4. เช็คว่าแอพทำงานได้

### ตรวจสอบ PDF:

- [ ] เปิดได้ปกติ
- [ ] ทุกหน้าอ่านได้ชัด
- [ ] รูปภาพแสดงผลถูกต้อง
- [ ] Table of Contents (ถ้ามี)
- [ ] มีหมายเลขหน้า

---

## ⚠️ ข้อควรระวัง

### ❌ ห้ามส่ง:
- `node_modules/` - ทำให้ไฟล์ใหญ่มาก
- `.env` - มีข้อมูลลับ
- `database.db` - ข้อมูล test
- `.git/` - ไม่จำเป็น

### ✅ ต้องส่ง:
- `package.json` และ `package-lock.json`
- Source code ทั้งหมด
- Documentation
- README.md

---

## 🎯 โครงสร้างไฟล์สุดท้าย

```
📦 66315030406_Recipe_Platform.zip
├── 📂 backend/
│   ├── 📂 src/
│   ├── 📄 package.json
│   ├── 📄 package-lock.json
│   └── 📄 .env.example
│
├── 📂 frontend/
│   ├── 📂 src/
│   ├── 📄 package.json
│   ├── 📄 package-lock.json
│   ├── 📄 vite.config.js
│   └── 📄 tailwind.config.js
│
├── 📂 docs/
│   ├── 📄 TASK1_System_Requirements.md
│   ├── 📄 TASK2_Security_PDPA_Compliance.md
│   ├── 📄 TASK3_AI_Assisted_Design.md
│   ├── 📄 TASK4_Architecture_Design.md
│   └── 📄 TASK5_Implementation.md
│
└── 📄 README.md

📄 66315030406_Final_Exam.pdf (แยกไฟล์)
```

---

## 📞 ติดต่อ

หากมีปัญหาในการเตรียมไฟล์:
- **นักศึกษา:** นายอธิชนม์ แก้วหล้า
- **รหัส:** 66315030406

---

**สุดท้าย:** ตรวจสอบให้แน่ใจว่าทุกอย่างพร้อมก่อนกด Submit!

**Good Luck!** 🍀
