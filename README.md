# sprintpedia-igchecker

Proxy API untuk mengakses *Instagram Spam Filter* di Sprintpedia melalui backend, dengan login otomatis + CSRF handling.

---

## Deskripsi

Project ini dibuat sebagai **case study dari dapurbuzzer.co.id** untuk integrasi fitur Instagram Spam Filter dari Sprintpedia tanpa dokumentasi resmi. Dengan tools ini, frontend hanya perlu memanggil satu endpoint di backend, dan backend yang mengurus login, simpan cookie, dan mengambil data dari Sprintpedia.

---

## Fitur

- Autentikasi ke Sprintpedia secara otomatis (login + ambil session cookie)  
- Pengambilan data Instagram Spam Filter menggunakan cookie login + CSRF token  
- Penanganan kondisi: username tidak ditemukan, session kadaluarsa, error upstream  
- Endpoint backend sederhana untuk digunakan oleh frontend  

---

## Instalasi

```bash
git clone https://github.com/alwi2022/sprintpedia-igchecker.git
cd sprintpedia-igchecker
npm install


Konfigurasi
Buat file .env  dan isi dengan data login account SPRINTPEDIA:

SPRINTPEDIA_USERNAME='sprintpedia username kamu'
SPRINTPEDIA_PASSWORD='sprintpedia password kamu'


Cara Jalankan
npm run dev