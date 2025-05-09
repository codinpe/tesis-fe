// src/pages/api/_helpers.ts
export function randomDelay(min = 300, max = 1500) {
    const ms = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise((res) => setTimeout(res, ms));
  }
  