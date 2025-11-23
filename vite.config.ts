
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'sonner@2.0.3': 'sonner',
        'lucide-react@0.487.0': 'lucide-react',
        'figma:asset/c9c3d7ad3259dd947f63b56a233c8da105e3c7b0.png': path.resolve(__dirname, './src/assets/c9c3d7ad3259dd947f63b56a233c8da105e3c7b0.png'),
        'figma:asset/98e173612e69682754e92cda1176cbf96939a4f5.png': path.resolve(__dirname, './src/assets/98e173612e69682754e92cda1176cbf96939a4f5.png'),
        'figma:asset/2feab259639b97e6dceaba4c3b295f305ad9aa47.png': path.resolve(__dirname, './src/assets/2feab259639b97e6dceaba4c3b295f305ad9aa47.png'),
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });