# 🏥 Sehatyar - Healthcare Platform

<p align="center">
  <img src="/public/images/logo2.webp" alt="Sehatyar Logo" width="200"/>
</p>

<p align="center">
  <strong>A comprehensive healthcare platform connecting patients with doctors, clinics, and hospitals in Pakistan</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#environment-variables">Environment Variables</a>
</p>

---

## 📋 Overview

**Sehatyar** (ساتھی صحت - "Health Companion" in Urdu) is a modern healthcare platform built with Next.js that enables patients to find doctors, book appointments, and consult with healthcare professionals online. The platform supports multiple user roles including patients, doctors, clinic administrators, receptionists, and system administrators.

## ✨ Features

### 🔍 **Doctor Discovery**
- Search doctors by specialization, condition, or name
- **Google Maps integration** for city-based search with autocomplete
- Automatic location detection using browser geolocation
- Filter by hospitals and clinics
- View detailed doctor profiles with qualifications and experience

### 📅 **Appointment Booking**
- Book in-clinic appointments
- Online video/audio consultations
- Real-time availability checking
- Appointment management for patients and doctors

### 👥 **Multi-Role Dashboard System**
- **Patient Dashboard**: View appointments, medical history, prescriptions
- **Doctor Dashboard**: Manage schedule, patient consultations, availability
- **Clinic Dashboard**: Manage doctors, staff, and appointments
- **Receptionist Dashboard**: Handle front-desk operations
- **Admin Dashboard**: System-wide management and analytics

### 🏥 **Healthcare Facilities**
- Browse hospitals and clinics
- View facility details and available doctors
- Partner healthcare organizations showcase

### 💬 **Real-time Communication**
- Video and audio calling capabilities
- Real-time messaging with Socket.IO integration
- Prescription management

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Dark/Light theme support
- Smooth animations and transitions
- Premium glassmorphism design elements

## 🛠 Tech Stack

### **Frontend**
| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS |
| [Radix UI](https://www.radix-ui.com/) | Headless UI components |
| [Lucide React](https://lucide.dev/) | Icon library |

### **State & Data Management**
| Technology | Purpose |
|------------|---------|
| [React Context](https://react.dev/reference/react/useContext) | Global state (Auth, Location) |
| [React Hook Form](https://react-hook-form.com/) | Form handling |
| [Zod](https://zod.dev/) | Schema validation |
| [Axios](https://axios-http.com/) | HTTP client |

### **Real-time & Communication**
| Technology | Purpose |
|------------|---------|
| [Socket.IO](https://socket.io/) | Real-time messaging |
| Google Maps API | Location services & autocomplete |

### **UI Components & Styling**
| Technology | Purpose |
|------------|---------|
| [shadcn/ui](https://ui.shadcn.com/) | Component library |
| [Embla Carousel](https://www.embla-carousel.com/) | Carousel components |
| [Recharts](https://recharts.org/) | Charts & graphs |
| [React Hot Toast](https://react-hot-toast.com/) | Toast notifications |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** (recommended) or npm/yarn
- Google Maps API key (for location features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sehatyar.git
   cd sehatyar
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration (see [Environment Variables](#environment-variables))

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
sehatyar/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/               # Login page
│   │   └── register/            # Doctor registration
│   ├── (Dashboard)/             # Protected dashboard routes
│   │   ├── admin-dashboard/     # Admin panel
│   │   ├── doctor-dashboard/    # Doctor panel
│   │   ├── patient-dashboard/   # Patient panel
│   │   ├── clinic-dashboard/    # Clinic management
│   │   └── receptionist-dashboard/
│   ├── (public)/                # Public pages
│   │   ├── doctor/              # Doctor search/listing
│   │   ├── doctor-profile/      # Doctor profile view
│   │   ├── book-appointment/    # Appointment booking
│   │   ├── hospital/            # Hospital listings
│   │   ├── clinic/              # Clinic listings
│   │   └── about-us/            # About page
│   ├── call/                    # Video/Audio call pages
│   ├── layout.tsx               # Root layout
│   ├── providers.tsx            # Context providers
│   └── globals.css              # Global styles
├── components/
│   ├── landing/                 # Landing page components
│   │   ├── hero-section.tsx     # Hero with search
│   │   ├── Carousel.tsx         # Specialists carousel
│   │   ├── ConditionCardCarousel.tsx
│   │   ├── PopularDoctors.tsx
│   │   └── ...
│   ├── Dashboard/               # Dashboard components
│   ├── ui/                      # Reusable UI components (shadcn)
│   ├── admin/                   # Admin-specific components
│   ├── Clinic/                  # Clinic components
│   └── receptionist/            # Receptionist components
├── src/
│   ├── contexts/                # React Context providers
│   │   ├── AuthContext.tsx      # Authentication state
│   │   └── LocationContext.tsx  # Location/Google Maps state
│   └── types/                   # TypeScript type definitions
├── lib/
│   ├── Api/                     # API service functions
│   │   ├── Auth/                # Authentication APIs
│   │   ├── Doctor/              # Doctor APIs
│   │   ├── Patient/             # Patient APIs
│   │   ├── Clinic/              # Clinic APIs
│   │   └── ...
│   ├── Sockets/                 # Socket.IO configuration
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
│   ├── images/                  # Images
│   ├── images1/                 # Specialist icons
│   └── doctorbycondition/       # Condition icons
└── hooks/                       # Custom React hooks
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Google Maps API (Required for location features)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Backend API URL
NEXT_PUBLIC_API_URL=your_backend_api_url

# Socket.IO Server URL
NEXT_PUBLIC_SOCKET_URL=your_socket_server_url
```

### Getting a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create credentials (API Key)
5. Add the key to your `.env.local`

## 👥 User Roles

| Role | Access Level |
|------|--------------|
| **Patient** | Browse doctors, book appointments, view prescriptions |
| **Doctor** | Manage availability, consultations, prescriptions |
| **Receptionist** | Manage front-desk, patient check-ins |
| **Clinic Admin** | Manage clinic doctors and staff |
| **System Admin** | Full system access and management |

## 🎨 Key Features Implementation

### Location Context (Global State)
The app uses a global `LocationContext` that:
- Automatically detects user's city using browser geolocation
- Provides city autocomplete using Google Places API
- Shares location state across all components
- Used in hero search, carousels, and registration forms

### Authentication Flow
- JWT-based authentication
- Role-based access control
- Protected routes with HOC wrappers
- Persistent sessions with localStorage

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🚀 Deployment

### Deploy on Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/sehatyar)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed on any platform supporting Node.js:
- AWS Amplify
- Netlify
- DigitalOcean App Platform
- Railway

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 📞 Support

For support and inquiries, please contact the development team.

---

<p align="center">
  Made with ❤️ for healthcare in Pakistan
</p>
