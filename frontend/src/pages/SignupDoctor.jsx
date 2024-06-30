import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


const SignUpDoctor = () => {
    const navigate = useNavigate();

    console.log(BASE_URL)

    console.log(`${BASE_URL}/doctorauth/register`)

    const [userData, setUserData] = useState({
        email: "",
        password: "",
        availability: [
            {
                "day": "Monday",
                "startTime": "09:00",
                "endTime": "17:00"
            },
            {
                "day": "Wednesday",
                "startTime": "09:00",
                "endTime": "17:00"
            }
        ]
    });

    const handleSignUp = async (e) => {
        e.preventDefault()
        console.log(userData)
        try {
            const response = await axios.post(`${BASE_URL}/doctorauth/register`, userData)
            console.log('SignUp with:', response);
        }
        catch (e) {
            console.log(e)
        }
        navigate("/login/doctor")
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">

                <form onSubmit={handleSignUp}>
                    <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">CREATE AN ACCOUNT</h2>
                    <label className="text-center text-gray-600 mb-6">
                        Email
                    </label>
                    <Input
                        type="email"
                        placeholder="doctor@mail.com"
                        value={userData.email}
                        onChange={(e) => setUserData((prevData) => ({
                            ...prevData,
                            email: e.target.value
                        }))}
                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                    />
                    <label className="text-center text-gray-600 mb-6">
                        Password
                    </label>
                    <Input
                        type="password"
                        placeholder="*******"
                        value={userData.password}
                        onChange={(e) => setUserData((prevData) => ({
                            ...prevData,
                            password: e.target.value
                        }))}
                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                    />
                    <Button type="submit" className="w-full p-3 rounded-lg bg-blue-600 text-white ">Sign Up</Button>
                </form>
                <p className="text-center text-gray-600 text-sm mt-6">
                    By clicking continue, you agree to our <a href="/terms" className="underline text-blue-400">Terms of Service</a> and <a href="/privacy" className="underline text-blue-400">Privacy Policy</a>.
                </p>

                <div className="text-center text-lg mt-5 font-bold text-blue-600">
                    <a href="/login/doctor" className="mt-40 text-sm">
                        <span className="text-gray-600">Already have an Account?</span>
                        <span className="underline"> Log In</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignUpDoctor;
