import './login.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'


export default function Login(){
    const [selected,setSelected] = useState('login')
    return (
        <section className="loginSection">
            <div className="loginContainer">
                <img src="public/images/logo-light-theme.svg" alt="" className="bookmarkLogo" />
                <Log state={selected} setter={setSelected} />
                <Create state={selected} setter={setSelected} />
                <ResetPassword state={selected} setter={setSelected} />
            </div>
        </section>
    )
}



function Log({state,setter}:{state:string,setter:React.Dispatch<React.SetStateAction<string>>}){
    const [data,setData] = useState({
        email:'',
        password:'',
    })

    const navigate = useNavigate()

    function handleForm(e:React.ChangeEvent<HTMLInputElement>){
        e.preventDefault()
        const {name,value} = e.currentTarget
        setData((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    async function logIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            email: data.email,
            password: data.password,
            }),
        });

        const result = await response.json();
        if(result.token){
            try{
                localStorage.setItem("token",result.token) 
                navigate("/profile")
            }catch(err){
                console.log(err)
            }
        }
    }





    return(
        <div className="container " id='logIn'  style={{display:state === 'login' ? 'block' : 'none'}}>
            <h1>Log in to your account</h1>
            <p>Welcome back! Please enter your details.</p>
            <form className='form' id='loginForm' onSubmit={logIn}>
                <label htmlFor="email" className='formLabel'>Email</label>
                <input 
                onChange={handleForm} 
                type="text" 
                id='email' 
                className="formInput" 
                name='email' 
                value={data.email}
                />
                <label htmlFor="password" className='formLabel'>Password</label>
                <input 
                onChange={handleForm} 
                type="password" 
                id='password' 
                className="formInput" 
                name='password' 
                value={data.password}
                        />
                <button  className='formBtn'>Log in</button>
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
    const [data,setData] = useState({
        name:'',
        email:'',
        password:''
    })

    function handleForm(e:React.ChangeEvent<HTMLInputElement>){
        e.preventDefault()
        const {name,value} = e.currentTarget
        setData((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    async function signIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password
            }),
        });

        const result = await response.json();
        console.log(result);
    }

    console.log(data)


    return(
        <div className="container" id='signIn' style={{display:state === 'signup' ? 'block' : 'none'}}>
            <h1>Create your account</h1>
            <p>Join us and start saving your favorite links — organized, searchable, and always within reach.</p>
            <form id='createForm' className="form" onSubmit={signIn}>
                <label htmlFor="fullname" className="formLabel">Full name *</label>
                <input 
                    id='fullname' 
                    type="text" 
                    className='formInput' 
                    onChange={handleForm} 
                    value={data.name}
                    name='name'
                />
                <label htmlFor="email" className="formLabel">Email address *</label>
                <input 
                    type="text" 
                    id='email' 
                    className='formInput' 
                    onChange={handleForm}
                    value={data.email}
                    name='email'
                />
                <label htmlFor="password" className="formLabel">Password *</label>
                <input 
                    type="password" 
                    id='password' 
                    className='formInput' 
                    onChange={handleForm}
                    value={data.password}
                    name='password'
                />
                <button className='formBtn' >Create account</button>
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