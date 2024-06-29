import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/useFetch';

const SignUp = () => {
    const [userData, setUserData] = useState({
        email: "",
        pass: ""
    });

    const handleSignUp = () => {
        const { data } = useFetch("http://localhost:3050/patientauth/register")
        console.log(data);
        console.log('Sign up with:', userData);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <div className="text-right">
                    <a href="/login" className="text-gray-600">Login</a>
                </div>
                <form onSubmit={handleSignUp}>
                    <h2 className="text-2xl font-bold text-center mb-6">Create an account</h2>
                    <label className="text-center text-gray-600 mb-6">

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
                        value={userData.pass}
                        onChange={(e) => setUserData((prevData) => ({
                            ...prevData,
                            pass: e.target.value
                        }))}
                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                    />
                    <Button type="submit" onClick={handleSignUp} className="w-full p-3 bg-black text-white rounded-md">Sign In with Email</Button>
                </form>
                <p className="text-center text-gray-600 text-sm mt-6">
                    By clicking continue, you agree to our <a href="/terms" className="underline">Terms of Service</a> and <a href="/privacy" className="underline">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
};

export default SignUp;
