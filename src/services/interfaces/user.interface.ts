export type userBody={
    name:string,
    email:string,
    password:string
    role:string,
}

export type userBodyUpdate={
    name?:string,
    email?:string,
    password?:string
    role?:string,
    isEmailVerified?:boolean
}