# TODO App Frontend

A Next.js 14 frontend for the TODO application with TypeScript and Tailwind CSS.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Responsive design** that works on all devices
- **Real-time updates** with the FastAPI backend
- **Error handling** with user-friendly messages
- **Loading states** for better UX

## Setup

1. Make sure you have Node.js 18+ installed
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Frontend

Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   └── TodoList.tsx    # Main TODO list component
├── services/          # API services
│   └── api.ts         # API communication layer
└── types/             # TypeScript type definitions
    └── todo.ts        # TODO-related types
```

## API Integration

The frontend communicates with the FastAPI backend at `http://localhost:8000`. Make sure the backend is running before using the frontend.

## Styling

This project uses Tailwind CSS for styling. The design is minimal and clean, focusing on usability and accessibility.
