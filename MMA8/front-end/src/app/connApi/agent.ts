import axios, { AxiosError, AxiosResponse } from "axios";
import { Membru } from "../models/membru";
import { Grade } from "../models/grade";
import { gradeMembru } from "../models/gradeMembru";
import { PaginatetResponse } from "../models/pagination";

axios.defaults.baseURL = "http://localhost:5254/api/";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
    async response => {
        const pagination = response.headers['pagination'];
        if (pagination) {
            response.data = new PaginatetResponse(response.data, JSON.parse(pagination));
            return response;
        }
        return response;
    },
    (error: AxiosError) => {

        return Promise.reject(error.response);
    }
);


const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: object) => axios.post(url,body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
};

const Grades = {
    listAll: () => requests.get("grade"),
    listOne: (id: number) => requests.get(`grade/${id}`),
    addGrad: (grad: Grade) => requests.post('grade', grad),
    deleteGrad: (id: number) => requests.delete(`grade/${id}`),
};

const GradeMembrii = {
    getAll: () => requests.get("GradeMembrii"),
    getOne: (id: number) => requests.get(`GradeMembrii/${id}`),
    addGradMembru: (gradMembru: gradeMembru) => requests.post("GradeMembrii", gradMembru),
    editGradMembru: (id: number, gradMembru: gradeMembru) => requests.put(`GradeMembrii/${id}`, gradMembru),
    deleteGradMembru: (id: number) => requests.delete(`GradeMembrii/${id}`)
};

const Membrii = {
    getAll: (params: URLSearchParams) => requests.get('Membrii', params),
    getOne: (id: number) => requests.get(`Membrii/${id}`),
    addMembru: (membru: Membru) => requests.post('Membrii', membru), 
    editMembru: (id: number, membru: Membru) => requests.put(`Membrii/${id}`, membru),
    deleteMembru: (id: number) => requests.delete(`Membrii/${id}`)
};

const Upload = {
    uploadImage: (file: File) => requests.post('Upload', file)
};


const agent = {
    Grades,
    Membrii,
    GradeMembrii,
    Upload
}

export default agent;