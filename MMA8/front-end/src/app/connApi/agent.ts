import axios, { AxiosResponse } from "axios";
import { Membru } from "../models/membru";
import { Grade } from "../models/grade";
import { gradeMembru } from "../models/gradeMembru";

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
    addGrad: (grad: Grade) => requests.post('grade', grad),
    deleteGrad: (id: number) => requests.delete(`grade/${id}`),
};

const GradeMembrii = {
    getAll: () => requests.get("GradeMembrii"),
    getOne: (id: number) => requests.get(`GradeMembrii/${id}`),
    addGradMembru: (gradMembru: gradeMembru) => requests.post('GradeMembrii', gradMembru),
    editGradMembru: (id: number, gradMembru: gradeMembru) => requests.put(`GradeMembrii/${id}`, gradMembru),
    deleteGradMembru: (id: number) => requests.delete(`GradeMembrii/${id}`)
};

const Membrii = {
    getAll: () => requests.get('Membrii'),
    getOne: (id: number) => requests.get(`Membrii/${id}`),
    addMembru: (membru: Membru) => requests.post('Membrii', membru), 
    editMembru: (id: number, membru: Membru) => requests.put(`Membrii/${id}`, membru),
    deleteMembru: (id: number) => requests.delete(`Membrii/${id}`)
};

const Upload = {
    uploadImage: (file: File) => requests.post('Upload', file)
};


const agent = {
    Grade,
    Membrii,
    GradeMembrii,
    Upload
}

export default agent;