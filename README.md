# MyHome

A modern Nigerian real-estate marketplace connecting property owners directly with people looking to buy or rent.

[![Live Demo](https://img.shields.io/badge/Live-Demo-2ea44f?style=for-the-badge&logo=vercel&logoColor=white)](https://my-home-three-nu.vercel.app/) 
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AlexHunter48/myHome)

**MyHome** is a full-stack web application focused on making property discovery clearer, more accessible, and more transparent. It combines a polished property-browsing experience with owner listing tools, saved properties, and direct conversations between prospective buyers or renters and property owners.

> **Project status:** MyHome is an actively developed portfolio project. Demonstration listings and imagery may be illustrative and should not be interpreted as verified offers for real properties.

---

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Supabase Configuration](#supabase-configuration)
- [Available Scripts](#available-scripts)
- [Security Considerations](#security-considerations)
- [Project Status & Limitations](#project-status--limitations)
- [Roadmap](#roadmap)
- [Acknowledgements](#acknowledgements)
- [License](#license)

---

## Overview

Finding a property can involve fragmented information, uncertain listing quality, and unnecessary intermediaries. MyHome is designed to give buyers and renters a more straightforward way to explore available properties and contact owners, while giving owners tools to manage their listings.

The product is designed initially around the Nigerian property market, with a visual identity built around deep green, warm neutrals, clean typography, generous spacing, and restrained motion. The interface takes inspiration from the clarity of leading property and hospitality products without copying their layouts or branding.

---

## Key Features

### Property Discovery
* **Browse Listings:** Filter by key information such as price, location, property type, bedrooms, bathrooms, and area.
* **Property Detail Pages:** Interactive image galleries and comprehensive property metadata.
* **Search & Filters:** Narrow down options effortlessly based on specific criteria.
* **Interactive Maps:** View geographical locations with integrated Leaflet maps.
* **Save Properties:** Bookmark favorite listings for quick access.

### Property Management
* **Listing Creation:** Structured step-by-step form for property onboarding.
* **Media Uploads:** Associate image assets directly with listings.
* **Publishing Control:** Draft and active publishing states for property owners.

### Direct Communication
* **Enquiry System:** Initiate direct discussions regarding specific properties.
* **Real-time Messaging:** Chat functionality powered by Supabase Realtime.
* **Read Receipts:** Track message status and unread notifications.

### Account & Security
* **Authentication:** Secure logins powered by Supabase Auth.
* **User Profiles:** Manage personal profiles and avatar images.
* **Database Authorization:** Granular authorization enforced via Row Level Security (RLS).

---

## Technology Stack

| Area | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React | Component-based UI library |
| **Build Tooling** | Vite | Fast local dev server & production bundler |
| **Styling** | Tailwind CSS | Responsive utility-first design system |
| **Routing** | React Router | Client-side routing and layout management |
| **Server State** | TanStack React Query | Async state management & caching |
| **Backend** | Supabase | Auth, PostgreSQL database, storage & realtime |
| **Database** | PostgreSQL | Relational database engine |
| **Access Control** | Supabase RLS | Row-level database policies |
| **Forms** | React Hook Form | Form state management and validation |
| **Icons** | Lucide React | Clean interface icons |
| **Animation** | Motion | Transition effects and interface feedback |
| **Notifications** | React Hot Toast | User toast alerts and status feedback |
| **Maps** | Leaflet | Interactive property map rendering |

---

## Application Architecture

Browser
│
▼
React + Vite
├── React Router       (Page routing & layouts)
├── TanStack Query     (Remote data, caching & mutations)
└── Service Modules    (Data operations)
│
▼
Supabase
├── Auth        (Authentication & sessions)
├── PostgreSQL  (Profiles, properties, images, saved items, chats)
├── Storage     (Property images & profile avatars)
├── Realtime    (Live chat updates)
└── RLS         (Security policies)


---

## Getting Started

### Prerequisites
* Node.js (Current LTS release recommended)
* npm
* A Supabase project with configured tables, storage buckets, and policies
### 1. Clone the repository
```bash
git clone [https://github.com/AlexHunter48/myHome.git](https://github.com/AlexHunter48/myHome.git)
cd myHome
2. Install dependencies
Bash
npm install
3. Configure environment variables
Create a .env file in the project root:

Code snippet
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
4. Start the development server
Bash
npm run dev
5. Production build
Bash
npm run build
npm run preview
Environment Variables
Variable	Required	Description
VITE_SUPABASE_URL	Yes	Public URL of your Supabase project
VITE_SUPABASE_ANON_KEY	Yes	Client publishable key for browser requests
Security Note: Never include service_role keys or private secrets in .env files prefixed with VITE_.

Supabase Configuration
Tables Required
profiles: User information and roles

properties: Property listing data and coordinates

property_images: Image paths and display order

saved_properties: User-bookmarked listings

conversations: Buyer/Owner chat instances

messages: Individual chat messages and read statuses

Storage Buckets
properties-image: Public access for property photos

avatars: Public/Authenticated access for profile avatars

Available Scripts
Command	Action
npm run dev	Starts the Vite local development server
npm run build	Compiles the production build bundle
npm run preview	Runs a local preview server for the build folder
Security Considerations
Configure Row Level Security (RLS) policies on all Supabase tables.

Restrict bucket uploads by file size and MIME type.

Never expose administrative or service role keys on the frontend.

Validate inputs both on client forms and database policy levels.

Roadmap
[ ] Complete test inventory data.

[ ] Refine mobile screen responsiveness and touch targets.

[ ] Integrate geocoding API fallback for missing map coordinates.

[ ] Implement end-to-end user testing for chat and booking notifications.

Acknowledgements
Built using the open-source software ecosystem around React, Vite, Tailwind CSS, Supabase, Lucide, Motion, and Leaflet.

License
Unless otherwise specified, source code rights remain with the repository owner.
