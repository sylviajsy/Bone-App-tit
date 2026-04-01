import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': env.VITE_API_URL,
      },
    },
  });
};

// test: {
  //   environment: "jsdom",
  //   globals: true,
  //   setupFiles: "./src/setupTests.js",
  // },
