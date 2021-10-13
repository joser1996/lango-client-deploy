import styles from "./LoginPage.module.css";
import evalBool  from "../global.js"
const LoginPage = () => {

    const googleLogin = () => {
        console.log("Logging in")
        if (evalBool(process.env.REACT_APP_DEV_MODE)) {
            console.log("Developer mode");
            window.open(`http://localhost:4000/auth/google`, '_self');
        } else {
            console.log("Deployed Mode");
            window.open(`${process.env.REACT_APP_HOST}/auth/google`, '_self');
        }
        
    };

    return(
        <main id={styles.loginPage}>
            <div id={styles.leftSide}>
                <div id="welcome-text">
                    <p id={styles.ttl}>Welcome to Lango!</p>
                    <p id={styles.sub}>Customize your vocabulary</p>
                </div>
            </div>
            <div id={styles.rightSide}>
                <div onClick={googleLogin} className={styles.googleBtn}>
                    <div className={styles.googleIconWrapper}>
                        <img className={styles.googleIcon}
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="Google Login Button"
                        />
                    </div>
                    <p className={styles.btnText}><b>Sign in with google</b></p>                   
                </div>
            </div>
        </main>
    );
};

export default LoginPage;