# Panduan Deploy ke Vercel (Domain Gratis)

Ikuti langkah-langkah ini untuk mendapatkan domain gratis (contoh: `undangan-kita.vercel.app`) dan menghubungkan website ke Google Sheets.

## 1. Persiapan Google Sheets
1. Buat Google Sheet baru.
2. Beri nama sheet pertama: `RSVP`.
3. Tambahkan header di baris pertama: `Timestamp`, `Nama`, `Kehadiran`, `Jumlah Tamu`, `Pesan`, `Diundang Sebagai`.
4. Buat sheet kedua: `Broadcast`.
5. Tambahkan header: `Nama`, `No WhatsApp`, `Status`.

## 2. Mendapatkan API Key (Service Account)
1. Buka [Google Cloud Console](https://console.cloud.google.com/).
2. Buat proyek baru.
3. Aktifkan **Google Sheets API**.
4. Buka menu **IAM & Admin** > **Service Accounts**.
5. Buat Service Account baru, unduh file **JSON Key**.
6. Salin `client_email` dari file JSON tersebut.
7. **PENTING**: Share Google Sheet Anda ke email tersebut dengan akses "Editor".

## 3. Deploy ke Vercel
1. Upload kode ini ke **GitHub**.
2. Login ke [Vercel](https://vercel.com/) dan hubungkan akun GitHub Anda.
3. Pilih repository proyek ini.
4. Di bagian **Environment Variables**, tambahkan:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: (Email dari file JSON)
   - `GOOGLE_PRIVATE_KEY`: (Isi `private_key` dari file JSON)
   - `GOOGLE_SHEET_ID`: `1g4zLP8Lwpj7dit2QDcaOys_0-B4Fx7c0YX7WP0V0cxY`
5. Klik **Deploy**.

## 4. Hasil Akhir
Setelah deploy selesai, Vercel akan memberikan domain gratis (contoh: `https://undangan-saya.vercel.app`).
- **Undangan Tamu**: `https://domain-anda.vercel.app/Nama-Tamu`
- **Dashboard Admin**: `https://domain-anda.vercel.app/admin/login` (User: `admin`, Pass: `admin123`)
