# FindIt – Smart Lost & Found Portal

> A modern, responsive lost and found portal designed to reconnect people with their lost belongings quickly, securely, and smartly.

---

## 🌟 Key Features

### 1. Home Page
- **Hero Search Bar**: Quick search by keyword, category, and campus/city zone.
- **Impact Counter**: Live metrics showing total items reported, recovery rate (94.2%), and average turnaround time.
- **Recent Reports Feed**: Filterable feed displaying recently lost and found items.
- **How It Works**: 4-step visual workflow pipeline explaining the recovery process.
- **Category Explorer**: Direct shortcuts to popular categories (Electronics, Wallets, Keys, Documents, Jewelry, etc.).
- **Safe Handover Protocol**: Certified security desk exchange guidelines.

### 2. Login & Registration
- Tabbed interface for Sign In and Account Creation.
- Password visibility toggles & validation.
- **1-Click Instant Demo Logins**:
  - `Alex Rivera` (Student / Community Member)
  - `Officer Sarah Jenkins` (Campus Safety Officer / Administrator)

### 3. Report Lost Item
- **Step-by-step reporting wizard**:
  - Item details (title, category, brand, color, masked serial/IMEI).
  - Loss circumstances (date, time, zone, specific landmarks).
  - Distinguishing marks & description.
  - Image upload with drag & drop or catalog presets.
  - Urgency level selector (Normal, High, Critical) and optional cash reward offer.

### 4. Report Found Item
- Tailored for community finders and campus staff.
- Record found date, time, and safe custody location (e.g., *Campus Security Office Desk*).
- **Anti-Fraud Verification Question**: Set a secret question that only the real owner can answer before claiming the item.

### 5. Browse Items Directory
- Instant debounced search bar.
- Filters by Item Type (All, Lost, Found), Category, Location, and Cash Reward.
- Sorting by Most Recent, Highest Reward, and Urgency.
- **Grid View** and **List View** toggle.
- Active filter pill tags and quick-reset option.

### 6. Item Details Page
- High-resolution item photos.
- Metadata strip (Category, Brand, Color, Masked Serial).
- **AI Smart Match Engine**: High-confidence correlation card matching lost and found reports.
- **Claim Submission Modal**: Interactive modal to answer the verification question and attach proof.
- **Contact Reporter Modal**: Secure direct inquiry form.
- **Printable Notice Generator**: Generates formatted lost/found poster layout.

### 7. User Dashboard
- Profile summary with **Trust Score** badge.
- Tabbed manager:
  - **My Lost Reports**: Track status, edit, or mark as found.
  - **My Found Property**: Manage items turned in and view custody points.
  - **Claims & Verification**: Review answers from claimants, approve or reject claims.
  - **Saved Items**: Quick access to bookmarked reports.
  - **Notifications**: Alerts on AI match detections and claim status updates.

### 8. Admin Dashboard
- **Campus Safety Command Center** with real-time KPI cards.
- **Item Moderation Queue**: Table of all reports with Approve, Flag, and Delete actions.
- **AI Match Resolution Hub**: Bridge correlated Lost & Found pairs.
- **User Management**: Monitor community member trust scores and verification status.
- **Category & Zone Analytics**: Visual distribution charts and turnaround metrics.

---

## 🛠️ Technology Stack
- **Frontend Framework**: [React.js 18](https://react.dev/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: Modern Blue & White with Slate neutrals and vivid status accents.

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation & Run

1. Clone or open the repository:
   ```bash
   cd findit-lost-found
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```
   The output will be generated in the `dist` directory.

---

## 📄 License
This project is licensed under the MIT License.
