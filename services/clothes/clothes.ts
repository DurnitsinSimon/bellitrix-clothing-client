import $api from "..";
import { Clothe } from "../../types/clothe";
import { CREATE_CLOTHE, DELETE_CLOTHE, FIND_CLOTHE_BY_ID, GET_ALL, UPDATE_CLOTHE } from "./CONSTANTS";

export async function getAll() {
    return (await $api.get(GET_ALL)).data;
}

export async function deleteClothe(id: string) {
    return (await $api.delete(DELETE_CLOTHE(id))).data;
}

export async function findClotheById(id: string | string[]) {
    return (await $api.get(FIND_CLOTHE_BY_ID(id))).data;
}

export async function createClothe(clothe: FormData) {
    return (await $api.post(CREATE_CLOTHE, clothe)).data;
}

export async function updateClothe(clothe: Clothe) {
    return (await $api.put(UPDATE_CLOTHE, clothe)).data;
    
}