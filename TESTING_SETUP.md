# Testing Architecture:

#### **Jest (Unit Tests) **
- `wishlistStore.test.ts`: store functionality
- `movieUtils.test.ts`: movie-specific business logic (formatting, categorization, image URLs)
- `utils.test.ts`: general utilities (debounce, storage, date formatting, currency)
- `Header.test.tsx`: component testing

#### **Vitest (Functional Tests) **
- `component-integration.test.tsx`: component integration
- `wishlist-workflow.test.tsx`: wishlist functionality
- `navigation.test.tsx`: routing and navigation

## 🚀 **Commands**

```bash
# Jest unit tests only
npm run test

# Vitest functional tests only
npm run test:functional

# Run all tests (Jest + Vitest)
npm run test:all
```

### **Separation of Concerns**
```
__tests__/          # Jest unit tests (isolated testing)
├── wishlistStore.test.ts
├── movieUtils.test.ts
├── utils.test.ts
└── Header.test.tsx

src/tests/          # Vitest functional tests (integration testing)
└── functional/
    ├── api-integration.test.tsx
    ├── component-integration.test.tsx
    ├── navigation.test.tsx
    └── wishlist-workflow.test.tsx
```

### **Configuration Isolation**
- **jest.config.js**: Configured for unit testing with mocking
- **vitest.config.ts**: Configured for functional testing with real DOM
- **Separate test patterns**: Jest runs `__tests__/**`, Vitest runs `src/tests/**`
