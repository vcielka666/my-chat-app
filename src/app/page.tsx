"use client"
import About from './components/About';
import Chat from './components/Chat/Chat';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { useEffect } from 'react';
import { applyInitialDarkMode } from '@/lib/utils';

export default function Home() {
  useEffect(() => {
    applyInitialDarkMode();
  }, []);

  return (
    <div className='MaxWidthWrapper'>
      <NavBar />
      <Chat />
      <Footer />
    </div>
  );
}
