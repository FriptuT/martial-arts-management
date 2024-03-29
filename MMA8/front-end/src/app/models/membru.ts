import { Grade } from "./grade";

export interface Membru{
    membruId: number;
    email: string;
    parola: string;
    nume: string;
    dataNasterii: string;
    gen: string;
    tipMembru: string;
    nrLegitimatie: number;
    activ: boolean;
    varsta: number;
    poza: string;
    grad: Grade;
}

