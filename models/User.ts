import * as Yup from "yup";

export const UserInputSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    phone: Yup.string().required("Phone is required"),
    roles: Yup.array().required("Roles is required"),
        // .min(8, "Password must be at least 8 characters"),
});

export type UserInput = Yup.InferType<typeof UserInputSchema>;

const UserResultSchema = Yup.object({
    id : Yup.number(),
    name: Yup.string(),
    email: Yup.string(),
    password: Yup.string(),
    phone: Yup.string(),
    roles: Yup.array(),
})

export type UserResult = Yup.InferType<typeof UserResultSchema>;

// const LoginResultSchema = Yup.object({
//     user : Yup.object({
//         id : Yup.number(),
//         name: Yup.string(),
//         email : Yup.string(),
//         // phone: Yup.string(),
//         role: Yup.string()
//     }),
//     jwt: Yup.object({
//         token: Yup.string(),
//         token_type: Yup.string(),
//         expiresIn: Yup.string()  
//     })
// });

// export type LoginResult = Yup.InferType<typeof LoginResultSchema>;