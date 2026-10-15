# MyHome

**A modern Nigerian real-estate marketplace connecting property owners directly with people looking to buy or rent.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-2ea44f?style=for-the-badge&logo=vercel&logoColor=white)](https://my-home-three-nu.vercel.app/) 
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AlexHunter48/myHome)

MyHome is a full-stack web application focused on making property discovery clearer, more accessible, and more transparent. It combines a polished property-browsing experience with owner listing tools, saved properties, and direct conversations between prospective buyers or renters and property owners.

> **Project status:** MyHome is an actively developed portfolio project. Demonstration listings and imagery may be illustrative and should not be interpreted as verified offers for real properties.

---

## Contents

- [Overview](#overview)
- [Key features](#key-features)
- [Technology stack](#technology-stack)
- [Application architecture](#application-architecture)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Supabase configuration](#supabase-configuration)
- [Available scripts](#available-scripts)
- [Security considerations](#security-considerations)
- [Project status and limitations](#project-status-and-limitations)
- [Roadmap](#roadmap)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Overview

Finding a property can involve fragmented information, uncertain listing quality, and unnecessary intermediaries. MyHome is designed to give buyers and renters a more straightforward way to explore available properties and contact owners, while giving owners tools to manage their listings.

The product is designed initially around the Nigerian property market, with a visual identity built around deep green, warm neutrals, clean typography, generous spacing, and restrained motion. The interface takes inspiration from the clarity of leading property and hospitality products without copying their layouts or branding.

## Key features

### Property discovery

- Browse property listings with key information such as price, location, property type, bedrooms, bathrooms, and area.
- Explore property detail pages with image galleries and property information.
- Search and filter listings to narrow down relevant options.
- View location information and map-related details where coordinates are available.
- Save properties for later reference.

### Property management

- Create property listings through a structured form.
- Upload and associate images with listings.
- Manage draft and published listing states.
- Access owner-focused listing functionality and publishing controls.

### Direct communication

- Start an enquiry about a property.
- View conversations and exchange messages with the other participant.
- Receive real-time message updates through Supabase Realtime.
- Track unread messages and message read state.

### Account and settings

- Authenticate through Supabase Auth.
- Maintain a user profile and upload a profile avatar.
- Access account settings, including personal information and login/security screens.
- Receive in-app feedback for supported actions and errors.

### Interface and experience

- Responsive layouts for desktop and mobile screens.
- Reusable React components and routed page layouts.
- Loading, empty, and error states in key flows.
- Subtle motion and iconography to support the interface without overwhelming it.

> Feature availability can vary as development continues. See [Project status and limitations](#project-status-and-limitations) before treating the application as a production property service.

## Technology stack

| Area | Technology | Purpose |
|---|---|---|
| Frontend | React | Component-based user interface |
| Build tooling | Vite | Local development and production builds |
| Styling | Tailwind CSS | Responsive styling and design system implementation |
| Routing | React Router | Client-side navigation and nested layouts |
| Server state | TanStack React Query | Data fetching, caching, and mutations |
| Backend platform | Supabase | Authentication, database, storage, and realtime services |
| Database | PostgreSQL via Supabase | Relational application data |
| Access control | Supabase Row Level Security (RLS) | Database-level authorization policies |
| Forms | React Hook Form | Form state and validation support |
| Icons | Lucide React | Interface icons |
| Animation | Motion | Interface transitions and animations |
| Notifications | React Hot Toast | Action feedback and error notifications |
| Maps | Leaflet | Interactive property maps |

## Application architecture

MyHome uses a React single-page application connected to Supabase services.

```text
Browser
  |
  v
React + Vite
  ├── React Router       Page routing and layouts
  ├── TanStack Query     Remote data, caching, mutations
  └── Service modules    Application data operations
          |
          v
       Supabase
          ├── Auth        User authentication and sessions
          ├── PostgreSQL  Profiles, properties, images, saves,
          |               conversations, and messages
          ├── Storage     Property images and profile avatars
          ├── Realtime    Live message updates
          └── RLS         Database access policies
```

The database includes core tables for `profiles`, `properties`, `property_images`, `saved_properties`, `conversations`, and `messages`. Property images are stored in the `properties-image` Storage bucket; profile avatars use the `avatars` bucket.

Authorization should be enforced through Supabase policies as well as the application's route and UI logic. Hiding a control in the interface is not a substitute for database-level access control.

## Getting started

### Prerequisites

- Node.js (a current LTS release is recommended)
- npm
- A Supabase project with the required database tables, Storage buckets, Auth configuration, and Row Level Security policies
- Git, if cloning the repository

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

Replace the placeholders with the actual repository URL and directory name.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add the Supabase values described below.

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key
```

The variable names must match those referenced in the project's Supabase client file. If the existing client uses a different key name, keep the code and `.env` file consistent.

### 4. Configure Supabase

Use your own Supabase project and ensure its schema and policies match the application. The application expects the tables and Storage buckets described in [Supabase configuration](#supabase-configuration).

### 5. Start the development server

```bash
npm run dev
```

Vite will print the local development URL in the terminal, commonly `http://localhost:5173`.

### 6. Create a production build

```bash
npm run build
```

To preview the generated build locally:

```bash
npm run preview
```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | Yes | URL of the Supabase project |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase client key intended for browser use, subject to correctly configured RLS policies |

Vite exposes variables prefixed with `VITE_` to client-side code. **Never put a Supabase `service_role` key, database password, private API key, or other server secret in a `VITE_` variable or commit it to source control.**

Keep local values in `.env`, make sure `.env` is ignored by Git, and provide a `.env.example` containing placeholder values if you want to document the required variable names for other developers.

## Supabase configuration

MyHome relies on Supabase for authentication, relational data, file storage, and realtime messaging. A fresh Supabase project will not automatically contain the schema and policies expected by this application.

The current application data model includes the following tables:

- **`profiles`** — application profile information and user role.
- **`properties`** — property details, ownership, and listing status.
- **`property_images`** — image paths associated with properties and display order.
- **`saved_properties`** — saved/favourited properties for users.
- **`conversations`** — buyer/owner conversations associated with properties.
- **`messages`** — messages within conversations, including sender and read-state information.

Storage buckets used by the application:

- **`properties-image`** — property listing images.
- **`avatars`** — user profile avatars.

Before running the app against a new Supabase project:

1. Create the required tables, relationships, indexes, and any RPC functions used by the current code.
2. Enable and configure Row Level Security for application tables.
3. Add policies that restrict users to permitted operations and conversation participants to their own conversations and messages.
4. Configure Storage policies so authenticated users can manage only the files they are allowed to manage.
5. Configure Supabase Auth redirect URLs for your local and deployed environments.
6. Verify the schema, policy names, bucket names, and environment variable names against the current source code.

**Database setup note:** This README documents the application's expected data model; it does not replace a version-controlled SQL migration or a complete Supabase setup script. Use the actual project schema and policies when configuring another environment.

## Available scripts

The standard Vite workflow used by this project is:

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |

Run `npm run` to see every script defined in the current `package.json`. A lint command is available only if it is defined in that file.

## Security considerations

- Keep secrets and service-role credentials out of client-side code and version control.
- Use Supabase Row Level Security to protect user data and owner-only operations.
- Validate and authorize sensitive operations on the server/database side, not only in React components.
- Restrict uploads by user, bucket, file type, and size where appropriate.
- Do not assume that a public Storage bucket makes its contents private; public files can be retrieved by anyone with access to their URLs.
- Configure production Auth redirect URLs and review email verification behaviour before deployment.
- Use separate development and production Supabase environments where practical.

## Project status and limitations

MyHome is under active development. Its core application flows include property discovery and management, saved properties, account settings, and direct messaging. Some operational details still require verification and polish before the application should be used as a real commercial property service.

In particular:

- Demo property details, prices, addresses, and generated imagery may be illustrative and are not proof that a property is available for sale or rent.
- Map display depends on valid coordinates and correctly configured location data.
- Authentication email-change verification should be tested end to end in the target Supabase environment.
- Database policies, upload restrictions, deployment configuration, and error handling should be reviewed before public commercial use.
- Features and setup instructions should be checked against the current codebase as it evolves.

## Roadmap

Planned areas for continued development include:

- Complete and validate the demonstration property inventory.
- Refine responsive behaviour and accessibility across core screens.
- Improve loading, empty, and error states throughout the application.
- Verify property geocoding and map behaviour for listings with missing or invalid coordinates.
- Complete end-to-end testing of authentication and account-security flows.
- Review Supabase policies, upload validation, and production configuration.
- Add repository screenshots and a live demo link once the deployment and visuals are ready to share.

## Acknowledgements

MyHome is built with the open-source ecosystem around React, Vite, Tailwind CSS, React Router, TanStack Query, Supabase, Lucide, Motion, React Hook Form, React Hot Toast, and Leaflet. See each dependency's official documentation and licence for details.

## License

No license has been specified in this repository documentation yet. Unless a license file is added, do not assume that the source code is available for reuse, redistribution, or commercial use. Add a `LICENSE` file once the intended terms have been decided.

---

**MyHome** — property discovery designed around clarity, trust, and direct communication.
