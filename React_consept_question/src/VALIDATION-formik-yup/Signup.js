import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { validateYup } from './ValidateYup'

const arr=[]

export default function Signup() {
    const [initialValues, setinitialValues] = useState({ name: "", email: "", password: "", cpassword: "" })

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: validateYup,
        onSubmit: (values) => {
            const { name, email, password, cpassword } = values
            arr.push({name:name,email:email,password:password,cpassword:cpassword})       
            console.log(arr,"yeeessss");
        }
    })
    console.log('error', errors);
    


    return (
        <>
            <div className="container col-7" style={{ margin: "0px auto", border: "2px solid grey" }}>
                <form action="" onSubmit={handleSubmit} >
                    
                    <div className="container my-3">
                        <label className='col-5'>enter yout name : </label>
                        <input type='text' name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} /><br />
                        {errors.name && touched.name ? <span style={{ color: "red" }}>{errors.name}</span> : null}
                    </div>
                    <div className="container my-3">
                        <label className='col-5'>enter yout Email : </label>
                        <input type='text' name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} /><br />
                        {errors.email && touched.email ? <span className='col-6' style={{ color: "red", }}>{errors.email}</span> : null}
                    </div>
                    <div className="container my-3">
                        <label className='col-5'>enter yout Password : </label>
                        <input type='text' name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} /><br />
                        {errors.password && touched.password ? <span style={{ color: "red" }}>{errors.password}</span> : null}
                    </div>
                    <div className="container my-3">
                        <label className='col-5'>enter yout Cpassword : </label>
                        <input type='text' name="cpassword" value={values.cpassword} onChange={handleChange} onBlur={handleBlur} /><br />
                        {errors.cpassword && touched.cpassword ? <span style={{ color: "red" }}>{errors.cpassword}</span> : null}
                    </div>

                    <input type='submit' className="button login__submit" placeholder='sign up' />
                </form>

            </div>


        </>
    )
}
