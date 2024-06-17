'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === null) {
      return;
    }

    if (isAuthenticated) {
      router.push('/currencies');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return <p>Loading...</p>;
};

export default HomePage;
