import { Component, OnInit }               from '@angular/core';
import { BehaviorSubject }                 from 'rxjs';
import { AdminService }                    from '../../../../admin/admin.service';
import { Evento }                          from '../../../../admin/admin.model';
import { MatDialog }                       from '@angular/material';
import { AuthService }                     from '../../../../../auth/auth.service';

@Component({
    selector: 'eventos-viewer',
    templateUrl: './eventos-list.component.html',
    styleUrls: ['./eventos-list.component.scss']
})
export class EventosListPromotorComponent implements OnInit {
    public eventos: BehaviorSubject<Evento[]>;
    private dialogRef: any;

    constructor (private _AdminService: AdminService,
                 private _matDialog: MatDialog,
                 public _AuthService: AuthService) {}

    ngOnInit (): void {
        this._AdminService.fetchEventos();
        this.eventos = this._AdminService.data.eventos;
    }
}
