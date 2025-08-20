# Stage 1: Build tahap produksi
FROM node:22-alpine AS builder

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package.json package-lock.json ./

# Instal semua dependensi, termasuk yang diperlukan untuk build
RUN npm install --omit-dev

# Salin semua file proyek
COPY . .

# Buat folder .next sebagai output build Next.js
# NEXT.js akan otomatis menggunakan folder ini
RUN npm run build

# Stage 2: Siapkan image final yang ringan untuk produksi
FROM node:22-alpine AS runner

# Tentukan variabel lingkungan dari .env.example
ARG NEXT_PUBLIC_HOST
ARG NEXT_PUBLIC_DEFAULT_THEME
ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST
ENV NEXT_PUBLIC_DEFAULT_THEME=$NEXT_PUBLIC_DEFAULT_THEME

# Tentukan direktori kerja
WORKDIR /app

# Non-aktifkan telemetry Next.js (opsional, untuk mempercepat startup)
ENV NEXT_TELEMETRY_DISABLED 1

# Salin hanya file yang dibutuhkan dari stage 'builder'
# .next folder berisi kode hasil build, public folder berisi aset statis
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port yang digunakan Next.js
EXPOSE 3000

# Jalankan aplikasi Next.js dalam mode production
CMD ["npm", "run", "start"]