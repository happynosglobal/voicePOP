import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    esbuild: {
      drop: ["console", "debugger"], // 빌드시 콘솔,디버거 제외
    },
    server: {
      proxy: {
        [env.VITE_API_PREFIX]: {
          target: `${env.VITE_API_BASE_URL}`,
          changeOrigin: true,
          secure: false,
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.VITE_API_PREFIX}`), ""),
          configure: (proxy, options) => {
            proxy.on("proxyReq", (proxyReq, req) => {
              console.log(`[proxy] ${req.method} ${req.url} -> ${options.target}`);
            });
          },
        },
      },
    },
  };
});
