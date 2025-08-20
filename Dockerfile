FROM node:22-alpine AS builder

ARG NEXT_PUBLIC_HOST
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_DEFAULT_THEME

ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXT_PUBLIC_DEFAULT_THEME=$NEXT_PUBLIC_DEFAULT_THEME

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit-dev
COPY . .
RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXT_PUBLIC_DEFAULT_THEME=$NEXT_PUBLIC_DEFAULT_THEME

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "run", "start"]