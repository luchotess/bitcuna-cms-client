import { Injectable }       from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient }       from '@angular/common/http';
import { Observable }       from 'rxjs';
import decode               from 'jwt-decode';
import { Router }           from '@angular/router';

const helper = new JwtHelperService();


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private _http: HttpClient, private router: Router) {}

    public user: any = {};

    private API_PREFIX = '/api';

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');

        return !helper.isTokenExpired(token);
    }

    public login (credentials: any): Observable<any> {
        return this._http.post(`${this.API_PREFIX}/auth/login`, credentials);
    }

    public setUserFromToken (token: string): void {
        localStorage.setItem('token', token);
        this.decodeUser();
    }

    public decodeUser (): void {
        const token = localStorage.getItem('token');
        if (token) {
            this.user = decode(token).user;
            console.log(this.user);
        } else {
            console.error('Invalid user token');
        }
    }

    public logout (): void {
        localStorage.clear();
        this.user = {};
        this.router.navigate(['auth/login']);
    }
}