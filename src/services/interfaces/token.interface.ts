export interface generateAuthTokens {
    access: {
        token: string,
        expires: Date,
    },
    refresh: {
        token: string,
        expires: Date,
    },

}

