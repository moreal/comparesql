import { defineConfig } from "@solidjs/start/config";
import deno from "@deno/vite-plugin";
// import isolation from "./.vite/plugins/isolation.ts";

export default defineConfig({
  vite: () => ({
    plugins: [deno()],
    optimizeDeps: {
      exclude: ["gluesql"],
    },
  }),
});
