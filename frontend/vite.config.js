import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()],
  plugins: [react()],
  server:{
    hmr: {
      overlay: false
    },
        host:true,
        port :5173,
  },
})