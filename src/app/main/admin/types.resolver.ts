import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { AdminService } from './admin.service';

@Injectable({
    providedIn: 'root'
})
export class TypesResolver implements Resolve<Observable<string>> {
    constructor(private _AdminService: AdminService) {}

    resolve (): Observable<any> {
        return this._AdminService.fetchTypes();
    }
}