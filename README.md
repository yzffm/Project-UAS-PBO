# 🌍 TravelPlanner — Tugas UAS Pemrograman Berorientasi Objek

<div align="center">

![Java](https://img.shields.io/badge/Java-21_LTS-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.10-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Aplikasi perencanaan perjalanan berbasis web (full-stack) yang dikembangkan sebagai Tugas Akhir (UAS) mata kuliah Pemrograman Berorientasi Objek.**

Universitas Negeri Surabaya · S1 Teknik Informatika · 2025

</div>

---

## 📋 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Anggota Kelompok](#-anggota-kelompok)
- [Tech Stack](#️-tech-stack)
- [Konsep OOP yang Diimplementasikan](#-konsep-oop-yang-diimplementasikan)
- [Arsitektur Sistem](#️-arsitektur-sistem)
- [Struktur Project](#-struktur-project)
- [Fitur Aplikasi](#-fitur-aplikasi)
- [API Endpoints](#-api-endpoints)
- [Cara Menjalankan](#-cara-menjalankan)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Laporan](#-laporan)

---

## 🧭 Tentang Project

**TravelPlanner** adalah platform perencanaan perjalanan berbasis web yang memungkinkan pengguna untuk:

- Membuat rencana perjalanan berdasarkan tipe (Solo, Grup, atau Keluarga)
- Menyusun itinerary harian dengan destinasi wisata
- Mengelola anggaran perjalanan per kategori (transportasi, akomodasi, konsumsi, lainnya)
- Melihat ringkasan budget dengan visualisasi grafik

Project ini dibangun dengan arsitektur **MVC (Model-View-Controller)** dan menerapkan berbagai prinsip serta pola desain **Pemrograman Berorientasi Objek** secara nyata dalam konteks aplikasi web modern.

---

## 👥 Anggota Kelompok

| No | Nama | NIM | Peran |
|----|------|-----|-------|
| 1 | Yusuf Maulana Arrosyid | 25051204426 | Lead Developer · Full Stack · Dokumentasi |
| 2 | Reivandani Aji Prakoso | 25051204422 | Frontend Developer · Dokumentasi |
| 3 | Ayesha Humayra Nadra Rafianti | 25051204430 | Frontend Developer · Laporan |
| 4 | Daffa Maulana Putra Hanayu | 25051204425 | Backend Developer · Video |
| 5 | Rendy Nur Jamal Prasetyo | 25051204435 | Backend Developer |
| 6 | Celvin Saputra Pratama | 25051204439 | Frontend Developer |
| 7 | Siska Nur Fauziah | 25051204440 | Frontend Developer · Laporan |

---

## 🛠️ Tech Stack

### Backend
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Java | 21 LTS | Bahasa pemrograman utama |
| Spring Boot | 3.3.4 | Framework backend (Web, JPA, Security, Validation) |
| PostgreSQL | 15.x | Database (hosted di Supabase) |
| JJWT | 0.12.6 | JSON Web Token untuk autentikasi |
| Maven | 3.x | Build tool & dependency management |

### Frontend
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| React | 18.3.1 | UI Library |
| Vite | 5.4.2 | Build tool & dev server |
| Tailwind CSS | 3.4.10 | Styling utility-first |
| Axios | 1.7.5 | HTTP client |
| React Router DOM | 6.26.1 | Client-side routing |
| Recharts / Chart.js | Latest | Visualisasi data budget |
| Lucide React | 0.438.0 | Icon library |

---

## 🎓 Konsep OOP yang Diimplementasikan

Project ini secara eksplisit mendemonstrasikan konsep-konsep inti OOP dalam kode yang berjalan nyata.

### 1. 🔗 Inheritance (Pewarisan)

Tiga hierarki class utama yang saling mewarisi:

```
Perjalanan (abstract)
├── PerjalananSolo       → moodPerjalanan, modeHemat
├── PerjalananGrup       → jumlahPeserta, namaGrup, temaGrup
└── PerjalananKeluarga   → jumlahDewasa, jumlahAnak, adaLansia, adaBalita

Destinasi (abstract)
├── WisataAlam           → jenisAlam, tingkatKesulitan, perluGuide, musimTerbaik
├── WisataBudaya         → jenisBudaya, periodeBudaya, adaPemandu, dresscode
└── WisataKuliner        → jenisKuliner, masakan, rentangHarga, halalCertified

AnggaranItem (abstract)
├── AnggaranTransportasi → modeTransportasi, asal, tujuan, tanggalKeberangkatan
├── AnggaranAkomodasi    → namaHotel, tipeKamar, jumlahMalam, hargaPerMalam
├── AnggaranKonsumsi     → waktuMakan, jumlahOrang
└── AnggaranLainnya      → subKategori
```

Semua class menggunakan strategi **SINGLE_TABLE inheritance** di JPA dengan discriminator column.

### 2. 🔄 Polymorphism (Polimorfisme)

Setiap subclass mengoverride method abstract dari superclass-nya. Contoh pada `Perjalanan`:

```java
// Superclass mendefinisikan kontrak
public abstract String getTipePerjalanan();
public abstract String getBadgeWarna();
public abstract double hitungBiayaPerOrang(double totalBiaya);

// Setiap subclass mengimplementasikan secara berbeda
// PerjalananSolo  → "Solo Trip", "blue", return totalBiaya
// PerjalananGrup  → "Group Trip", "green", return totalBiaya / jumlahPeserta
// PerjalananKeluarga → "Family Trip", "orange", return (totalBiaya * 0.9) / totalAnggota
```

### 3. 🔒 Encapsulation (Enkapsulasi)

Semua field bersifat `private` dengan setter yang memiliki validasi logika bisnis:

```java
// Contoh di AnggaranItem.java
public void setEstimasiHarga(Double estimasiHarga) {
    if (estimasiHarga != null && estimasiHarga < 0) {
        throw new IllegalArgumentException("Estimasi harga tidak boleh negatif");
    }
    this.estimasiHarga = estimasiHarga;
}

// Contoh di Perjalanan.java
public void setTanggalSelesai(LocalDate tanggalSelesai) {
    if (tanggalSelesai != null && tanggalMulai != null 
        && tanggalSelesai.isBefore(tanggalMulai)) {
        throw new IllegalArgumentException("Tanggal selesai harus setelah tanggal mulai");
    }
    this.tanggalSelesai = tanggalSelesai;
}
```

### 4. 🏭 Design Patterns

#### Factory Pattern
`PerjalananFactory` dan `AnggaranFactory` memusatkan logika pembuatan objek. Menambah tipe baru hanya butuh 1 case baru (OCP — Open/Closed Principle).

```java
// PerjalananFactory.java
public static Perjalanan create(String tipe, PerjalananRequestDTO dto) {
    return switch (tipe.toUpperCase()) {
        case "SOLO"     -> buildSolo(dto);
        case "GRUP"     -> buildGrup(dto);
        case "KELUARGA" -> buildKeluarga(dto);
        default -> throw new IllegalArgumentException("Tipe tidak dikenal: " + tipe);
    };
}
```

#### Builder Pattern
Setiap subclass `Perjalanan` mengimplementasikan inner `Builder` class untuk konstruksi objek yang kompleks dan aman:

```java
Perjalanan trip = new PerjalananSolo.Builder()
    .namaTrip("Solo ke Bromo")
    .tanggalMulai(LocalDate.of(2025, 8, 1))
    .tanggalSelesai(LocalDate.of(2025, 8, 3))
    .moodPerjalanan("Healing")
    .modeHemat(true)
    .build();
```

#### Strategy Pattern
`BudgetStrategy` memisahkan algoritma kalkulasi budget berdasarkan tipe perjalanan:

```
BudgetStrategy (interface)
├── StandardBudgetStrategy  → untuk PerjalananSolo (kalkulasi standar)
├── GrupBudgetStrategy      → untuk PerjalananGrup (dibagi per peserta)
└── KeluargaBudgetStrategy  → untuk PerjalananKeluarga (+20% family buffer)
```

`BudgetStrategyFactory` memilih strategy yang tepat secara otomatis menggunakan `instanceof` pada runtime.

### 5. 📐 Interface Segregation (SOLID - ISP)

Dua interface terpisah yang fokus pada satu concern:

```java
// Kategorisasi.java — untuk Destinasi
public interface Kategorisasi {
    String getKategori();
    String getIconKategori();
}

// Kalkulasi.java — untuk AnggaranItem
public interface Kalkulasi {
    Double getSelisih();
    String getStatusBudget(); // "OVER", "UNDER", "ON_TRACK"
}
```

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (React)                   │
│  Pages → Components → Services (Axios) → API        │
│  React Router DOM | Tailwind CSS | Chart.js         │
└─────────────────────┬───────────────────────────────┘
                      │ HTTP REST (JSON)
                      │ JWT Bearer Token
┌─────────────────────▼───────────────────────────────┐
│                BACKEND (Spring Boot)                 │
│  Controller → Service → Repository → Entity         │
│                                                      │
│  Security: JWT Filter → Spring Security              │
│  Patterns: Factory | Builder | Strategy              │
└─────────────────────┬───────────────────────────────┘
                      │ JPA / Hibernate
                      │ SINGLE_TABLE Inheritance
┌─────────────────────▼───────────────────────────────┐
│            DATABASE (PostgreSQL - Supabase)          │
│  Tables: users | trips | destinasi | hari_perjalanan │
│          jadwal_destinasi | anggaran_item            │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Struktur Project

```
Project-UAS-PBO/
├── backend/
│   ├── src/main/java/com/travelplanner/
│   │   ├── config/              # SecurityConfig, JwtFilter, CorsConfig
│   │   ├── controller/          # REST Controllers
│   │   ├── dto/
│   │   │   ├── request/         # DTO masuk (RegisterRequestDTO, dll)
│   │   │   └── response/        # DTO keluar (PerjalananResponseDTO, dll)
│   │   ├── exception/           # GlobalExceptionHandler, custom exceptions
│   │   ├── factory/             # PerjalananFactory, AnggaranFactory
│   │   ├── model/
│   │   │   ├── base/            # Abstract: Perjalanan, Destinasi, AnggaranItem
│   │   │   ├── perjalanan/      # Subclass: Solo, Grup, Keluarga
│   │   │   ├── destinasi/       # Subclass: WisataAlam, WisataBudaya, WisataKuliner
│   │   │   ├── anggaran/        # Subclass: Transportasi, Akomodasi, Konsumsi, Lainnya
│   │   │   └── enums/           # StatusTrip
│   │   ├── repository/          # Spring Data JPA Repositories
│   │   ├── service/             # Business Logic
│   │   ├── strategy/            # BudgetStrategy, BudgetStrategyFactory
│   │   └── util/                # JwtUtil, DataSeeder
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── .env.example
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── budget/          # BudgetForm, BudgetTable, BudgetSummaryChart
│   │   │   ├── common/          # Navbar, Footer, LoadingSpinner, ProtectedRoute
│   │   │   ├── destination/     # DestinationCard, CategoryFilter
│   │   │   ├── itinerary/       # DayCard, ScheduleItem, DestinationScheduleModal
│   │   │   └── trip/            # TripCard, TripTypeSelector, EditTripModal, StatusBadge
│   │   ├── context/             # AuthContext (JWT state management)
│   │   ├── pages/               # Semua halaman (Landing, Dashboard, TripDetail, dll)
│   │   ├── services/            # Axios API calls (authService, tripService, dll)
│   │   └── utils/               # formatDate, formatCurrency
│   ├── .env.example
│   ├── vite.config.js
│   └── package.json
│
├── docs/
│   └── laporan-uas-pbo.pdf      # Laporan lengkap
│
├── .gitignore
└── README.md
```

---

## ✨ Fitur Aplikasi

### 🔐 Autentikasi
- Register & Login dengan JWT Bearer Token
- Protected routes (halaman terlindungi tanpa login)
- Persistent session via localStorage
- Update profil (nama, email, password)

### ✈️ Manajemen Perjalanan (Trip)
- **Buat trip** dengan 3 tipe: Solo, Grup (min. 2 orang), atau Keluarga
- Field khusus per tipe (mood, nama grup, jumlah anggota keluarga, dll)
- **Edit & hapus** rencana perjalanan
- Status otomatis: `PLANNED`, `ONGOING`, `COMPLETED`
- Kalkulasi durasi hari otomatis dari tanggal mulai–selesai

### 🗓️ Itinerary Harian
- Tambah hari perjalanan (dibatasi sesuai durasi trip)
- Susun jadwal destinasi per hari dengan jam mulai & selesai
- Validasi jadwal bertabrakan (overlap detection)
- Edit & hapus jadwal

### 🗺️ Eksplorasi Destinasi
- Data 15 destinasi pre-seeded: 5 alam, 5 budaya, 5 kuliner
- Filter berdasarkan kategori (Alam / Budaya / Kuliner)
- Pencarian real-time berdasarkan nama
- Halaman detail destinasi dengan tips kunjungan
- Field subclass spesifik (tingkat kesulitan, dresscode, halal certified, dll)

### 💰 Manajemen Anggaran
- 4 kategori: Transportasi 🚗, Akomodasi 🏨, Konsumsi 🍽️, Lainnya 📦
- Input estimasi & pengeluaran aktual
- Status per item: Lunas / Belum Lunas
- **Strategy Pattern** untuk kalkulasi otomatis:
  - Solo → total standar
  - Grup → otomatis dibagi jumlah peserta
  - Keluarga → +20% family buffer, dibagi per dewasa
- Status budget: `UNDER_BUDGET` / `ON_TRACK` / `OVER_BUDGET`

### 📊 Budget Summary
- Visualisasi Donut Chart proporsi estimasi per kategori
- Perbandingan estimasi vs aktual
- Kalkulasi biaya per orang untuk trip Grup & Keluarga

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| POST | `/api/auth/register` | Daftar akun baru | ❌ |
| POST | `/api/auth/login` | Login & dapatkan token | ❌ |
| GET | `/api/auth/me` | Data user yang login | ✅ |

### Trips
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/trips` | List semua trip milik user | ✅ |
| POST | `/api/trips` | Buat trip baru | ✅ |
| GET | `/api/trips/{id}` | Detail trip by ID | ✅ |
| PUT | `/api/trips/{id}` | Update trip | ✅ |
| DELETE | `/api/trips/{id}` | Hapus trip | ✅ |

### Itinerary
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/trips/{tripId}/days` | List hari perjalanan | ✅ |
| POST | `/api/trips/{tripId}/days` | Tambah hari | ✅ |
| PUT | `/api/trips/{tripId}/days/{dayId}` | Update hari | ✅ |
| DELETE | `/api/trips/{tripId}/days/{dayId}` | Hapus hari | ✅ |
| POST | `/api/trips/{tripId}/days/{dayId}/schedule` | Tambah jadwal destinasi | ✅ |
| PUT | `/api/trips/{tripId}/days/{dayId}/schedule/{id}` | Edit jadwal | ✅ |
| DELETE | `/api/trips/{tripId}/days/{dayId}/schedule/{id}` | Hapus jadwal | ✅ |

### Budget
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/trips/{tripId}/budget` | List item anggaran | ✅ |
| POST | `/api/trips/{tripId}/budget` | Tambah item anggaran | ✅ |
| PUT | `/api/trips/{tripId}/budget/{itemId}` | Update item | ✅ |
| DELETE | `/api/trips/{tripId}/budget/{itemId}` | Hapus item | ✅ |
| GET | `/api/trips/{tripId}/budget/summary` | Ringkasan & kalkulasi budget | ✅ |

### Destinasi
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/destinasi` | List destinasi (filter: `?tipe=ALAM&q=bromo`) | ❌ |
| GET | `/api/destinasi/{id}` | Detail destinasi | ❌ |

### Lainnya
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/health` | Health check server | ❌ |
| PUT | `/api/users/me` | Update profil user | ✅ |

---

## 🚀 Cara Menjalankan

### Prasyarat

Pastikan sudah terinstal:
- **Java 21** (`java -version`)
- **Maven 3.x** (`mvn -version`)
- **Node.js 18+** (`node -v`)
- **npm** (`npm -v`)
- Akun **Supabase** (untuk database PostgreSQL)

### 1. Clone Repository

```bash
git clone https://github.com/yzffm/Project-UAS-PBO.git
cd Project-UAS-PBO
```

### 2. Setup Backend

```bash
cd backend
```

Buat file `.env` berdasarkan `.env.example`:

```bash
cp .env.example .env
```

Isi file `.env` dengan kredensial Supabase:

```env
DB_URL=jdbc:postgresql://aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?prepareThreshold=0
DB_USERNAME=postgres.YOUR_PROJECT_REF
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_DRIVER=org.postgresql.Driver
JWT_SECRET=your_secret_key_minimum_256_bits_long_here
```

Jalankan backend:

```bash
mvn spring-boot:run
```

Backend berjalan di → `http://localhost:8080`

> **Catatan:** Saat pertama kali dijalankan, `DataSeeder` akan otomatis mengisi tabel `destinasi` dengan 15 data destinasi wisata.

### 3. Setup Frontend

```bash
cd ../frontend
```

Buat file `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Install dependencies dan jalankan:

```bash
npm install
npm run dev
```

Frontend berjalan di → `http://localhost:5173`

### 4. Akses Aplikasi

Buka browser dan kunjungi `http://localhost:5173`, lalu daftar akun baru untuk mulai menggunakan aplikasi.

---

## ⚙️ Konfigurasi Environment

### Backend (`backend/.env`)

```env
# Database Supabase (Transaction Pooler - IPv4)
DB_URL=jdbc:postgresql://aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?prepareThreshold=0
DB_USERNAME=postgres.YOUR_PROJECT_REF
DB_PASSWORD=YOUR_PASSWORD
DB_DRIVER=org.postgresql.Driver

# JWT (minimal 256-bit / 32 karakter)
JWT_SECRET=ini_adalah_secret_key_yang_panjang_dan_aman_minimal_32_karakter
```

### Frontend (`frontend/.env.local`)

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 📄 Laporan

Laporan lengkap Tugas UAS tersedia di:

📥 **[`docs/Laporan UAS PBO Kelompok 1_TravelPlanner.pdf`](./docs/Laporan UAS PBO Kelompok 1_TravelPlanner.pdf)**

Laporan mencakup:
- BAB 1: Pendahuluan (Latar Belakang, Rumusan Masalah, Tujuan)
- BAB 2: Landasan Teori (OOP, Design Patterns, Spring Boot, React)
- BAB 3: Implementasi & Pembahasan (Class Diagram, Kode, Screenshot)

---

## 📜 Lisensi

Project ini dibuat untuk keperluan akademik mata kuliah **Pemrograman Berorientasi Objek** — Program Studi S1 Teknik Informatika, Universitas Negeri Surabaya (UNESA).

---

<div align="center">

Dibuat dengan ❤️ oleh Kelompok 1 · Informatika 2025 I · UNESA

</div>
