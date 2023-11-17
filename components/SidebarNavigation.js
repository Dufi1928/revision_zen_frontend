// components/Navigation.js
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/SidebarNavigation.module.css';


const menuItems = [
    { icon: 'person_4', title: 'Cabinet personnel ', link: '/home', class: 'material-symbols-outlined' },
    { icon: 'home_app_logo', title: 'Accueil', link: '/home', class: 'material-symbols-outlined' },
    { icon: 'chat_bubble', title: 'Messagerie', link: '/home', class: 'material-symbols-outlined' },
    { icon: 'empty_dashboard', title: 'Tableau de bord ', link: '/dashboard', class: 'material-symbols-outlined' },
    { icon: 'style', title: 'Cartes de révision', link: '/home', class: 'material-symbols-outlined' },
    { icon: 'history_edu', title: 'Cours ', link: '/home', class: 'material-symbols-outlined' },
    { icon: 'communities', title: 'Communauté ', link: '/home', class: 'material-symbols-outlined' },
    { icon: 'settings', title: 'Paramètres  ', link: '/home', class: 'material-symbols-outlined' },
    { icon: 'logout', title: 'Déconnexion   ', link: '/home', class: 'material-symbols-outlined' },
];
const SidebarNavigation = ({ onToggle }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
        onToggle();
    };

    return (
        <div className={`${styles.nav} ${isCollapsed ? styles.collapsed : ''}`}>
            <div className={`${styles.logo_container} ${isCollapsed ? styles.collapsedLogo : ''}`}>
                <Image
                    src="/Logo/Logo.svg"
                    alt="Logo de Revision Zen"
                    layout="fill"  // Utilisez "fill" pour un redimensionnement responsive
                    objectFit="contain"  // Gardez les proportions du logo
                />
            </div>
            <div className={styles.menuItems}>
                {menuItems.map((item, index) => (
                    <a key={index} href={item.link} className={styles.menuItem}>
                        <span className={`${styles.icon} ${item.class}`}>{item.icon}</span>
                        <span className={`${styles.title} ${isCollapsed ? styles.hidden :''}`}>{item.title}</span>
                    </a>
                ))}
            </div>
            <span onClick={toggleCollapse} className={`${styles.toggleIcon} material-icons ${isCollapsed ? styles.rotated : ''}`}>
                arrow_back
            </span>
        </div>
    );
};

export default SidebarNavigation;
