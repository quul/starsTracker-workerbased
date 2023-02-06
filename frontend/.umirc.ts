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
  npmClient: 'pnpm',
  plugins: ['@umijs/plugins/dist/react-query']
});
