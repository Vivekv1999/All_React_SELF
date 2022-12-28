import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import Home from './Home'

export default function Homeaxo() {
    const [value, setvalue] = useState({ email: "", name: "", password: "", cpassword: "" })

    const handlechange = (e) => {
        setvalue({ ...value, [e.target.name]: e.target.value })
        console.log(value);

    }

    const handleSubmit = async () => {
        const { email, name, password } = value
        const res = await axios.post("http://localhost:3008/user", { Email: email, Username: name, Password: password })
        // const ddd = await res.data
        console.log(res,"ddddddddddd");

    }
    return (
        <>

            <div className="container col-7" style={{ margin: "0px auto", border: "2px solid grey" }}>
                <h1 style={{ textAlign: "center" }}>Axios method</h1>
                <form action="" onSubmit={handleSubmit} >

                    <div className="container my-3">
                        <label className='col-5'>enter yout name : </label>
                        <input type='text' name="name" value={value.name} onChange={handlechange} /><br />
                    </div>
                    <div className="container my-3">
                        <label className='col-5'>enter yout Email : </label>
                        <input type='text' name="email" value={value.email} onChange={handlechange} /><br />
                    </div>
                    <div className="container my-3">
                        <label className='col-5'>enter yout Password : </label>
                        <input type='text' name="password" value={value.password} onChange={handlechange} /><br />
                    </div>
                    <div className="container my-3">
                        <label className='col-5'>enter yout Cpassword : </label>
                        <input type='text' name="cpassword" value={value.cpassword} onChange={handlechange} /><br />
                    </div>

                    <div className="container col-5 my-4" >
                        <input type='submit' className="button login__submit" placeholder='sign up' />
                    </div>
                </form>

            </div>
            <Home/>


        </>
    )
}
