import React, {useState , useEffect} from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import styles from '../../styles/Signup.module.css'
import { useRouter } from 'next/router';
import Image from "next/image";

function SugnUp() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [pseudoError, setPseudoError] = useState("");
    const { logIn } = useAuth();

    useEffect(() => {
        setFirstNameError("")
    }, [firstName]);
    useEffect(() => {
        setLastNameError("")
    }, [lastName]);
    useEffect(() => {
        setFirstNameError("")
    }, [password, confirmPassword]);

    useEffect(() => {
        setEmailError("")
    }, [email ]);

    useEffect(() => {
        setPseudoError("")
    }, [pseudo ]);


    const validateEmail = (email) => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    };
    const handleSignUpClick = async () => {
        if (!firstName) {
            setFirstNameError("Le nom ne peu pas etre vide");
            return;
        }
        if (!lastName) {
            setLastNameError("Le prénom ne peu pas etre vide");
            return;
        }
        if (confirmPassword !== password) {
            setPasswordError("Les mots de passe ne correspondent pas.");
            return;
        }
        if (!validateEmail(email)) {
            setEmailError("L'Email n'est pas valide");
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, pseudo, password, firstName, lastName })
            });
            const data = await response.json();
            if (!response.ok) {
                // Utilisez les données déjà lues pour obtenir le message d'erreur
                throw new Error(data.message || 'Erreur inconnue');
            }
            if (data.jwtToken) {
                logIn(data.jwtToken);
                router.push('/');
            }
        } catch (error) {
            if (error.message === "User with this email already exists"){
                setEmailError("User with this email already exists")
            }else if (error.message === "User with this pseudo already exists"){
                setPseudoError("User with this email already exists")
            }

        }
    };

    return (
        <>
            <main className={styles.mainContent}>
                <div className={styles.page_content}>
                    <div className={styles.page_inner_container}>
                        <div className={styles.left_side}>
                            <div className={styles.image_container}>
                                <Image
                                    src="/Auth/signUp.svg"
                                    alt="Développeuse ajustant une interface de connexion sur un écran de smartphone géant avec des éléments de design flottants et une plante."
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                        <div className={styles.right_side}>
                            <div className={styles.form_title}>
                                <h1>Créez Votre Compte</h1>
                            </div>
                            <form className={styles.form}>
                                <div className={styles.form_group}>
                                    <div className={styles.group_small}>
                                        <input className={styles.input} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                                        <span className={styles.highlight}></span>
                                        <span className={styles.bar}></span>
                                        <label className={styles.input_label}>Nom</label>
                                        {firstNameError && <span className={styles.input_label_error}>{firstNameError}</span>}
                                    </div>
                                    <div className={styles.group_small}>
                                        <input className={styles.input} type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                                        <span className={styles.highlight}></span>
                                        <span className={styles.bar}></span>
                                        <label className={styles.input_label}>Prénom</label>
                                        {lastNameError && <span className={styles.input_label_error}>{lastNameError}</span>}
                                    </div>
                                </div>

                                <div className={styles.group}>
                                    <input className={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                    <span className={styles.highlight}></span>
                                    <span className={styles.bar}></span>
                                    <label className={styles.input_label} >Email</label>
                                    {emailError && <span className={styles.input_label_error}>{emailError}</span>}
                                </div>
                                <div className={styles.group}>
                                    <input className={styles.input} type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} required/>
                                    <span className={styles.highlight}></span>
                                    <span className={styles.bar}></span>
                                    <label className={styles.input_label}>Pseudo</label>
                                    {pseudoError && <span className={styles.input_label_error}>{pseudoError}</span>}
                                </div>
                                <div className={styles.group}>
                                    <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                    <span className={styles.highlight}></span>
                                    <span className={styles.bar}></span>
                                    <label className={styles.input_label}>Mot de passe</label>
                                    {passwordError && <span className={styles.input_label_error}>{passwordError}</span>}
                                </div>
                                <div className={styles.group}>
                                    <input className={styles.input} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                                    <span className={styles.highlight}></span>
                                    <span className={styles.bar}></span>
                                    <label className={styles.input_label}> Confirmer le mot de passe </label>
                                    {passwordError && <span className={styles.input_label_error}>{passwordError}</span>}
                                </div>
                                <button type="button"  onClick={handleSignUpClick} className={styles.submit_button}>S'inscrire</button>
                                <span className={styles.separation}></span>

                                <div className={styles.social_login}>
                                    <div className="g-signin2" data-onsuccess="onSignIn"></div>
                                    {/*    <button className={styles.google_button}>Se connecter avec Google</button>*/}
                                    {/*    <button className={styles.facebook_button}>Se connecter avec Facebook</button>*/}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/*<button onClick={handleSignUpClick}>*/}
            {/*</button>*/}
        </>
    );
}

export default SugnUp;
