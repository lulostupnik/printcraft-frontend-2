'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/'); // Redirect to the home page
  }, [router]);

  return null; // Render nothing while redirecting
};

export default RedirectPage;
