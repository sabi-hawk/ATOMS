import * as yup from "yup";
import { Request } from "express";

export const validateRegisterRequest = async (req: Request) => {

    const schema = yup.object().shape({
        name: yup.object({
            first: yup.string().trim().required("First name is required"),
            last: yup.string().trim(),
        }),
        organization: yup.string().trim(),
        email: yup.string().email("not a valid email").trim().lowercase().required("email is required"),
        password: yup.string().required("password is required"),
        country: yup.string().trim(),
    })
    return schema.validate(req.body, { abortEarly: false })
}

export const validateLoginRequest = async (req: Request) => {
    const schema = yup.object().shape({
        email: yup.string().email("not a valid email").trim().lowercase().required("email is required"),
        password: yup.string().required("password is required")
    })

    return schema.validate(req.body, { abortEarly: false });
}