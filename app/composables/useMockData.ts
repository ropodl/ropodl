import { ref } from 'vue';
import type { blog } from '~/types/blog';
import type { Portfolio } from '~/types/portfolio';

export const useMockData = () => {
  const blogs = ref<blog[]>([
    {
      id: 1,
      title: 'The Future of Web3 Development',
      slug: 'future-of-web3',
      excerpt: 'Exploring the decentralized web and how it reshapes user experiences across the globe.',
      content: '<p>Content for Web3...</p>',
      created_at: '2026-03-01T10:00:00Z',
      status: 'published' as any,
      featured_image: {
        fileUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200',
      } as any,
    },
    {
      id: 2,
      title: 'Nuxt 3: A Masterclass in Performance',
      slug: 'nuxt3-masterclass',
      excerpt: 'Leveraging server-side rendering and edge computing for ultra-fast web applications.',
      content: '<p>Content for Nuxt...</p>',
      created_at: '2026-02-15T14:30:00Z',
      status: 'published' as any,
      featured_image: {
        fileUrl: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=1200',
      } as any,
    },
    {
      id: 3,
      title: 'Mastering Vuetify 4 Components',
      slug: 'vuetify4-components',
      excerpt: 'Deep dive into the latest Vuetify features and how to build stunning UIs with ease.',
      content: '<p>Content for Vuetify...</p>',
      created_at: '2026-02-10T09:00:00Z',
      status: 'published' as any,
      featured_image: {
        fileUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
      } as any,
    },
  ]);

  const portfolios = ref<Portfolio[]>([
    {
      id: 1,
      title: 'Ether Vision Dashboard',
      slug: 'ether-vision',
      description: 'A real-time Ethereum analytics dashboard with immersive data visualization.',
      content: 'Detailed project info...',
      status: 'published',
      featured: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200',
      createdAt: '2026-01-20T12:00:00Z',
      updatedAt: '2026-01-20T12:00:00Z',
      featuredImageId: 101,
      workTypeId: 1,
      type: { id: 1, title: 'Web Development', slug: 'web-dev', createdAt: '', updatedAt: '' },
    },
    {
      id: 2,
      title: 'Neon Nexus App',
      slug: 'neon-nexus',
      description: 'Futuristic social platform concept built for the next generation of digital natives.',
      content: 'Detailed project info...',
      status: 'published',
      featured: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200',
      createdAt: '2026-01-15T10:00:00Z',
      updatedAt: '2026-01-15T10:00:00Z',
      featuredImageId: 102,
      workTypeId: 2,
      type: { id: 2, title: 'Mobile App', slug: 'mobile-app', createdAt: '', updatedAt: '' },
    },
    {
      id: 3,
      title: 'Quantum Portal',
      slug: 'quantum-portal',
      description: 'Immersive 3D portfolio experience using Three.js and Vite.',
      content: 'Detailed project info...',
      status: 'published',
      featured: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200',
      createdAt: '2026-01-05T08:00:00Z',
      updatedAt: '2026-01-05T08:00:00Z',
      featuredImageId: 103,
      workTypeId: 3,
      type: { id: 3, title: 'Design', slug: 'design', createdAt: '', updatedAt: '' },
    },
  ]);

  return { blogs, portfolios };
};
