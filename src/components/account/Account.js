import React, {useState} from 'react';
import "./Account.css"
import fingerprint from "./fingerprint-pana.svg"
import signup from "./signup.png"
import { useNavigate } from 'react-router-dom';
import { ImUserCheck, ImRadioUnchecked } from 'react-icons/im'
import { SHA256 } from 'crypto-js';

function Login({ logginUser }) {

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()

        const formData = {
            username: event.target.username.value,
            password: event.target.password.value
        }

        fetch("http://localhost:9292/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password
            })
        })
        .then(res => {
            if (res.status !== 200) {
                if(res.status === 404)  {
                    throw new Error("User Not Found")
                }
                else if(res.status === 401) {
                    throw new Error("Unauthorised")
                } else if(res.status === 403) {
                    throw new Error("Forbidden")
                }
            }
            return res.json()
        })
        .then(response => {
            logginUser(response)
            navigate("/home")
            localStorage.setItem("token", response.auth_token) 
        })
        .catch(err => {
            alert(err.message)
        })

        event.target.reset()
    }

    return (
        <div className="login-wrapper">
            <div className='login-page'>
                <div className='login-image'>
                    <h1>Sign In</h1>
                    <img src={fingerprint} alt='Login' />
                </div>
                <div className='login-form-div'>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <div className='input-fields'>
                            <label htmlFor='username'><span className='asterisk'>*</span>
                                <input name='username' type="text" placeholder='Username' />
                            </label>
                            <label htmlFor='username'><span className='asterisk'>*</span>
                                <input name='password' type="password" placeholder='Password' />
                            </label>
                        </div>
                        <a href='/signup'>Create account</a>
                        <input type="submit" value="Login" />
                    </form>
                </div>
            </div>
        </div>
    )
}

function Signup() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        avatar: "",
        firstname: "",
        lastname: "",
        emailaddress: "",
        phonenumber: "",
        password: "",
        confirmpassword: ""
    })

    function handleSubmit(event) {
        event.preventDefault()

        const validatedFormData = {...formData}
        delete validatedFormData.confirmpassword
        validatedFormData.password = SHA256(validatedFormData.password).toString()

        fetch("http://localhost:9292/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(validatedFormData)
        })
        .then(res => res.json())
        .then(data => {
            navigate("/login")
            setFormData({
                username: "",
                avatar: "",
                firstname: "",
                lastname: "",
                emailaddress: "",
                phonenumber: 7,
                password: "",
                confirmpassword: ""
            })
        })
    }

    function handleChange(event) {
        setFormData({...formData, [event.target.name] : event.target.value})
    }

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                resolve(fileReader.result)
                //replace('data:', '').replace(/^.+,/, '')
            }

            fileReader.onerror = (error) => reject(error)
        })
    }

    async function uploadImage(file) {
        const base64 = await convertToBase64(file)
        setFormData({...formData, "avatar" : base64})
    }

    function handleImageUpload(event) {
        uploadImage(event.target.files[0])
    }

    return (
        <div className="login-wrapper">
            <div className='login-page'>
                <div className='signup-image'>
                    <h1>Register</h1>
                    <img src={signup} alt='Login' />
                </div>
                <div className='login-form-div'>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <div className='input-fields'>
                            <label htmlFor='username'><span className='asterisk'>*</span>
                                <input className={formData.username.length>4 ? "valid" : "invalid"} name='username' value={formData.username} onChange={handleChange} type="text" placeholder='Username' required autoComplete='true' />
                            </label>
                            <label htmlFor="avatar">
                                <span className='optional'>*</span>
                                <span className='input-file-label'>Choose Profile Image</span>
                                <div className='avatar-chosen'>
                                    {Boolean(formData.avatar) ? <ImUserCheck /> : <ImRadioUnchecked />}
                                </div>
                                <input id='avatar' onChange={handleImageUpload} name='avatar' type="file" />
                            </label>
                            <label htmlFor="username"><span className='asterisk'>*</span>
                                <input className={formData.firstname.length>3 ? "valid" : "invalid"} name='firstname' value={formData.firstname} onChange={handleChange} type="text" placeholder='Firstname' required/>
                            </label>
                            <label htmlFor="lastname"><span className='asterisk'>*</span>
                                <input className={formData.lastname.length>3 ? "valid" : "invalid"} name='lastname' value={formData.lastname} onChange={handleChange} type="text" placeholder='Lastname' required />
                            </label>
                            <label htmlFor="emailaddress"><span className='asterisk'>*</span>
                                <input className={formData.emailaddress.includes("@") ? "valid" : "invalid"} name='emailaddress' value={formData.emailaddress} onChange={handleChange} type="email" placeholder='Email' required />
                            </label>
                            <label htmlFor="phonenumber"><span className='asterisk'>*</span>
                                <input className={formData.phonenumber.length<9 ? "invalid" : "valid"} name='phonenumber' value={formData.phonenumber} onChange={handleChange} type="number" placeholder='Phonenumber' required/>
                            </label>
                            <label htmlFor="password"><span className='asterisk'>*</span>
                                <input className={formData.password.length>8 ? "valid" : "invalid"} name='password' value={formData.password} onChange={handleChange} type="password" placeholder='Password' required autoComplete="cc-csc" />
                            </label>
                            <label htmlFor="confirmpassword"><span className='asterisk'>*</span>
                                <input className={formData.confirmpassword.length>8 ? "valid" : "invalid"} name='confirmpassword' value={formData.confirmpassword} onChange={handleChange} type="password" placeholder='Confirm Password' required autoComplete="cc-csc" />
                            </label>
                        </div>
                        <a href='/login'>Already have an account? Login</a>
                        <input type="submit" value="Signup" />
                    </form>
                </div>
            </div>
        </div>
    )
}


export { Login, Signup}
