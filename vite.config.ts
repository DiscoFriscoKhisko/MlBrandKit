
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
        'figma:asset/7f8b67c561905b98488a55820f315f5daf697d67.png': path.resolve(__dirname, './src/assets/7f8b67c561905b98488a55820f315f5daf697d67.png'),
        'figma:asset/658bccfc6e5774439f89351cea319f01f56a583a.png': path.resolve(__dirname, './src/assets/658bccfc6e5774439f89351cea319f01f56a583a.png'),
        'figma:asset/6476e1b10abb071009c199bfce76ba071846b2ef.png': path.resolve(__dirname, './src/assets/6476e1b10abb071009c199bfce76ba071846b2ef.png'),
        'figma:asset/5f027551f5fd9323f35803cda832e8eea8904fc3.png': path.resolve(__dirname, './src/assets/5f027551f5fd9323f35803cda832e8eea8904fc3.png'),
        'figma:asset/51c2c765cbd7f9d6b78d544f62f46369d952cde3.png': path.resolve(__dirname, './src/assets/51c2c765cbd7f9d6b78d544f62f46369d952cde3.png'),
        'figma:asset/4a48ca548bd18aa919107b9d93ce3a1ec8f5690c.png': path.resolve(__dirname, './src/assets/4a48ca548bd18aa919107b9d93ce3a1ec8f5690c.png'),
        'figma:asset/183b8c90c756900e17c36f42abd687a180a7ed4f.png': path.resolve(__dirname, './src/assets/183b8c90c756900e17c36f42abd687a180a7ed4f.png'),
        'figma:asset/1380d8e53d77f1f3fa0ea52b7c3b721803dff059.png': path.resolve(__dirname, './src/assets/1380d8e53d77f1f3fa0ea52b7c3b721803dff059.png'),
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