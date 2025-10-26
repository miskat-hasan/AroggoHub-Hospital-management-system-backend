import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../types/error";
import AppError from "../helper/AppError";
import env from "../config/env";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    //default values
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error."

    let errorSources: TErrorSources = [
        {
            path: "",
            message: "Something went wrong."
        }
    ]

    if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
            {
                path: '',
                message: err?.message
            }
        ]
    } else if (err instanceof Error) {
        message = err?.message;
        errorSources = [
            {
                path: "",
                message: err?.message,
            },
        ];
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: env.node_env === "development" ? err?.stack : null,
    })
}

export default globalErrorHandler;