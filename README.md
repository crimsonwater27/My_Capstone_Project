# Art History Through Time

A responsive, interactive web application that explores art history across different movements, time periods, and styles — built with modern React architecture and optimized for performance, accessibility, and a fun learning experience.

## Overview

Art History Through Time is a dashboard- style web application that allows users to explore artworks across historical periods using real museum data.
Users can:
-Browse artworks by historical period

-Filter by movement or category
-Favorite artworks (with persistent storage)
-Explore a responsive grid layout across all screen sizes
-Enjoy smooth layout transitions and optimized performance

The app is fully responsive, and built with clean state management and modular components.

## Live Features

* Browse artworks from museum APIs
* View artwork details
* Timeline-based exploration
* Save favorite artworks
* Responsive UI.
* Desktop sidebar layout
*Collapsible hamburger menu on mobile
*Filters collapse into an accordion on smaller screens
*Ultra-small screen optimized ArtworkGrid

## Favorites System

*Add/remove favorites without requiring login
*Persisted in localStorage
*Syncs across refresh
*Optional authentication layer supported

## Smooth UI Animations

*Layout transitions powered by Framer Motion
*Animated grid reflow
*Smooth accordion expand/collapse behavior
*Subtle hover interactions

## Performance Optimizations

*Efficient state updates
*Reduced unnecessary re-renders
*Optimized layout shifts

## Tech Stack

* React (Vite)
* Zustand (state management)
* React Router
* Framer Motion (Animations)
* LocalStorage API (Persistence)
* Axios
* Tailwind (styling phase)

## Responsive Design Strategy

The app follows a mobile-first architecture:

Screen Size Layout Behavior
Ultra Small Single column artwork grid
Mobile Collapsible header + accordion filters
Tablet Two-column responsive layout
Desktop Sidebar filters + multi-column grid

Key responsive techniques used:

-CSS Grid with auto-fit/minmax
-Tailwind breakpoints (sm, md, lg, xl)
-Conditional rendering for mobile navigation
-Adaptive spacing and typography scaling

## Authentication (Optional)

The app includes a simple local authentication system:
-Register
-Login
-Logout
-Favorites tied to user
Authentication data is stored in localStorage for demonstration purposes only.
⚠️ Not production-secure (no hashing, no backend).

## State Management

Global state is handled using Zustand, providing:
-User state
-Favorites state
-Filter state
-Authentication logic
-Optimistic UI updates
This keeps components clean and prevents prop drilling.

## Key UX Improvements Implemented

-Mobile hamburger navigation
-Collapsible filter accordion
-Responsive grid reflow
-Smooth animated layout transitions
-Reduced layout shift
-Improved small-screen usability
-Faster load perception

## Setup

```bash
git clone <repo>
cd art-history-through-time
npm install
npm run dev
```

## API

This project uses:

* The Metropolitan Museum of Art Collection API

## Future Improvements

* Timeline filtering
* Search by era
* Responsive mobile UI
* Animations
* Backend integration
*Secure authentication (JWT)
*Cloud database for favorites
*Image lazy loading
*Search functionality
*Dark mode toggle
*Accessibility enhancements (ARIA roles)

## What This Project Demonstrates

-Modern React architecture
-Responsive UI engineering
-Clean state management with Zustand
-UI animation with Framer Motion
-Performance-conscious rendering
-Local persistence strategy
-Scalable component structure

Built as a portfolio-level frontend project demonstrating UI architecture, responsiveness, and interaction design