import { LoginType } from './dataType';
export const initialLoginData: LoginType = {
    email: '',
    password: '',
}

export const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/