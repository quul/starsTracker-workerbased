import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    {path: "/login", component: "login"},
    {
      path: "/", component: "index",
      wrappers: [
        '@/wrappers/auth'
      ],
    }
  ],
  proxy: {
    '/api': {
      'target': 'https://stars.m2.gay/',
      'changeOrigin': true,
    }
  },
  npmClient: 'pnpm',
  plugins: ['@umijs/plugins/dist/react-query']
});
