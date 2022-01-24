export const GET_ALL = '/clothe/getAll';
export const DELETE_CLOTHE = (id: string) => `/clothe/delete?id=${id}`;
export const CREATE_CLOTHE = '/clothe';
export const FIND_CLOTHE_BY_ID = (id: string | string[]) => `/clothe/findById?id=${id}`;
export const UPDATE_CLOTHE = '/clothe/update';