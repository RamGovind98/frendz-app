// Validation.tsx
export interface ValidationObject {
    required?: boolean;
    message: string;
    pattern?: RegExp;
    min?: number;
}

export const usernameValidate = [
    {
        required: true,
        message: "Please enter username",
    },
    {
        min: 6,
        message: "Username must be at least 6 characters long",
    },
    {
        pattern: /^[a-zA-Z0-9]+$/,
        message: "Username must be alphanumeric",
    },
]


export const emailValidate = [
    {
        required: true,
        message: "Please enter an email address",
    },
    {
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Email address is not valid",
    },
]

export const passwordValidate = [
    {
        required: true,
        message: "Please enter password",
    },
    {
        min: 6,
        message: "Password must be at least 6 characters long",
    },
] 