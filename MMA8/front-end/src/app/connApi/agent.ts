import axios, { AxiosResponse } from "axios";
import { Membru } from "../models/membru";

axios.defaults.baseURL = "http://localhost:5254/api/";

const responseBody = (response: AxiosResponse) => response.data;


const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url,body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
};

const Grade = {
    listAll: () => requests.get("grade"),
    listOne: (id: number) => requests.get(`grade/${id}`),
};

const Membrii = {
    getAll: () => requests.get('Membrii'),
    getOne: (id: number) => requests.get(`Membrii/${id}`),
    addMembru: (membru: Membru) => requests.post('Membrii', membru), 
    editMembru: (id: number, membru: Membru) => requests.put(`Membrii/${id}`, membru),
    deleteMembru: (id: number) => requests.delete(`Membrii/${id}`)
}


const agent = {
    Grade,
    Membrii
}

export default agent;