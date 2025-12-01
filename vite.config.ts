import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno. El tercer parámetro '' permite cargar todas.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Esto es el truco de magia: Reemplaza "process.env.API_KEY" en el código
      // con el valor real que pusiste en Vercel (VITE_API_KEY)
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY),
    },
    server: {
      port: 3000
    }
  };
});
