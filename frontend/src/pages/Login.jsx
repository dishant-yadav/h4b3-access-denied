import React from 'react'
import { useParams } from 'react-router-dom'
import LoginDoctor from './LoginDoctor';
import LoginPatient from './LoginPatient';

const Login = () => {
    const { type } = useParams();

    console.log(type)

    const Form = {
        "doctor": LoginDoctor,
        "patient": LoginPatient
    }

    const RenderForm = Form[type]

    return (
        <RenderForm />
    )
}

export default Login