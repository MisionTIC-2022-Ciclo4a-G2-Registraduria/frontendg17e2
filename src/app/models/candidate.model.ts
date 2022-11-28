import { Political_party } from "./political_party.model";

export class Candidate {
    _id?: string;
    nombre?: string;
    apellido?: string;
    cedula?: number;
    political_party?: Political_party;
}
