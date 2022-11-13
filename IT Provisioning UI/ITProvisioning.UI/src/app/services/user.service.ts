import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "../models";

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.baseApiUrl}/api/users`);
    }
}