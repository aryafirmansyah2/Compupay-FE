# CompuPay FE

CompuPay FE adalah aplikasi frontend berbasis Next.js yang digunakan untuk mengelola sistem HR dan payroll karyawan. Aplikasi ini menyediakan fitur manajemen karyawan, department, position, allowance, deduction, payroll, salary slip, attendance, point record, dan leave request.

Project ini dibuat sebagai bagian dari aplikasi CompuPay, yaitu sistem pengelolaan data karyawan, absensi, poin kehadiran, dan penggajian.

## Tech Stack

Project ini menggunakan teknologi berikut:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Axios
- React Hook Form
- Zod
- TanStack React Table
- React Hot Toast
- Lucide React
- js-cookie
- date-fns

## Fitur Utama

### Authentication

- Login menggunakan email dan password.
- Menyimpan access token pada cookie.
- Redirect halaman berdasarkan role user.
- Middleware request otomatis menambahkan token ke header Authorization.

### Employee Management

- Menampilkan daftar karyawan.
- Menambah data karyawan.
- Mengubah data karyawan.
- Menghapus data karyawan.
- Menampilkan detail karyawan.
- Mengelola informasi department, position, salary, role, status, dan join date.

### Department Management

- Menampilkan daftar department.
- Menambah department.
- Mengubah department.
- Menghapus department.
- Mengelola rentang salary pada department.

### Position Management

- Menampilkan daftar position.
- Menambah position.
- Mengubah position.
- Menghapus position.
- Menghubungkan position dengan department.

### Allowance Management

- Menampilkan master allowance.
- Menambah allowance.
- Mengubah allowance.
- Menghapus allowance.
- Menampilkan employee allowance.
- Menambah employee allowance.
- Mengubah employee allowance.
- Menghapus employee allowance.

### Deduction Management

- Menampilkan master deduction.
- Menambah deduction.
- Mengubah deduction.
- Menghapus deduction.
- Menampilkan employee deduction.
- Menambah employee deduction.
- Mengubah employee deduction.
- Menghapus employee deduction.

### Payroll Management

- Menampilkan daftar payroll.
- Membuat payroll.
- Melihat detail payroll.
- Menghapus payroll.
- Mengubah status payroll.
- Payroll hanya dapat diubah statusnya ketika masih berstatus PENDING.
- Status payroll yang dapat dipilih adalah PAID atau CANCELED.

### Salary Slip

- Menampilkan salary slip untuk user.
- User dengan role USER hanya melihat salary slip miliknya sendiri.
- Salary slip mengambil data dari payroll.

### Attendance

- Menampilkan daftar attendance.
- Mendukung data check-in dan check-out.
- Menampilkan status attendance seperti ON_TIME, LATE, dan EARLY.
- Terintegrasi dengan point record dari hasil check-in.

### Point Record

- Menampilkan daftar point record.
- Admin dan Super Admin dapat melihat seluruh point record.
- User hanya dapat melihat point record miliknya sendiri.
- Admin dan Super Admin dapat mengubah dan menghapus point record.

### Leave Request

- Menampilkan daftar pengajuan izin.
- User dapat membuat pengajuan izin.
- Admin dapat melihat dan mengelola data leave request.
- Mendukung tipe izin seperti CUTI dan SAKIT.

## Role Akses

Aplikasi ini menggunakan role untuk membatasi akses menu dan fitur.

| Role        | Akses                                                           |
| ----------- | --------------------------------------------------------------- |
| SUPER_ADMIN | Dapat mengakses seluruh fitur admin                             |
| ADMIN       | Dapat mengakses fitur manajemen HR dan payroll                  |
| USER        | Dapat mengakses fitur user seperti salary slip dan data pribadi |

## Struktur Folder

Struktur folder utama project:

txt src/ ├─ app/ │ ├─ (auth)/ │ │ └─ login/ │ ├─ (admin)/ │ │ ├─ employee/ │ │ ├─ department/ │ │ ├─ position/ │ │ ├─ allowance/ │ │ ├─ deduction/ │ │ ├─ payroll/ │ │ ├─ salary-slip/ │ │ ├─ attendance/ │ │ ├─ point-record/ │ │ ├─ leave-request/ │ │ └─ profile/ │ ├─ components/ │ ├─ custom/ │ ├─ layout/ │ └─ ui/ │ ├─ config/ │ └─ routes.ts │ ├─ lib/ │ ├─ types/ │ └─ utils/

## Struktur Page

Setiap fitur utama biasanya memiliki pola struktur seperti berikut:

txt src/app/(admin)/nama-fitur/ ├─ page.tsx └─ \_components/ ├─ column-table-nama-fitur.tsx ├─ dialog-form-nama-fitur.tsx └─ dialog-detail-nama-fitur.tsx

Contoh pada fitur payroll:

txt src/app/(admin)/payroll/ ├─ page.tsx └─ \_components/ ├─ column-table-payroll.tsx ├─ dialog-form-payroll.tsx ├─ dialog-detail-payroll.tsx └─ dialog-update-payroll-status.tsx

## Instalasi Project

Clone repository:

bash git clone https://github.com/aryafirmansyah2/Compupay-FE.git

Masuk ke folder project:

bash cd Compupay-FE

Install dependency:

bash npm install

Jika terjadi conflict dependency, gunakan:

bash npm install --legacy-peer-deps

## Konfigurasi Environment

Buat file .env.local di root project.

Contoh isi file:

env NEXT_PUBLIC_BASE_URL=http://localhost:3000

Keterangan:

| Variable             | Fungsi               |
| -------------------- | -------------------- |
| NEXT_PUBLIC_BASE_URL | Base URL backend API |

Contoh jika backend berjalan pada port 3000:

env NEXT_PUBLIC_BASE_URL=http://localhost:3000

## Menjalankan Project

Jalankan development server:

bash npm run dev

Aplikasi akan berjalan pada:

txt http://localhost:3001

Port dapat berbeda tergantung konfigurasi lokal.

## Build Project

Untuk melakukan build production:

bash npm run build

Untuk menjalankan hasil build:

bash npm run start

## Linting

Untuk menjalankan lint:

bash npm run lint

## API Base URL

Seluruh request API menggunakan helper Axios pada file:

txt src/utils/request.tsx

Request akan otomatis menambahkan token dari cookie:

txt Authorization: Bearer <token>

Contoh penggunaan:

ts const res = await request.get("/payroll", { search, });

Contoh request update payroll status:

ts await request.put(`/payroll/${id}`, { status: "PAID", });

## Cookie yang Digunakan

Aplikasi menggunakan cookie untuk menyimpan data login.

| Cookie        | Fungsi                      |
| ------------- | --------------------------- |
| token         | Access token user           |
| refresh_token | Refresh token jika tersedia |
| role          | Role user                   |
| position      | Position user               |

## Routing Menu

Konfigurasi sidebar menu berada pada file:

txt src/config/routes.ts

Contoh item route:

ts { title: "Payroll", url: "/payroll", icon: CircleDollarSign, roles: ["SUPER_ADMIN", "ADMIN"], }

Menu akan tampil berdasarkan role user yang tersimpan pada cookie.

## Toast Notification

Project menggunakan react-hot-toast untuk notifikasi.

Pastikan root layout memiliki:

tsx import { Toaster } from "react-hot-toast";

dan komponen:

tsx <Toaster position="top-center" />

Contoh penggunaan:

ts toast.success("Data updated successfully"); toast.error("Failed to update data");

## Delete Confirmation

Komponen konfirmasi delete berada pada:

txt src/components/custom/our-toast.tsx

Komponen ini digunakan untuk konfirmasi hapus data pada beberapa fitur seperti employee, payroll, allowance, deduction, dan point record.

Contoh penggunaan:

tsx toast( (t) => ( <DeleteToastConfirm t={t} entityName="payroll" itemName={item.ref_no} onConfirm={async () => { await request.delete(`/payroll/${item.id}`); fetchData(); }} /> ), { duration: 8000, position: "top-center", }, );

## Alur Login

1. User memasukkan email dan password.
2. Frontend mengirim request ke backend.
3. Backend mengembalikan access token dan data role.
4. Token dan role disimpan ke cookie.
5. User diarahkan ke halaman sesuai role.

Contoh redirect:

| Role        | Redirect     |
| ----------- | ------------ |
| SUPER_ADMIN | /employee    |
| ADMIN       | /employee    |
| USER        | /salary-slip |

## Payroll Status Flow

Status payroll yang digunakan:

| Status   | Keterangan                    |
| -------- | ----------------------------- |
| PENDING  | Payroll masih menunggu proses |
| PAID     | Payroll sudah dibayar         |
| CANCELED | Payroll dibatalkan            |

Rule update payroll:

- Payroll hanya dapat diubah jika status masih PENDING.
- Status hanya dapat diubah menjadi PAID atau CANCELED.
- Jika payroll sudah PAID atau CANCELED, tombol update status tidak ditampilkan.

## Branch Git

Contoh workflow branch:

bash git checkout dev git pull origin dev --rebase git add . git commit -m "update payroll status flow" git push origin dev

Jika push ditolak karena branch lokal tertinggal:

bash git pull origin dev --rebase git push origin dev

## Akun Testing

Contoh akun testing dari seed backend:

| Role        | Email                | Password |
| ----------- | -------------------- | -------- |
| SUPER_ADMIN | superadmin@gmail.com | admin123 |
| ADMIN       | hr@gmail.com         | admin123 |
| USER        | employee@gmail.com   | admin123 |
| USER        | jane@gmail.com       | admin123 |

## Catatan Development

Beberapa hal yang perlu diperhatikan saat development:

- Jangan commit folder .next.
- Jangan commit folder node_modules.
- Jangan commit file .env.local.
- Gunakan endpoint yang sesuai dengan backend.
- Gunakan request.get("/endpoint", { search }) daripada query string manual.
- Gunakan role-based UI agar tombol tertentu tidak tampil untuk role yang tidak punya akses.
- Gunakan react-hot-toast secara konsisten agar notifikasi tampil.

## File yang Tidak Perlu Di-Push

Pastikan .gitignore berisi:

gitignore node_modules .next .env .env.local .DS_Store

## Troubleshooting

### Hydration Mismatch

Jika terjadi error hydration di Next.js, biasanya penyebabnya adalah penggunaan window, Cookies, atau theme langsung saat render.

Solusi:

- Pindahkan akses Cookies.get() ke dalam useEffect.
- Gunakan mounted state sebelum render komponen yang bergantung pada browser.
- Hindari render nilai dinamis langsung dari server dan client secara berbeda.

### Toast Tidak Muncul

Pastikan menggunakan library toast yang sama.

Project ini memakai:

ts import toast from "react-hot-toast";

Pastikan Toaster sudah dipasang pada root layout.

### Push Git Ditolak

Jika muncul error non-fast-forward, jalankan:

bash git pull origin dev --rebase git push origin dev

### Dependency Conflict

Jika install gagal karena conflict peer dependency:

bash npm install --legacy-peer-deps

## Author

Project ini dikembangkan oleh:

txt Arya Firmansyah

## License

Project ini digunakan untuk kebutuhan pembelajaran dan pengembangan aplikasi CompuPay.
