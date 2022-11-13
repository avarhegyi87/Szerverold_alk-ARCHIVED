import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { User } from "../models";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    private currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get getCurrentUser(): Observable<User> {
        return this.currentUser;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.baseApiUrl}/api/users/authenticate`, {username, password})
        .pipe(map(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null as any);
    }
}