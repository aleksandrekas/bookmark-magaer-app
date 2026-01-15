import './login.css'



export default function Login(){
    return (
        <div className="loginContainer">
            <img src="public/images/logo-light-theme.svg" alt="" className="bookmarkLogo" />
            <Log />
        </div>
    )
}



function Log(){
    return(
        <div className="container">
            <h1>Log in to your account</h1>
            <p>Welcome back! Please enter your details.</p>
            <form className='form' id='loginForm'>
                <label htmlFor="email" className='formLabel'>Email</label>
                <input type="text" id='email' className="formInput" />
                <label htmlFor="password" className='formLabel'>Password</label>
                <input type="password" id='password' className="formInput" />
                <button className='formBtn'>Log in</button>
            </form>
            <footer className="footer">
                <p className='footerP'>Forgot password?
                    <button>Reset it</button>
                </p>
                <p className='footerP'>Don't have an account?
                    <button>Sign up</button>
                </p>

            </footer>
        </div>
    )
}