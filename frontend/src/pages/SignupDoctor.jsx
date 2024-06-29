import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpDoctor = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const handleSignUp = async (e) => {
        e.preventDefault()
        console.log(userData)
        try {
            const response = await axios.post("http://localhost:3050/doctorauth/register", userData)
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
                <div className="text-right">
                    <a href="/login/doctor" className="text-gray-600">Login</a>
                </div>
                <form onSubmit={handleSignUp}>
                    <h2 className="text-2xl font-bold text-center mb-6">Create an account</h2>
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
                    <Button type="submit" className="w-full p-3 bg-black text-white rounded-md">Sign In</Button>
                </form>
                <p className="text-center text-gray-600 text-sm mt-6">
                    By clicking continue, you agree to our <a href="/terms" className="underline">Terms of Service</a> and <a href="/privacy" className="underline">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
};

export default SignUpDoctor;
