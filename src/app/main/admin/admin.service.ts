import { Injectable }                                  from '@angular/core';
import { HttpClient }                                  from '@angular/common/http';
import { Evento, PermisosPorEvento, Promotor, Puerta } from './admin.model';
import { BehaviorSubject, Observable }                 from 'rxjs';

interface DataInterface {
    promotores: BehaviorSubject<Promotor[]>;
    eventos: BehaviorSubject<Evento[]>;
}

@Injectable({providedIn: 'root'})
export class AdminService {
    private endpoints = {
        types: '/api/cms/v2/types',
        cms: '/api/cms/v2'
    };

    localContent;

    customTypes = {};

    constructor(private _HttpClient: HttpClient) {}

    getTypes (): void {
        this._HttpClient.get(this.endpoints.types, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
            .subscribe(response => this.customTypes = response);
    }

    fetchCMS (): Observable<any> {
        return this._HttpClient.get(this.endpoints.cms);
    }

    fetchTypes (): Observable<any> {
        return this._HttpClient.get(this.endpoints.types, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
    }

    updateTypes (): void {
        this._HttpClient.put(this.endpoints.types, this.customTypes, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
            .subscribe(response => this.customTypes = response);
    }

    saveCMS (content): Observable<any> {
        return this._HttpClient.put(`/api/cms/v2`, {value: content}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
}
