import { Component, OnInit }               from '@angular/core';
import { BehaviorSubject }                 from 'rxjs';
import { AdminService }                    from '../../../admin.service';
import { Evento }                          from '../../../admin.model';
import { MatDialog }                       from '@angular/material';
import { FormGroup }                       from '@angular/forms';
import { EventosFormComponent }            from '../../../components/modals/eventos-form/eventos-form.component';
import { AddpromotorEventosFormComponent } from '../../../components/modals/addpromotor-eventos-form/addpromotor-eventos-form.component';
import { AuthService }                     from '../../../../../auth/auth.service';

@Component({
    selector: 'eventos-viewer',
    templateUrl: './eventos-list.component.html',
    styleUrls: ['./eventos-list.component.scss']
})
export class EventosListComponent implements OnInit {
    public eventos: BehaviorSubject<Evento[]>;
    private dialogRef: any;

    constructor (private _AdminService: AdminService,
                 private _matDialog: MatDialog,
                 public _AuthService: AuthService) {}

    ngOnInit (): void {
        this._AdminService.fetchEventos();
        this.eventos = this._AdminService.data.eventos;
    }

    public addEvento (): void {
        this.dialogRef = this._matDialog.open(EventosFormComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }

                this._AdminService.addEvento(response.getRawValue()).subscribe(() => {
                    this._AdminService.fetchEventos();
                });
            });
    }
}
