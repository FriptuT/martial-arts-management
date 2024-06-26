export interface Membru {
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
}





export interface MembruParams {
    orderBy: string;
    searchTerm?: string;
    pageNumber: number;
    pageSize: number;
}