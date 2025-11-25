# Task 2 — ความปลอดภัยและการปฏิบัติตาม PDPA (OWASP + Privacy-by-Design) (20 คะแนน)

**นักศึกษา:** นายอธิชนม์ แก้วหล้า
**รหัสนักศึกษา:** 66315030406
**รายวิชา:** 1305308 การพัฒนาแพลตฟอร์ม
**โปรเจค:** แพลตฟอร์มแชร์สูตรอาหารพร้อมระบบให้คะแนน

---

## 1. สามรายการจาก OWASP Top 10 ที่เกี่ยวข้องกับโปรเจคนี้

### OWASP #1: A01:2021 – Broken Access Control (การควบคุมการเข้าถึงที่เสียหาย)

#### เหตุใดจึงเป็นความเสี่ยงสำหรับแพลตฟอร์มของเรา

Broken Access Control เกิดขึ้นเมื่อผู้ใช้สามารถกระทำการนอกเหนือจากสิทธิ์ที่ตั้งใจไว้ ในแพลตฟอร์มแชร์สูตรอาหารของเรา มีหลายสถานการณ์ที่อาจเผยให้เห็นช่องโหว่นี้:

- **การแก้ไขสูตรโดยไม่ได้รับอนุญาต:** ผู้ใช้ที่เป็นอันตรายอาจพยายามแก้ไขหรือลบสูตรอาหารที่สร้างโดยผู้ใช้อื่นโดยการแก้ไข localStorage โดยตรงหรือใช้ browser DevTools
- **การจัดการคะแนน:** ผู้ใช้อาจพยายามให้คะแนนสูตรเดียวกันหลายครั้งโดยการแก้ไขข้อมูลใน localStorage
- **การเข้าถึงข้อมูลผู้ใช้อื่น:** ผู้ใช้ทั่วไปอาจเข้าถึงข้อมูลส่วนตัวของผู้ใช้อื่น (อีเมล, user data) ผ่านการอ่าน localStorage
- **การข้ามการตรวจสอบ authentication:** ผู้ใช้อาจแก้ไข localStorage เพื่อเพิ่ม mock token หรือเปลี่ยน user ID

**ผลกระทบในโลกจริง:**
- ผู้ใช้ A สร้างสูตรที่ได้รับความนิยม
- ผู้ใช้ B แก้ไข localStorage โดยตรงและลบสูตรของผู้ใช้ A
- แพลตฟอร์มสูญเสียความไว้วางใจและเนื้อหาที่มีคุณค่า

#### วิธีการบรรเทา

**Mitigation method (สรุป):**

- ตรวจสอบความเป็นเจ้าของ (user_id) ก่อนอนุญาตให้แก้ไข/ลบ โดยเปรียบเทียบ recipe.user_id กับ currentUser.id จาก localStorage และตรวจสอบ currentUser.role === 'admin' สำหรับสิทธิ์ admin หากไม่ได้รับอนุญาตให้ throw error

**การนำไปใช้ในแพลตฟอร์มของเรา:**

```javascript
// services/recipeService.js
export const updateRecipe = async (id, recipeData) => {
  const recipes = getStoredRecipes();
  const recipe = recipes.find(r => r.id === parseInt(id));
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // ตรวจสอบความเป็นเจ้าของก่อนอนุญาตให้อัปเดต
  if (!currentUser || recipe.user_id !== currentUser.id) {
    throw new Error('Not authorized to update this recipe');
  }

  // ดำเนินการอัปเดต
  const index = recipes.findIndex(r => r.id === parseInt(id));
  recipes[index] = { ...recipes[index], ...recipeData };
  saveRecipes(recipes);
  return recipes[index];
};

// components/RecipeForm.jsx - Protected Route
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  return user ? children : <Navigate to="/login" />;
};
```

**มาตรการป้องกัน:**
1. **การตรวจสอบความเป็นเจ้าของ:** ตรวจสอบ user_id จาก localStorage ก่อนการดำเนินการแก้ไข/ลบทุกครั้ง
2. **Protected Routes:** ใช้ React Router protected routes เพื่อป้องกันการเข้าถึงหน้าที่ต้อง authentication
3. **การตรวจสอบ client-side:** ตรวจสอบ authentication state ก่อนแสดงปุ่ม Edit/Delete
4. **การตรวจสอบ duplicate:** ตรวจสอบ duplicate rating ก่อนบันทึกลง localStorage
5. **การแยกข้อมูลตาม user:** จัดเก็บข้อมูลแยกตาม user_id เพื่อลดความเสี่ยงการเข้าถึงข้อมูลผู้อื่น

---

### OWASP #2: A02:2021 – Cryptographic Failures (ความล้มเหลวด้านการเข้ารหัส)

#### เหตุใดจึงเป็นความเสี่ยงสำหรับแพลตฟอร์มของเรา

Cryptographic Failures (เดิมเรียกว่า Sensitive Data Exposure) เกิดขึ้นเมื่อข้อมูลที่ละเอียดอ่อนไม่ได้รับการป้องกันอย่างเหมาะสม ในแพลตฟอร์ม frontend-only ของเรา เราจัดการกับ:

- **ข้อมูลผู้ใช้ใน localStorage:** ข้อมูลส่วนบุคคลที่สามารถระบุตัวตนได้ (PII) ถูกจัดเก็บใน localStorage
- **ที่อยู่อีเมล:** ข้อมูลส่วนบุคคลที่สามารถระบุตัวตนได้ (PII)
- **Mock tokens:** ข้อมูลประจำตัวสำหรับการยืนยันตัวตน (แม้จะเป็น mock)
- **ความคิดเห็นของผู้ใช้:** อาจมีข้อมูลส่วนตัว

**ผลกระทบในโลกจริง:**
- ผู้ใช้สามารถเข้าถึงข้อมูลใน localStorage ได้โดยตรงผ่าน browser DevTools
- ข้อมูลผู้ใช้ทั้งหมดถูกจัดเก็บในรูปแบบ plain text ใน localStorage
- ผู้ใช้ที่ใช้รหัสผ่านซ้ำกันอาจเสี่ยงหากมีการเข้าถึง localStorage
- ความรับผิดทางกฎหมายภายใต้ PDPA สำหรับการละเมิดข้อมูล

**สิ่งที่อาจผิดพลาด:**
- จัดเก็บข้อมูลส่วนตัวใน localStorage โดยไม่มีการป้องกัน
- ไม่มีการ sanitize ข้อมูลก่อนบันทึก
- เปิดเผยข้อมูลผู้ใช้อื่นใน localStorage
- ไม่มีการจำกัดการเข้าถึงข้อมูลตาม user ID

#### วิธีการบรรเทา

**Mitigation method (สรุป):**

- ไม่เก็บรหัสผ่านใน localStorage (mock authentication mode) เก็บเฉพาะข้อมูลผู้ใช้ที่จำเป็น (name, email, role) และแยกข้อมูลตาม user_id สำหรับ production ใช้ backend API พร้อม database ที่เข้ารหัสและ HTTPS สำหรับการส่งข้อมูลทั้งหมด

**การนำไปใช้ในแพลตฟอร์มของเรา:**

```javascript
// services/authService.js - Mock Authentication
export const authService = {
  register: async (userData) => {
    const users = getStoredUsers();
    
    // ตรวจสอบ email ซ้ำ
    if (users.find(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    // สร้าง user โดยไม่เก็บรหัสผ่าน (mock mode)
    const newUser = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      name: userData.name,
      email: userData.email,
      role: 'user',
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    // เก็บเฉพาะ user data ไม่เก็บรหัสผ่าน
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return { user: newUser, token: 'mock-token-' + newUser.id };
  },

  login: async (credentials) => {
    const users = getStoredUsers();
    const user = users.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // ใน mock mode ไม่มีการตรวจสอบรหัสผ่านจริง
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { user, token: 'mock-token-' + user.id };
  }
};
```

**มาตรการป้องกัน:**
1. **ไม่เก็บรหัสผ่าน:** ใน mock mode ไม่เก็บรหัสผ่านใน localStorage เลย
2. **การแยกข้อมูลตาม user:** จัดเก็บข้อมูลแยกตาม user_id เพื่อลดความเสี่ยง
3. **การตรวจสอบความเป็นเจ้าของ:** ตรวจสอบ user_id ก่อนเข้าถึงข้อมูลทุกครั้ง
4. **การ sanitize ข้อมูล:** ทำความสะอาด input ก่อนบันทึกลง localStorage
5. **การจำกัดการเข้าถึง:** ใช้ Protected Routes เพื่อจำกัดการเข้าถึงหน้าที่ต้อง authentication
6. **คำเตือนสำหรับ production:** ระบุชัดเจนว่านี่เป็น mock implementation และต้องใช้ backend จริงสำหรับ production

---

### OWASP #3: A03:2021 – Injection (Cross-Site Scripting - XSS)

#### เหตุใดจึงเป็นความเสี่ยงสำหรับแพลตฟอร์มของเรา

Cross-Site Scripting (XSS) เกิดขึ้นเมื่อข้อมูลที่ไม่น่าเชื่อถือถูกแสดงผลในหน้าเว็บโดยไม่มีการ sanitize ในแพลตฟอร์ม frontend-only ของเรา ข้อมูลป้อนเข้าของผู้ใช้ประกอบด้วย:

- **คำค้นหา:** ผู้ใช้ค้นหาสูตรตามคำสำคัญ
- **เนื้อหาสูตร:** ชื่อ วัตถุดิบ ขั้นตอนมีข้อความของผู้ใช้
- **อีเมล/ชื่อ:** ข้อมูลการลงทะเบียนของผู้ใช้
- **ความคิดเห็น:** ความคิดเห็นการให้คะแนนพร้อมข้อความอิสระ

**ตัวอย่างการโจมตีในโลกจริง:**

```javascript
// โค้ดที่มีช่องโหว่ (อย่าทำแบบนี้!)
const comment = userInput; // จาก localStorage
<div dangerouslySetInnerHTML={{ __html: comment }} />
// ถ้า comment = "<script>alert('XSS')</script>", นี่จะรัน JavaScript

// ถ้า comment = "<img src=x onerror='stealData()'>"
// นี่อาจขโมยข้อมูลจาก localStorage!
```

**ผลกระทบในโลกจริง:**
- ผู้โจมตีสามารถขโมยข้อมูลจาก localStorage (user data, tokens)
- ผู้โจมตีสามารถขโมย session หรือ authentication state
- ผู้โจมตีสามารถแสดงเนื้อหาที่เป็นอันตรายให้ผู้ใช้เห็น
- การบุกรุกระบบทั้งหมดผ่านการขโมยข้อมูล

#### วิธีการบรรเทา

**Mitigation method (สรุป):**

- ใช้ React's built-in XSS protection (auto-escapes content โดย default) ทำความสะอาด (sanitize) input ทั้งหมดก่อนบันทึกลง localStorage โดยลบ HTML tags และ escape special characters ไม่ใช้ dangerouslySetInnerHTML ตรวจสอบและ sanitize image URLs ก่อนแสดงผล

**การนำไปใช้ในแพลตฟอร์มของเรา:**

```javascript
// services/recipeService.js - Sanitize Input
export const recipeService = {
  createRecipe: async (recipeData) => {
    // Sanitize input ก่อนบันทึก
    const sanitizedData = {
      title: sanitizeInput(recipeData.title),
      ingredients: sanitizeInput(recipeData.ingredients),
      instructions: sanitizeInput(recipeData.instructions),
      image_url: sanitizeURL(recipeData.image_url)
    };

    // บันทึกลง localStorage
    const recipes = getStoredRecipes();
    recipes.push(sanitizedData);
    saveRecipes(recipes);
  }
};

// utils/sanitize.js
export const sanitizeInput = (input) => {
  if (!input) return '';
  
  // ลบ HTML tags และ escape special characters
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

// components/RecipeCard.jsx - Safe Rendering
const RecipeCard = ({ recipe }) => {
  // React auto-escapes โดย default
  return (
    <div>
      <h3>{recipe.title}</h3> {/* Safe - React escapes automatically */}
      <p>{recipe.ingredients}</p> {/* Safe */}
      {/* หลีกเลี่ยง dangerouslySetInnerHTML */}
    </div>
  );
};
```

**มาตรการป้องกัน:**
1. **React's Built-in XSS Protection:** React auto-escapes content โดย default
2. **หลีกเลี่ยง dangerouslySetInnerHTML:** ไม่ใช้ dangerouslySetInnerHTML เว้นแต่จำเป็นจริงๆ
3. **การ sanitize ข้อมูลป้อนเข้า:** ทำความสะอาด input ก่อนบันทึกลง localStorage
4. **การตรวจสอบ URL:** ตรวจสอบ image_url ก่อนแสดงผล
5. **Content Security Policy (CSP):** ใช้ CSP headers ใน production
6. **การจัดการข้อผิดพลาด:** ไม่แสดง error messages ที่มี user input โดยตรง

---

## 2. กระแสข้อมูล PDPA (PDPA Data Flow)

### ข้อมูลส่วนบุคคลที่เก็บรวบรวม

ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคลของประเทศไทย (PDPA) เราเก็บรวบรวมและประมวลผลข้อมูลส่วนบุคคลดังต่อไปนี้:

| ประเภทข้อมูล | วัตถุประสงค์ | ฐานทางกฎหมาย | ระยะเวลาเก็บรักษา |
|------------|-----------|-------------|------------------|
| ชื่อ | การระบุตัวตนผู้ใช้, การระบุผู้เขียนสูตร | ความยินยอม | ตลอดอายุบัญชี (ใน localStorage) |
| ที่อยู่อีเมล | การยืนยันตัวตน, การสื่อสาร | ความยินยอม | ตลอดอายุบัญชี (ใน localStorage) |
| รหัสผ่าน | การยืนยันตัวตน (mock mode - ไม่เก็บจริง) | ความยินยอม | ไม่เก็บ (mock authentication) |
| เนื้อหาสูตร | การให้บริการ | ความยินยอม | จนกว่าผู้ใช้ลบ (ใน localStorage) |
| ความคิดเห็นการให้คะแนน | การให้บริการ | ความยินยอม | จนกว่าผู้ใช้ลบ (ใน localStorage) |

---

### แผนภาพกระแสข้อมูล PDPA

```
┌─────────────────────────────────────────────────────────────┐
│                    การเก็บรวบรวมข้อมูล                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  แบบฟอร์มลงทะเบียนผู้ใช้                                     │
│  ├─ ชื่อ (จำเป็น)                                          │
│  ├─ อีเมล (จำเป็น)                                         │
│  └─ รหัสผ่าน (จำเป็น)                                      │
│                                                             │
│  ความยินยอมของผู้ใช้:                                        │
│  ☑ ฉันยอมรับข้อตกลงการให้บริการและนโยบายความเป็นส่วนตัว      │
│                                                             │
│  วัตถุประสงค์: การยืนยันตัวตนและการให้บริการ                 │
│  ฐานทางกฎหมาย: ความยินยอมโดยชัดแจ้ง (PDPA มาตรา 19)        │
│                                                             │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    การประมวลผลข้อมูล                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Frontend Application (React.js)                            │
│  ├─ การตรวจสอบข้อมูลป้อนเข้า (client-side validation)      │
│  ├─ การทำให้อีเมลเป็นมาตรฐาน (toLowerCase)                 │
│  ├─ การ sanitize ข้อมูล (ป้องกัน XSS)                      │
│  ├─ การสร้าง mock token (สำหรับ authentication)            │
│  └─ การตรวจสอบการควบคุมการเข้าถึง (Protected Routes)         │
│                                                             │
│  หลักการประมวลผล:                                           │
│  ✓ การจำกัดวัตถุประสงค์: เฉพาะวัตถุประสงค์ที่ระบุเท่านั้น   │
│  ✓ การลดข้อมูลให้น้อยที่สุด: เก็บเฉพาะข้อมูลที่จำเป็น        │
│  ✓ ความถูกต้อง: ผู้ใช้สามารถอัปเดตข้อมูลของตนเอง            │
│  ✓ การจำกัดการจัดเก็บ: ลบเมื่อลบบัญชี                       │
│                                                             │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                      การจัดเก็บข้อมูล                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Browser localStorage (การจัดเก็บในเบราว์เซอร์)              │
│  ├─ users (JSON array)                                     │
│  │  ├─ id, name, email                                    │
│  │  ├─ role, created_at                                  │
│  │  └─ ไม่เก็บรหัสผ่าน (mock authentication)              │
│  ├─ recipes (JSON array)                                  │
│  │  └─ user_id, title, ingredients, instructions         │
│  ├─ ratings (JSON array)                                  │
│  │  └─ user_id, recipe_id, rating, comment               │
│  └─ currentUser (JSON object)                             │
│     └─ ข้อมูลผู้ใช้ที่ล็อกอินอยู่                            │
│                                                             │
│  มาตรการความปลอดภัย:                                        │
│  ✓ ไม่เก็บรหัสผ่าน (mock mode)                             │
│  ✓ การ sanitize ข้อมูลก่อนบันทึก                           │
│  ✓ การตรวจสอบความเป็นเจ้าของก่อนแก้ไข/ลบ                    │
│  ✓ ข้อจำกัด localStorage (ประมาณ 5-10MB)                   │
│  ✓ การแยกข้อมูลตาม user_id                                 │
│                                                             │
│  ที่ตั้ง: Browser ของผู้ใช้ (client-side)                  │
│  การเข้าถึง: ผ่าน JavaScript API เท่านั้น                   │
│  หมายเหตุ: นี่เป็น mock implementation สำหรับ development │
│            ต้องใช้ backend + database จริงสำหรับ production │
│                                                             │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                      การแชร์ข้อมูล                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  การแชร์ภายใน (ภายในแพลตฟอร์ม):                             │
│  ├─ สาธารณะ: ชื่อสูตร วัตถุดิบ ขั้นตอน                      │
│  ├─ สาธารณะ: ชื่อแสดงของผู้ใช้ (ไม่ใช่อีเมล)                 │
│  ├─ สาธารณะ: คะแนนและความคิดเห็น                            │
│  └─ ส่วนตัว: อีเมล, password hash (ไม่เปิดเผย)             │
│                                                             │
│  การแชร์ภายนอก:                                              │
│  ├─ ไม่มี - ไม่มีการแชร์กับบุคคลที่สาม                     │
│  ├─ ไม่มีบริการวิเคราะห์                                    │
│  ├─ ไม่มีเครือข่ายโฆษณา                                     │
│  └─ ไม่มีการขายข้อมูล                                       │
│                                                             │
│  สิทธิ PDPA ที่เคารพ:                                       │
│  ✓ สิทธิในการเข้าถึง: ผู้ใช้สามารถดูข้อมูลของตน            │
│  ✓ สิทธิในการแก้ไข: ผู้ใช้สามารถแก้ไขโปรไฟล์               │
│  ✓ สิทธิในการลบ: การลบบัญชีจะลบข้อมูลทั้งหมด                │
│  ✓ สิทธิในการพกพาข้อมูล: ฟังก์ชันการส่งออก                  │
│  ✓ สิทธิในการคัดค้าน: มีตัวเลือกยกเลิก                      │
│  ✓ สิทธิในการถอนความยินยอม: ลบบัญชีได้ตลอดเวลา              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### สรุปกระแสข้อมูล (รายการแสดงหัวข้อย่อย)

#### **การเก็บรวบรวมข้อมูล**
- เก็บชื่อ อีเมล และรหัสผ่านระหว่างการลงทะเบียน
- เก็บเนื้อหาสูตร (ชื่อ วัตถุดิบ ขั้นตอน URL รูปภาพที่ไม่บังคับ) เมื่อสร้างสูตร
- เก็บข้อมูลการให้คะแนน (1-5 ดาว ความคิดเห็นที่ไม่บังคับ) เมื่อให้คะแนนสูตร
- บันทึก IP addresses อัตโนมัติเพื่อวัตถุประสงค์ด้านความปลอดภัย
- ได้รับความยินยอมของผู้ใช้ผ่านการยอมรับข้อตกลงการให้บริการ
- นโยบายความเป็นส่วนตัวอธิบายการใช้ข้อมูลอย่างชัดเจน

#### **การประมวลผลข้อมูล**
- ไม่เก็บรหัสผ่าน (mock authentication mode)
- ที่อยู่อีเมลทำให้เป็นมาตรฐานเป็นตัวพิมพ์เล็กเพื่อความสม่ำเสมอ
- ดำเนินการตรวจสอบข้อมูลป้อนเข้าบนฟิลด์ทั้งหมด (ความยาว รูปแบบ ประเภท)
- สร้าง mock tokens สำหรับการยืนยันตัวตน (สำหรับ development)
- ดำเนินการตรวจสอบการควบคุมการเข้าถึงผ่าน Protected Routes
- ตรวจสอบความเป็นเจ้าของของผู้ใช้ก่อนการแก้ไขข้อมูลใดๆ
- Sanitize ข้อมูลก่อนบันทึกลง localStorage เพื่อป้องกัน XSS

#### **การจัดเก็บข้อมูล**
- จัดเก็บข้อมูลทั้งหมดใน browser localStorage (client-side)
- ไม่เก็บรหัสผ่าน (mock authentication ไม่ต้องการรหัสผ่านจริง)
- ข้อมูลถูกจัดเก็บในรูปแบบ JSON ใน localStorage
- การตรวจสอบ duplicate ผ่าน client-side validation
- ข้อมูลถูกจัดเก็บใน browser ของผู้ใช้ (client-side storage)
- ข้อจำกัด localStorage (ประมาณ 5-10MB ต่อ domain)
- หมายเหตุ: นี่เป็น mock implementation สำหรับ development
- สำหรับ production ต้องใช้ backend + database จริงเพื่อความปลอดภัย

#### **การแชร์ข้อมูล**
- **ข้อมูลสาธารณะ:** เนื้อหาสูตร ชื่อแสดงผู้ใช้ คะแนน/ความคิดเห็น มองเห็นได้สำหรับผู้ใช้ทุกคน
- **ข้อมูลส่วนตัว:** ที่อยู่อีเมลและ password hashes ไม่เปิดเผยใน API responses
- **ไม่มีการแชร์กับบุคคลที่สาม:** ไม่แชร์ข้อมูลกับบริการภายนอก การวิเคราะห์ หรือผู้โฆษณา
- **ใช้ภายในเท่านั้น:** ข้อมูลส่วนบุคคลใช้เฉพาะสำหรับฟังก์ชันแพลตฟอร์มเท่านั้น
- **การควบคุมของผู้ใช้:** ผู้ใช้ตัดสินใจว่าจะเผยแพร่สูตรอะไร (สูตรทั้งหมดเป็นสาธารณะตามค่าเริ่มต้น)

---

## 3. รายการตรวจสอบความปลอดภัย (5 รายการ)

### ✅ 1. การตรวจสอบข้อมูลป้อนเข้าบนฟอร์มทั้งหมด

**การนำไปใช้:**
- ใช้ client-side validation บนทุกฟอร์ม
- ตรวจสอบประเภทข้อมูล ความยาว และรูปแบบ
- ทำความสะอาดข้อมูลป้อนเข้าเพื่อลบ HTML/JavaScript (sanitize)
- ปฏิเสธการบันทึกข้อมูลที่มีข้อผิดพลาดในการตรวจสอบ

**ตัวอย่างโค้ด:**
```javascript
// components/RecipeForm.jsx
const validateRecipe = (data) => {
  const errors = {};
  
  if (!data.title || data.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }
  
  if (!data.ingredients || data.ingredients.trim().length < 10) {
    errors.ingredients = 'Ingredients must be at least 10 characters';
  }
  
  if (data.image_url && !isValidURL(data.image_url)) {
    errors.image_url = 'Invalid URL format';
  }
  
  return errors;
};

// utils/sanitize.js
export const sanitizeInput = (input) => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim();
};
```

**ป้องกันจาก:**
- Cross-Site Scripting (XSS)
- การโจมตีแบบ Injection
- ปัญหาความสมบูรณ์ของข้อมูล
- ข้อมูลที่ไม่ถูกต้อง

---

### ✅ 2. การจัดการ Authentication (Mock Mode)

**การนำไปใช้:**
- ไม่เก็บรหัสผ่านใน localStorage (mock authentication)
- ใช้ mock tokens สำหรับการยืนยันตัวตน
- ตรวจสอบ user ID จาก localStorage ก่อนการดำเนินการ
- ใช้ Protected Routes เพื่อจำกัดการเข้าถึง

**ตัวอย่างโค้ด:**
```javascript
// services/authService.js
export const authService = {
  register: async (userData) => {
    // ไม่เก็บรหัสผ่าน - mock mode
    const newUser = {
      id: generateId(),
      name: userData.name,
      email: userData.email.toLowerCase(),
      role: 'user',
      created_at: new Date().toISOString()
    };
    
    const users = getStoredUsers();
    users.push(newUser);
    saveUsers(users);
    
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return { user: newUser, token: 'mock-token-' + newUser.id };
  }
};
```

**ป้องกันจาก:**
- การเข้าถึงข้อมูลโดยไม่ได้รับอนุญาต
- การแก้ไขข้อมูลผู้อื่น
- การข้ามการตรวจสอบ authentication
- หมายเหตุ: นี่เป็น mock implementation - ต้องใช้ backend จริงสำหรับ production

---

### ✅ 3. การป้องกัน XSS (Cross-Site Scripting)

**การนำไปใช้:**
- ใช้ React's built-in XSS protection (auto-escaping)
- Sanitize ข้อมูลก่อนบันทึกลง localStorage
- หลีกเลี่ยง dangerouslySetInnerHTML
- ตรวจสอบและ sanitize URLs ก่อนแสดงผล

**การนำไปใช้:**
```javascript
// utils/sanitize.js
export const sanitizeInput = (input) => {
  if (!input) return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

// components/RecipeCard.jsx
const RecipeCard = ({ recipe }) => {
  // React auto-escapes โดย default
  return (
    <div>
      <h3>{recipe.title}</h3> {/* Safe */}
      <p>{recipe.ingredients}</p> {/* Safe */}
      {/* หลีกเลี่ยง dangerouslySetInnerHTML */}
    </div>
  );
};
```

**ป้องกันจาก:**
- Cross-Site Scripting (XSS) attacks
- การขโมยข้อมูลจาก localStorage
- การขโมย session/authentication state
- การแสดงเนื้อหาที่เป็นอันตราย

---

### ✅ 4. การตรวจสอบความเป็นเจ้าของ (Ownership Verification)

**การนำไปใช้:**
- ตรวจสอบ user_id จาก localStorage ก่อนการแก้ไข/ลบ
- ใช้ Protected Routes เพื่อจำกัดการเข้าถึง
- ตรวจสอบ authentication state ก่อนแสดงปุ่ม Edit/Delete
- ป้องกันการแก้ไขข้อมูลผู้อื่น

**การนำไปใช้:**
```javascript
// services/recipeService.js
export const updateRecipe = async (id, recipeData) => {
  const recipes = getStoredRecipes();
  const recipe = recipes.find(r => r.id === parseInt(id));
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // ตรวจสอบความเป็นเจ้าของ
  if (!currentUser || recipe.user_id !== currentUser.id) {
    throw new Error('Not authorized to update this recipe');
  }

  // ดำเนินการอัปเดต
  const index = recipes.findIndex(r => r.id === parseInt(id));
  recipes[index] = { ...recipes[index], ...recipeData };
  saveRecipes(recipes);
  return recipes[index];
};

// components/RecipeDetailPage.jsx
const RecipeDetailPage = () => {
  const { user } = useAuth();
  const isOwner = recipe.user_id === user?.id;
  
  return (
    <div>
      {isOwner && (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};
```

**ป้องกันจาก:**
- การแก้ไขข้อมูลโดยไม่ได้รับอนุญาต
- การลบข้อมูลผู้อื่น
- การเข้าถึงข้อมูลที่ไม่ได้รับอนุญาต
- Broken Access Control

---

### ✅ 5. การจัดการ localStorage อย่างปลอดภัย

**การนำไปใช้:**
- จำกัดข้อมูลที่จัดเก็บใน localStorage
- แยกข้อมูลตาม user_id เพื่อลดความเสี่ยง
- ตรวจสอบข้อมูลก่อนอ่านจาก localStorage
- จัดการข้อผิดพลาดเมื่อ localStorage เต็ม

**ตัวอย่างโค้ด:**
```javascript
// utils/storage.js
export const saveToLocalStorage = (key, data) => {
  try {
    const jsonData = JSON.stringify(data);
    
    // ตรวจสอบขนาดข้อมูล
    if (jsonData.length > 5 * 1024 * 1024) { // 5MB
      throw new Error('Data too large for localStorage');
    }
    
    localStorage.setItem(key, jsonData);
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      // localStorage เต็ม - ลบข้อมูลเก่า
      clearOldData();
      localStorage.setItem(key, jsonData);
    } else {
      throw error;
    }
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

// ลบข้อมูลเก่าที่ไม่ใช้งาน
const clearOldData = () => {
  // ลบข้อมูลที่เก่ากว่า 30 วัน
  const recipes = getFromLocalStorage('recipes') || [];
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const filtered = recipes.filter(r => 
    new Date(r.created_at) > thirtyDaysAgo
  );
  
  saveToLocalStorage('recipes', filtered);
};
```

**ประโยชน์:**
- ป้องกัน localStorage overflow
- จัดการข้อผิดพลาดอย่างเหมาะสม
- รักษาประสิทธิภาพของแอปพลิเคชัน
- ลดความเสี่ยงการสูญเสียข้อมูล
- หมายเหตุ: สำหรับ production ควรใช้ backend + database จริง

---

## สรุป

แพลตฟอร์มแชร์สูตรอาหารนี้นำมาตรการความปลอดภัยที่ครอบคลุมซึ่งสอดคล้องกับแนวทาง OWASP Top 10 และการปฏิบัติตาม PDPA อย่างเต็มที่ ช่องโหว่สำคัญสามประการที่จัดการคือ Broken Access Control, Cryptographic Failures (ในบริบทของ frontend) และ Cross-Site Scripting (XSS) โดยแต่ละรายการมีกลยุทธ์การบรรเทาที่แข็งแกร่ง กระแสข้อมูลของแพลตฟอร์มเคารพความเป็นส่วนตัวของผู้ใช้ผ่านการเก็บรวบรวมที่โปร่งใส การประมวลผลที่ปลอดภัย การจัดเก็บใน localStorage และการไม่แชร์กับบุคคลที่สาม รายการตรวจสอบความปลอดภัยรับประกันการป้องกันแบบหลายชั้นตั้งแต่การตรวจสอบข้อมูลป้อนเข้าไปจนถึงการจัดการ localStorage อย่างปลอดภัย หมายเหตุ: นี่เป็น mock implementation สำหรับ development - สำหรับ production ต้องใช้ backend API และ database จริงเพื่อความปลอดภัยที่เหมาะสม

---

**เวอร์ชันเอกสาร:** 1.0
**วันที่:** 24 พฤศจิกายน 2568
**สถานะ:** Final
**การปฏิบัติตาม PDPA:** เต็มรูปแบบ
**ครอบคลุม OWASP:** A01, A02, A03 (2021)
