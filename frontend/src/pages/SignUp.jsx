import React from 'react'
import { useParams } from 'react-router-dom'
import SignUpDoctor from "./SignupDoctor"
import SignUpPatient from "./SignupPatient"

const SignUp = () => {
    const { type } = useParams();

    console.log(type)

    const Form = {
        "doctor": SignUpDoctor,
        "patient": SignUpPatient
    }

    const RenderForm = Form[type]

    return (
        <RenderForm />
    )
}

export default SignUp