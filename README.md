# Commodities Management System

A comprehensive role-based commodities management system with authentication, product management, and theme switching.

## Features

✅ **Authentication & Access Control**
- Email & password login
- Role-based access (Manager & Store Keeper)
- Protected routes with authorization guards

✅ **Core Features**
- **Dashboard** (Manager only) - Overview of commodities statistics
- **View Products** (Both roles) - Browse all products
- **Add/Edit Products** (Both roles) - Manage product inventory

✅ **UI Enhancements**
- Light/Dark mode theme switching
- Role-based menu restrictions
- Modern, responsive design

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Default Users

### Manager Account
- **Email**: manager@commodities.com
- **Password**: manager123
- **Name**: Rajesh Kumar
- **Access**: Dashboard, View Products, Add/Edit Products

### Store Keeper Account
- **Email**: keeper@commodities.com
- **Password**: keeper123
- **Name**: Priya Sharma
- **Access**: View Products, Add/Edit Products

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Layout.tsx     # Main layout with navigation
│   ├── ProtectedRoute.tsx  # Route guards
│   └── ThemeToggle.tsx     # Theme switcher
├── contexts/          # React contexts
│   ├── AuthContext.tsx     # Authentication state
│   └── ThemeContext.tsx    # Theme state
├── pages/             # Page components
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Products.tsx
│   └── ProductForm.tsx
├── services/          # API services
│   └── api.ts
├── types/             # TypeScript types
│   └── index.ts
├── App.tsx            # Root component
└── main.tsx           # Entry point
```

## Role-Based Access Matrix

| Feature              | Manager | Store Keeper |
|---------------------|---------|--------------|
| Login               | ✅      | ✅           |
| Dashboard           | ✅      | ❌           |
| View Products       | ✅      | ✅           |
| Add/Edit Products   | ✅      | ✅           |
| Role-Based UI       | ✅      | ✅           |

## API Endpoints

The application expects the following API endpoints:

- `POST /auth/login` - User authentication
- `GET /products` - Fetch all products
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## Currency

The application uses **Indian Rupees (₹/INR)** as the default currency for all pricing and financial calculations.

## License

MIT
