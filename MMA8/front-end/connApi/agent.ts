import axios, { AxiosResponse } from "axios";
import { Membru } from "../models/membru";

axios.defaults.baseURL = "http://localhost:5254/api/";
axios.defaults.withCredentials =  true;

const responseBody = (response: AxiosResponse) => response.data;


const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url,body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Grade = {
    listAll: () => requests.get("grade"),
    listOne: (id: number) => requests.get(`grade/${id}`),
};

const Membrii = {
    getAll: () => requests.get("membrii"),
    getOne: (id: number) => requests.get(`membrii/${id}`),
    addMembru: (membru: Membru) => requests.post("membrii",{membru}), 
    editMembru: (id: number, membru: Membru) => requests.put(`membrii/${id}`, {membru}),
    deleteMembru: (id: number) => requests.delete(`membrii/${id}`)
}


const agent = {
    Grade,
    Membrii
}

export default agent;