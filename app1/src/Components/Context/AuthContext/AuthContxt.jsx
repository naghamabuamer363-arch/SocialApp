import React from 'react'
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export let AuthContxt = createContext()

export default function AuthContxtProvider({ children }) {

    // Lazy Initialization
    const [userToken, setuserToken] = useState(() => {
        return localStorage.getItem('token')
    })

    const [userData, setuserData] = useState(null)

    // Get User Data
    async function getUserData() {
        let { data } = await axios.get(
            `https://route-posts.routemisr.com/users/profile-data`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        console.log(data)
        setuserData(data.data.user)
    }

    // To refresh
    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token) {
            setuserToken(token)
            getUserData()
        }
    }, [])

    return (
        <AuthContxt.Provider
            value={{
                userToken,
                setuserToken,
                userData,
                setuserData
            }}
        >
            {children}
        </AuthContxt.Provider>
    )
}