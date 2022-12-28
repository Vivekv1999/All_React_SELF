import * as Yup from "yup"


export const validateYup = Yup.object({
    name: Yup.string().min(2).max(25).required("Enter Correct name"),
    email: Yup.string().email().required("Enter Correct Email"),
    password: Yup.string().min(3).required("Enter Correct password"),
    cpassword: Yup.string().required().oneOf([Yup.ref('password'), null], "password is not match")
})