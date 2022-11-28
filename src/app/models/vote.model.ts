import { Candidate } from "./candidate.model";
import { Table } from "./table.model";

export class Vote {
    _id?: string;
    cedulas?: number;
    table?: Table;
    candidate?: Candidate;
}
