# MahasigMind MVP - Dokumentasi

## Deskripsi Singkat
MahasigMind adalah platform kesehatan mental untuk mahasiswa yang memungkinkan mahasiswa mencatat mood harian, menulis jurnal, dan mengajukan permintaan konsultasi dengan psikolog. Aplikasi ini juga menyediakan dashboard psikolog untuk mengelola permintaan konsultasi.

## Cara Menjalankan Aplikasi

### Prasyarat
- Node.js (v18+)
- MongoDB (lokal atau Atlas)
- Google OAuth Credentials

### 1. Setup Backend

```bash
cd backend
npm install
```

Buat file `.env` di folder `backend` dengan isi:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mahasigmind
# atau MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/mahasigmind

JWT_SECRET=your_jwt_secret_key_here
FRONTEND_ORIGIN=http://localhost:5173

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Jalankan backend:

```bash
npm run dev
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`.

### 3. Seeding Akun Psikolog (Opsional)

Untuk testing, Anda bisa membuat akun psikolog secara manual di MongoDB:

```javascript
db.users.insertOne({
  name: "Dr. Psikolog",
  email: "psikolog@mahasigmind.id",
  googleId: null, // atau biarkan kosong
  role: "psychologist",
  createdAt: new Date(),
  lastLoginAt: new Date()
})
```

Atau, saat login pertama kali dengan Google, ubah `role` user tersebut di database menjadi `"psychologist"`.

## Alur Demo MVP

### Untuk Mahasiswa:

1. **Login dengan Google**
   - Klik "Masuk dengan Google" di halaman login
   - Pilih akun Google
   - Setelah auth berhasil, user akan di-redirect ke `/home`

2. **Isi Mood Harian**
   - Di halaman Home, klik salah satu emoji mood
   - Animasi burst akan muncul
   - Mood tersimpan di database untuk user dan tanggal hari ini

3. **Tulis Jurnal**
   - Klik tombol "Jurnal Harian" dari Home atau navigasi
   - Klik "Tulis Jurnal"
   - Isi form (judul, kategori, konten)
   - Klik "Simpan"
   - Jurnal muncul di list

4. **Ajukan Konsultasi**
   - Klik tombol "Chat Psikolog" atau navigasi "Chat Psikolog"
   - Isi form konsultasi (kategori, waktu preferensi, deskripsi)
   - Klik "Kirim Permintaan"
   - Permintaan tersimpan dan tampil di "Riwayat Permintaan"

5. **Navigasi**
   - Semua menu utama (Beranda, Chat, Jurnal) dapat diakses dari header/desktop dan drawer/mobile

6. **404 Page**
   - Coba akses route yang tidak ada, misal `/random-page`
   - Halaman 404 custom akan muncul dengan tombol "Kembali ke Beranda"

### Untuk Psikolog:

1. **Login**
   - Login dengan akun yang memiliki `role: "psychologist"` di database

2. **Akses Dashboard Psikolog**
   - Dari header atau drawer, klik "Dashboard Psikolog"
   - Lihat ringkasan mood global (7 hari terakhir)
   - Lihat daftar permintaan konsultasi dari mahasiswa

3. **Kelola Permintaan Konsultasi**
   - Klik "Proses" untuk mengubah status menjadi "Diproses"
   - Klik "Selesai" untuk menandai permintaan sebagai "Selesai"

## Fitur yang Ada (MVP)

✅ **Autentikasi**
- Login dengan Google OAuth
- JWT-based authentication
- Role-based access (student/psychologist)

✅ **Mood Tracker**
- Mahasiswa bisa mencatat mood harian
- Animasi emoji burst
- Status "sudah tercatat" untuk hari ini

✅ **Journaling**
- CRUD jurnal harian dengan kategori
- List view dengan pagination
- Delete jurnal

✅ **Konsultasi**
- Mahasiswa bisa mengajukan permintaan konsultasi
- Psikolog bisa melihat dan mengubah status permintaan

✅ **Dashboard Psikolog**
- Ringkasan mood global (agregat 7 hari)
- Daftar permintaan konsultasi
- Update status konsultasi

✅ **UI/UX**
- Responsive (mobile & desktop)
- Halodoc-style design
- Footer global
- Custom 404 page

## Batasan MVP

⚠️ **Fitur yang Belum Ada atau Masih Sederhana:**

- **Panel Admin UI**: Belum ada UI untuk admin mengelola user atau data lain
- **Insight Mood**: Mood summary masih sederhana (hanya agregat jumlah)
- **Chat Real-time**: Belum ada chat real-time dengan psikolog, hanya form konsultasi
- **Notifikasi**: Belum ada notifikasi push atau email
- **Edit Konsultasi**: Mahasiswa belum bisa edit atau cancel permintaan konsultasi setelah dikirim
- **Edit Journal**: Belum ada fitur edit jurnal (hanya create dan delete)
- **Izin Jurnal untuk Psikolog**: Fitur untuk mahasiswa memberikan izin psikolog membaca jurnal tertentu belum diimplementasikan
- **Artikel Detail**: Artikel masih placeholder, belum ada content management
- **Search/Filter**: Belum ada search atau filter di jurnal dan konsultasi

## Keamanan

- ✅ Semua endpoint mood, jurnal, dan konsultasi mengecek autentikasi JWT
- ✅ Endpoint psikolog mengecek role user (harus `psychologist`)
- ✅ Password di-hash dengan bcryptjs (untuk auth email/password di masa depan)
- ✅ Tidak ada credential hardcoded di kode (semua via `.env`)

## Teknologi

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Passport.js (Google OAuth)
- Zod (validation)

**Frontend:**
- React + Vite
- Tailwind CSS v4
- React Router v7
- Axios

## Environment Variables (Ringkasan)

### Backend (`.env`):
```
PORT=5000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_secret_key>
FRONTEND_ORIGIN=http://localhost:5173
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
```

### Frontend:
Tidak ada env variables wajib untuk MVP ini (semua config di kode).

## Troubleshooting

**Backend tidak konek ke MongoDB:**
- Pastikan MongoDB berjalan (jika lokal) atau connection string Atlas benar
- Cek `.env` file ada dan variabel `MONGO_URI` terisi

**Google Login tidak bekerja:**
- Pastikan `GOOGLE_CLIENT_ID` dan `GOOGLE_CLIENT_SECRET` sudah diset di `.env`
- Pastikan redirect URI di Google Console adalah `http://localhost:5000/api/auth/google/callback`

**Frontend tidak bisa akses backend:**
- Pastikan backend berjalan di `http://localhost:5000`
- Cek CORS setting di backend

---

**Kontak:**
Untuk pertanyaan atau masalah, hubungi tim MahasigMind di `support@mahasigmind.id`.
