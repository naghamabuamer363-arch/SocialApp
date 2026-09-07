import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export default function ChangePassword() {

    const [error, setError] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
         mode: 'onBlur',
        defaultValues: {
            password: '',
            newPassword: '',
            confirmPassword: ''
        }
    })

    function handleChangePassword(data) {

        if (data.newPassword !== data.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        setError('')
        mutate(data)
    }

    function changePassword(data) {

        return axios.patch(
            'https://route-posts.routemisr.com/users/change-password',
            {
                password: data.password,
                newPassword: data.newPassword
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
    }

    const { mutate, isPending } = useMutation({

        mutationFn: changePassword,

        onSuccess: (response) => {
            toast.success('Password changed successfully')
            console.log('Password changed successfully')
            console.log(response.data)

        },

        onError: (error) => {
            toast.error("Password can't be changed")
            console.log("Password can't be changed")
            console.log(error.response?.data)

            setError(
                error.response?.data?.message ||  "Password can't be changed"
            )

        }

    })

    return (
        <form onSubmit={handleSubmit(handleChangePassword)}>

            <div className="min-h-screen bg-pink-50 pt-24 pb-10 flex items-center justify-center">

                <div className="w-full max-w-md bg-white border-2 border-pink-300 rounded-2xl p-6 shadow-lg">

                    {/* Icon */}
                    <div className="flex justify-center mb-3">

                        <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="size-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-1.5 0h12a1.5 1.5 0 0 1 1.5 1.5v8.25a1.5 1.5 0 0 1-1.5 1.5h-12a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5Z"
                                />
                            </svg>

                        </div>

                    </div>

                    <h2 className="text-2xl font-bold text-pink-600 text-center">
                        Change Password
                    </h2>

                    <p className="text-gray-400 text-sm text-center mt-2 mb-6">
                        Change your password to keep your account secure.
                    </p>


                    {/* Current Password */}
                    <div className="mb-4">

                        <label className="block text-sm font-medium text-pink-950 mb-2">
                            Current Password
                        </label>

                        <input
                            {...register('password', {
                                required: 'Current Password is required'
                            })}
                            type="password"
                            placeholder="Enter your current password"
                            className="w-full h-11 px-3 border border-pink-300 rounded-xl outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}

                    </div>


                    {/* New Password */}
                    <div className="mb-4">

                        <label className="block text-sm font-medium text-pink-950 mb-2">
                            New Password
                        </label>

                        <input
                            {...register('newPassword', {
                                required: 'New Password is required',

                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                    message: 'Password must contain uppercase, lowercase, number, special character and at least 8 characters'
                                }
                            })}
                            type="password"
                            placeholder="Enter New Password"
                            className="w-full h-11 px-3 border border-pink-300 rounded-xl outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                        />

                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}

                    </div>


                    {/* Confirm New Password */}
                    <div className="mb-4">

                        <label className="block text-sm font-medium text-pink-950 mb-2">
                            Confirm New Password
                        </label>

                        <input
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required'
                            })}
                            type="password"
                            placeholder="Enter to Confirm New Password"
                            className="w-full h-11 px-3 border border-pink-300 rounded-xl outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                        />

                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}

                    </div>


                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm mt-1 mb-3 text-center">
                            {error}
                        </p>
                    )}


                    {/* Change Password Button */}
                    <button
                        disabled={isPending}
                        type="submit"
                        className="w-full h-11 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white rounded-xl font-semibold transition"
                    >
                        {isPending ? 'Changing...' : 'Change Password'}
                    </button>

                </div>

            </div>

        </form>
    )
}