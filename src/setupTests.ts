import '@testing-library/jest-dom';
import 'whatwg-fetch';

// Setup global TextEncoder/TextDecoder for React Router
if (typeof globalThis.TextEncoder === 'undefined') {
  // @ts-ignore
  globalThis.TextEncoder = global.TextEncoder || require('util').TextEncoder;
  // @ts-ignore  
  globalThis.TextDecoder = global.TextDecoder || require('util').TextDecoder;
}
