# 🔍 FindIt @ RIT — Smart Campus Lost & Found Portal

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://findit-lost-found-2026-8x2e.vercel.app/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-purple?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

> Official AI-assisted Lost & Found portal for the **Rajalakshmi Institute of Technology (RIT)** campus community.

---

## 🌐 Live URL

**[https://findit-lost-found-2026-8x2e.vercel.app/](https://findit-lost-found-2026-8x2e.vercel.app/)**

---

## ✨ Features

- 🏫 **RIT Campus-specific** locations, zones, and safe handover stations
- 🔍 **AI-powered item matching** (96% confidence showcase)
- 📋 **Report Lost / Found** items with 3-step wizard
- 🗺️ **Interactive Campus Map** with 7 building zones
- 👤 **Student Dashboard** with claim management
- 🛡️ **Admin / Security Dashboard** with moderation tools
- 🌙 **Responsive Design** — works on mobile, tablet, and desktop
- 💬 **Real-time Toast notifications**

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + JSX |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| State | React Context API + localStorage |
| Deployment | Vercel |

---

## 🏃 Run Locally

```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

## 🏗️ Build for Production

```bash
npm run build
```

---

## 🔐 Demo Credentials

| Role | Name | Roll No | Password |
|------|------|---------|----------|
| Student | Tharun Prasath | 22CS104 | demo123 |
| Security | Inspector Ramanathan | SEC001 | admin123 |

---

## 📍 RIT Campus Zones

- Main Block (MB) · Library Block (LB) · CSE Department
- Mechanical Block · Canteen / Food Court · Sports Ground
- Boys Hostel · Girls Hostel · Gate 1 (Main Entrance)

---

## 📦 Deployment

This project auto-deploys to **Vercel** on every push to `main`.

Configured via [`vercel.json`](./vercel.json):
- Framework: Vite
- Build: `npm run build`
- Output: `dist/`
- SPA routing: all paths → `index.html`

---

*Made with ❤️ for RIT Campus Community*
