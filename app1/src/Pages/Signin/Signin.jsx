import React, { useContext, useState } from 'react'
import { Input } from "@heroui/react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContxt } from '../../Components/Context/AuthContext/AuthContxt'

export default function Signin() {

    const [apiError, setApiError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const { setuserToken } = useContext(AuthContxt)

    const { register, handleSubmit } = useForm()

    function submitForm(userData) {

        setIsLoading(true)
        setApiError(null)

        axios.post(
            "https://route-posts.routemisr.com/users/signin",
            userData
        )
            .then((response) => {

                console.log("Login Success:", response.data)

                const token = response.data.data.token

                localStorage.setItem('token', token)

                // تحديث AuthContext
                setuserToken(token)
                navigate('/home')
            })
            .catch((error) => {

                console.log("Login Error:", error.response?.data)

                setApiError(error.response?.data)
            })
            .finally(() => {

                setIsLoading(false)

            })
    }

    return <>

        <div className="min-h-screen bg-pink-50 py-10">

            <div className="w-full max-w-md mx-auto p-6 bg-white rounded-3xl shadow-lg border border-pink-100 mt-10">

                <h1 className="text-3xl font-bold mb-6 text-center text-pink-600 tracking-wide">
                    Signin Now
                </h1>

                <form
                    onSubmit={handleSubmit(submitForm)}
                    className="space-y-4"
                >

                    {/* Email */}
                    <div className="w-full px-3 py-2.5 bg-pink-50 rounded-2xl border border-pink-100">

                        <Input
                            {...register('email')}
                            type="email"
                            aria-label="Email"
                            className="w-full"
                            placeholder="Enter your email"
                        />

                    </div>

                    {/* Password */}
                    <div className="w-full px-3 py-2.5 bg-pink-50 rounded-2xl border border-pink-100">

                        <Input
                            {...register('password')}
                            type="password"
                            aria-label="Password"
                            className="w-full"
                            placeholder="Enter your password"
                        />

                    </div>

                    {/* API Error */}
                    {apiError && (
                        <div className="bg-red-200 text-red-500 text-center py-2 font-bold rounded">

                            {apiError.message}

                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="font-bold w-full p-4 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl mt-3 transition duration-300"
                    >

                        {isLoading ? 'Loading...' : 'Sign In'}

                    </button>

                </form>

            </div>

        </div>

    </>
}

