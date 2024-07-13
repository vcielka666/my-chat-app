"use client"
import React from 'react';
import ThemeToggleButton from '../components/ui/ThemeToggleButton';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>TOXIK</h1>
      <ThemeToggleButton />
    </div>
  );
};

export default NavBar;
