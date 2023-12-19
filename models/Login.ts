import * as Yup from "yup";

export const LoginInputSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
        // .min(8, "Password must be at least 8 characters"),
});

export type LoginInput = Yup.InferType<typeof LoginInputSchema>;

const LoginResultSchema = Yup.object({
    user : Yup.object({
        id : Yup.number(),
        name: Yup.string(),
        email : Yup.string(),
        // phone: Yup.string(),
        role: Yup.string()
    }),
    jwt: Yup.object({
        token: Yup.string(),
        token_type: Yup.string(),
        expiresIn: Yup.string()  
    })
});

export type LoginResult = Yup.InferType<typeof LoginResultSchema>;