// pages/index.js
import React, { useState } from 'react';
import SidebarNavigation from '../components/SidebarNavigation';
import styles from '../styles/Home.module.css';
import Head from "next/head";

export default function Home() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className={styles.pageContainer}>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            </Head>
            <SidebarNavigation onToggle={() => setIsSidebarCollapsed(prev => !prev)} />
            <main className={`${styles.mainContent} ${!isSidebarCollapsed ? styles.expandedMain : ''}`}>
                <h1>Hello World</h1>
                {/* Autres contenus */}
            </main>
        </div>
    )
}
