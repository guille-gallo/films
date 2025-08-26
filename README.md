# Films Browser

React application for browsing movies using The Movie Database (TMDB) API.


## Features

- Browse popular, trending, and top-rated movies
- View detailed movie information
- Manage a personal wishlist
- Responsive design
- Accessibility: All interactive elements (buttons, links, navigation) include ARIA attributes and keyboard navigation support. Accessibility is covered by dedicated tests.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **TanStack Query** for API data fetching and caching
- **React's built-in state** (useState) for local component state
- **Zustand** for wishlist state management
- **React Router** for navigation
- **SASS** for styling

## Development
**⚠️ IMPORTANT:** Before starting the app, create a .env file and add your TMDB API key.
Use the provided .env.example file as a reference for the required format.

```bash
npm install
npm run dev
```

## Testing

- **Jest** for unit tests: `npm run test`
- **Vitest** for functional tests: `npm run test:functional`
- Run all tests: `npm run test:all`
- Detailed description in: TESTING_SETUP.md
