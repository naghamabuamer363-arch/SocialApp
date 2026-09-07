import React, { useState, useContext } from 'react'
import { Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Schema } from '../../Schema/SignupSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { AuthContxt } from '../../Components/Context/AuthContext/AuthContxt';


export default function Signup() {

    const [apiErorr, setapiErorr] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    let { setuserToken } = useContext(AuthContxt)

    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(Schema),
        mode: 'onBlur'
    })

    function submitForm(userData) {

        setIsLoading(true)

        axios.post(
            "https://route-posts.routemisr.com/users/signup",
            userData
        )
            .then((response) => {
                if(response.data.message === 'account created'){
                    setuserToken(response.data.data.token)
                    localStorage.setItem('token' , response.data.data.token )
                }

                console.log('Success:', response.data)
                console.log("Before Navigate");
                navigate('/home')
            })
            .catch((erorr) => {
                console.log('Fail:', erorr.response?.data)
                setapiErorr(erorr.response?.data)
            })
            .finally(() => {
                setIsLoading(false)
            })

        console.log('Data:', userData)
    }


    return <>

        <div className="min-h-screen bg-pink-50 py-10">

            <div className="w-full max-w-md mx-auto p-6 bg-white rounded-3xl shadow-lg border border-pink-100 mt-10">

                <h1 className="text-3xl font-bold mb-6 text-center text-pink-600 tracking-wide">
                    Signup Now
                </h1>

                <form
                    onSubmit={handleSubmit(submitForm)}
                    className="space-y-4"

                >


                    {/* Name */}
                    <div className="w-full">

                        <div className="px-3 py-2.5 bg-pink-50 rounded-2xl border-white border-pink-100">
                            <Input
                                {...register('name')}
                                aria-label="Name"
                                className="w-full"
                                placeholder="Enter your name"
                            />
                        </div>

                        {formState.errors.name && (
                            <div className="bg-red-400 border  px-3 py-1 ">
                                <p className="text-white text-sm font-medium">
                                    {formState.errors.name.message}
                                </p>
                            </div>
                        )}

                    </div>


                    {/* Username */}
                    <div className="w-full">

                        <div className="px-3 py-2.5 bg-pink-50 rounded-2xl border-white border-pink-100">
                            <Input
                                {...register('username')}
                                aria-label="Username"
                                className="w-full"
                                placeholder="Enter your username"
                            />
                        </div>

                        {formState.errors.username && (
                            <div className="bg-red-400 border  px-3 py-1 ">
                                <p className="text-white text-sm font-medium">
                                    {formState.errors.username.message}
                                </p>
                            </div>
                        )}

                    </div>


                    {/* Email */}
                    <div className="w-full">

                        <div className="px-3 py-2.5 bg-pink-50 rounded-2xl border-white border-pink-100">
                            <Input
                                {...register('email')}
                                type="email"
                                aria-label="Email"
                                className="w-full"
                                placeholder="Enter your email"
                            />
                        </div>

                        {formState.errors.email && (
                            <div className="bg-red-400 border  px-3 py-1 ">
                                <p className="text-white text-sm font-medium">
                                    {formState.errors.email.message}
                                </p>
                            </div>
                        )}

                    </div>


                    {/* Password */}
                    <div className="w-full">

                        <div className="px-3 py-2.5 bg-pink-50 rounded-2xl border-white border-pink-100">
                            <Input
                                {...register('password')}
                                type="password"
                                aria-label="Password"
                                className="w-full"
                                placeholder="Enter your password"
                            />
                        </div>

                        {formState.errors.password && (
                            <div className="bg-red-400 border  px-3 py-1 ">
                                <p className="text-white text-sm font-medium">
                                    {formState.errors.password.message}
                                </p>
                            </div>
                        )}

                    </div>


                    {/* RePassword */}
                    <div className="w-full">

                        <div className="px-3 py-2.5 bg-pink-50 rounded-2xl border-white border-pink-100">
                            <Input
                                {...register('rePassword')}
                                type="password"
                                aria-label="RePassword"
                                className="w-full"
                                placeholder="Confirm your password"
                            />
                        </div>

                        {formState.errors.rePassword && (
                            <div className="bg-red-400 border  px-3 py-1 ">
                                <p className="text-white text-sm font-medium">
                                    {formState.errors.rePassword.message}
                                </p>
                            </div>
                        )}

                    </div>


                    {/* Date Of Birth */}
                    <div className="w-full">

                        <div className="px-3 py-2.5 bg-pink-50 rounded-2xl border-white border-pink-100">
                            <Input
                                {...register('dateOfBirth')}
                                type="date"
                                aria-label="Date Of Birth"
                                className="w-full"
                            />
                        </div>

                        {formState.errors.dateOfBirth && (
                            <div className="bg-red-400 border  px-3 py-1 ">
                                <p className="text-white text-sm font-medium">
                                    {formState.errors.dateOfBirth.message}
                                </p>
                            </div>
                        )}

                    </div>


                    {/* Gender */}
                    <div className="w-full">

                        <div className="px-3 py-2.5 bg-pink-50 rounded-2xl border-white border-pink-100">
                            <select
                                {...register('gender')}
                                className="w-full px-3 py-3 bg-pink-50 outline-none"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Choose a Gender
                                </option>

                                <option value="male">
                                    Male
                                </option>

                                <option value="female">
                                    Female
                                </option>
                            </select>
                        </div>

                        {formState.errors.gender && (
                            <div className="bg-red-400 border-white  px-3 py-1 ">
                                <p className="text-white text-sm font-medium">
                                    {formState.errors.gender.message}
                                </p>
                            </div>
                        )}

                    </div>

                    {/* API Error */}
                    {apiErorr && (
                        <div className="bg-red-200 text-red-500 text-center py-2 font-bold rounded">
                            {apiErorr.message}
                        </div>
                    )}


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="font-bold w-full p-4 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl mt-3 transition duration-300"
                    >
                        {isLoading ? 'Loading...' : 'SignUp'}
                    </button>

                </form>

            </div>

        </div>

    </>
}

