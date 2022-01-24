import $api from "..";
import { GET_PROFILE, LOGIN } from "./CONSTANTS";


export async function authLogin(login: string, password: string) {
    return (await $api.post(LOGIN, {login, password})).data;
}

export async function getProfile() {
    return (await $api.get(GET_PROFILE)).data;
}