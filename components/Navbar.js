import React, {useState, useEffect} from 'react';

import styles from '../styles/Navbar.module.css';


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const closeMenuOnOutsideClick = (event) => {
            // Vérifie si le menu est ouvert et si le clic a été effectué en dehors du menu
            if (isMenuOpen && !event.target.closest(`.${styles.navbar}`)) {
                setIsMenuOpen(false);
            }
        };

        // Ajouter l'écouteur d'événements sur le document
        document.addEventListener('mousedown', closeMenuOnOutsideClick);

        // Nettoyer l'écouteur d'événements lors du démontage du composant
        return () => {
            document.removeEventListener('mousedown', closeMenuOnOutsideClick);
        };
    }, [isMenuOpen]);
    const toggleMenu = () => {
        if (!isMenuOpen) {
            // Désactiver le scroll en définissant overflow: hidden sur le body
            document.body.style.overflow = 'hidden';
        } else {
            // Réactiver le scroll en remettant overflow à son état initial
            document.body.style.overflow = '';
        }
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        setIsMenuOpen(true);
    };

    return (
        <div className = {styles.navigation_bar_container}>
            <div className = {styles.logo}>
                <img src = "/Logo/horisontalLogo.svg" alt = "logo"/>
            </div>
            {!isMenuOpen &&  <div className={`${styles.menuBurger}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>}

            <div className={`${styles.navbar} ${isMenuOpen ? styles.navbarActive : ''}`}>
                {isMenuOpen &&  <div className={`${styles.menuBurgerClose}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                </div>}
                <a className = {styles.navLink} href = "/blog">Ressources Éducatives</a>
                <a className = {styles.navLink} href = "/faq">FAQ</a>
                <a className = {styles.navLink} href = "/contact">Contact</a>
                <a className = {styles.navLink} href = "/Tarifs">Tarifs</a>
                <a className = {styles.navLink} href = "/Demo">Demo</a>
                {isMenuOpen &&  <a className = {styles.navLink} href = "/login">Login</a>}
            </div>
            <a className = {`${styles.login} ${styles.navLink}`}  href = "/login">Login</a>
        </div>
    );
}

export default Navbar;
