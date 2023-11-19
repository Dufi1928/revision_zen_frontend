// components/Navigation.js
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/SidebarNavigation.module.css';
import { useAuth } from '../contexts/AuthProvider';

const SidebarNavigation = ({ onToggle }) => {
    const { isLoggedIn, logIn, logOut } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showTitles, setShowTitles] = useState(true);
    const colors = ['#FAB45C', '#FC8793', '#316DF3', '#8E59D2', '#8044CD'];
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };
    const circleColors = Array.from({ length: 20 }, () => getRandomColor());


    const menuItems = [
        { icon: 'person_4', title: 'Cabinet', link: '/home', class: 'material-symbols-outlined' },
        { icon: 'home_app_logo', title: 'Accueil', link: '/', class: 'material-symbols-outlined' },
        { icon: 'chat_bubble', title: 'Messagerie', link: '/home', class: 'material-symbols-outlined' },
        { icon: 'empty_dashboard', title: 'Tableau de bord', link: '/dashboard', class: 'material-symbols-outlined' },
        { icon: 'style', title: 'Cartes de révision', link: '/home', class: 'material-symbols-outlined' },
        { icon: 'history_edu', title: 'Cours', link: '/home', class: 'material-symbols-outlined' },
        { icon: 'communities', title: 'Communauté', link: '/home', class: 'material-symbols-outlined' },
        { icon: 'settings', title: 'Paramètres', link: '/home', class: 'material-symbols-outlined' },
    ];

    const logoutMenuItem = {
        icon: 'logout',
        title: 'Déconnexion',
        onClick: logOut, // Utilisation de la fonction logOut
        class: 'material-symbols-outlined'
    };

    if (isLoggedIn) {
        menuItems.push(logoutMenuItem);
    } else {
        menuItems.push({ icon: 'login', title: 'Connexion', link: '/auth/signin', class: 'material-symbols-outlined' });
    }



    useEffect(() => {
        if (isCollapsed) {
            setShowTitles(false); // Cache les titres immédiatement lors de la fermeture
        } else {
            const timer = setTimeout(() => setShowTitles(true), 100); // Affiche les titres après que la barre latérale est complètement ouverte
            return () => clearTimeout(timer);
        }
    }, [isCollapsed]); // Dépendance à isCollapsed

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
                    fill
                    style={{ objectFit: 'contain' }}
                />

            </div>
            <ul className={styles.circles}>
                {circleColors.map((color, index) => (
                    <li key={index} style={{ backgroundColor: color }}></li>
                ))}
            </ul>
            <div className={styles.menuItems}>
                {menuItems.map((item, index) => {
                    // Vérifier si l'élément a une action onClick (comme pour la déconnexion)
                    if (item.onClick) {
                        return (
                            <a key={index} onClick={item.onClick} className={styles.menuItem}>
                                <span className={`${styles.icon} ${item.class}`}>{item.icon}</span>
                                <span className={`${styles.title} ${showTitles ? styles.showTitle : ''}`}>{item.title}</span>
                            </a>
                        );
                    }

                    // Rendu normal pour les autres éléments de menu
                    return (
                        <a key={index} href={item.link} className={styles.menuItem}>
                            <span className={`${styles.icon} ${item.class}`}>{item.icon}</span>
                            <span className={`${styles.title} ${showTitles ? styles.showTitle : ''}`}>{item.title}</span>
                        </a>
                    );
                })}
            </div>
            <span onClick={toggleCollapse} className={`${styles.toggleIcon} material-symbols-outlined ${isCollapsed ? styles.rotated : ''}`}>
                keyboard_arrow_left
            </span>

        </div>
    );
};

export default SidebarNavigation;
