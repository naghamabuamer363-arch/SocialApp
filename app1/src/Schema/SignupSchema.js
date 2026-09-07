import React from 'react'
import * as zod from "zod";

export let Schema = zod.object({

    name: zod
        .string()
        .nonempty('Name is required')
        .min(4, 'Name must be at least 4 letters')
        .max(8, 'Name must be at most 8 letters'),

    username: zod
        .string()
        .nonempty('Username is required')
        .regex(
            /^[a-z0-9_]{3,30}$/,
            'Use lowercase letters, numbers, and _ only (5-30 characters)'
        ),

    email: zod
        .string()
        .nonempty('Email is required')
        .email('Enter a valid email'),

    password: zod
        .string()
        .nonempty('Password is required')
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            'Use 8+ characters, uppercase, lowercase, number, and symbol'
        ),

    gender: zod
        .string()
        .nonempty('Gender is required'),

    rePassword: zod
        .string()
        .nonempty('Please confirm your password'),

    dateOfBirth: zod.coerce.date()
        .refine((dateVal) => {
            let current = new Date().getFullYear();
            let year = dateVal.getFullYear();
            let age = current - year;

            return age > 20;
        }, {
            message: 'Age must be greater than 20'
        })

}).refine(
    (obj) => {
        return obj.password === obj.rePassword;
    },
    {
        path: ['rePassword'],
        message: 'Passwords do not match'
    }
)