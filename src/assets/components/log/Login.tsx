import './login.css'
import React, { useState } from 'react'


export default function Login(){
    const [selected,setSelected] = useState('login')
    return (
        <div className="loginContainer">
            <img src="public/images/logo-light-theme.svg" alt="" className="bookmarkLogo" />
            <Log state={selected} setter={setSelected} />
            <Create state={selected} setter={setSelected} />
            <ResetPassword state={selected} setter={setSelected} />
        </div>
    )
}



function Log({state,setter}:{state:string,setter:React.Dispatch<React.SetStateAction<string>>}){

    return(
        <div className="container"  style={{display:state === 'login' ? 'block' : 'none'}}>
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
                    <button onClick={()=>{setter('reset')}}>Reset it</button>
                </p>
                <p className='footerP'>Don't have an account?
                    <button onClick={()=>{setter('signup')}}>Sign up</button>
                </p>

            </footer>
        </div>
    )
}



function Create({state,setter}:{state:string,setter:React.Dispatch<React.SetStateAction<string>>}){
    return(
        <div className="container" style={{display:state === 'signup' ? 'block' : 'none'}}>
            <h1>Create your account</h1>
            <p>Join us and start saving your favorite links — organized, searchable, and always within reach.</p>
            <form id='createForm' className="form">
                <label htmlFor="fullname" className="formLabel">Full name *</label>
                <input id='fullname' type="text" className='formInput' />
                <label htmlFor="email" className="formLabel">Email address *</label>
                <input type="text" id='email' className='formInput' />
                <label htmlFor="password" className="formLabel">Password *</label>
                <input type="password" id='password' className='formInput' />
                <button className='formBtn'>Create account</button>
                <footer className="footer">
                    <p className='footerP'>Already have an account?
                        <button onClick={()=>{setter('login')}}>Log in</button>
                    </p>
                </footer>
            </form>
        </div>
    )
}


function ResetPassword({state,setter}:{state:string,setter:React.Dispatch<React.SetStateAction<string>>}){
    return(
       <div className="container" id='resetpassword' style={{display:state === 'reset' ? 'block' : 'none'}}>
        <h1>Forgot your password?</h1>
        <p>Enter your email address below and we’ll send you a link to reset your password.</p>
        <form id='reasetpassword' className="form">
            <label htmlFor="email" className="formLabel">Email *</label>
            <input type="text" id='email' className="formInput" />
            <button className='formBtn'>Send reset link</button>
                <footer className="footer">
                    <p className='footerP'>
                        <button onClick={()=>{setter('login')}}>Back to login</button>
                    </p>
                </footer>            
        </form>
       </div> 
    )
}