export interface IForgotRequest {
    email: string;
}

export interface IUpdateForgotPasswordRequest {
    body: {
        newPassword: string
    }
    user: {
        id: string
        email: string
    }
}
