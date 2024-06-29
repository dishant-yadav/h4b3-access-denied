import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from "axios";

const Login = () => {
    const [userData, setUserData] = useState({
        email: "anik@gmail.com",
        password: "1234567"
    });

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(userData)
        try {
            const response = await axios.post("http://localhost:3050/patientauth/login", userData)
            console.log('Login with:', response);
        }
        catch (e) {
            console.log(e)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <div className="text-right">
                    <a href="/signup" className="text-gray-600">Sign Up</a>
                </div>
                <form onSubmit={handleLogin}>
                    <h2 className="text-2xl font-bold text-center mb-6">Create an account</h2>
                    <label className="text-center text-gray-600 mb-6">
                        Email
                    </label>
                    <Input
                        type="email"
                        placeholder="name@example.com"
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
                    <Button type="submit" className="w-full p-3 bg-black text-white rounded-md">Sign In with Email</Button>

                    <p className="text-center text-gray-600 text-sm mt-6">
                        By clicking continue, you agree to our <a href="/terms" className="underline">Terms of Service</a> and <a href="/privacy" className="underline">Privacy Policy</a>.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
