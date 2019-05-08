import { Component, Input, OnInit }        from '@angular/core';
import { Evento }                          from '../../../admin.model';
import { FormGroup }                       from '@angular/forms';
import { AdminService }                    from '../../../admin.service';
import { MatDialog }                       from '@angular/material';
import { AddinvitadoEventosFormComponent } from '../../modals/addinvitado-eventos-form/addinvitado-eventos-form.component';
import { STATIC_FOLDERS }                  from '../../../../../app.constants';

export class Service {
    stage: string;
    description: string;
    resource = new Resource();
    area: string;
    duration = 1;
}

export class Resource {
    description: string;
    dailyCost = 1;
}

@Component({
    selector: 'banner-eventos-table',
    templateUrl: './banner-eventos-table.component.html',
    styleUrls: ['./banner-eventos-table.component.scss']
})
export class BannerEventosTableComponent implements OnInit {

    public eventos: Evento[] = [];
    private dialogRef: any;
    private confirmDialogRef: any;

    public eventBannerFolder = STATIC_FOLDERS.EVENT_BANNERS;

    constructor (
        private _AdminService: AdminService,
        public _matDialog: MatDialog) {}

    ngOnInit (): void {
        this._AdminService.data.eventos
            .subscribe(eventos => this.eventos = eventos);
    }

    addInvitadoToEvent (evento: Evento): void {
        this.dialogRef = this._matDialog.open(AddinvitadoEventosFormComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                evento : evento,
                action : 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];

                console.log(actionType);
                switch (actionType) {
                    /**
                     * Save
                     */
                    case 'save':

                        this._AdminService.addInvitadosToEvento(formData.getRawValue())
                            .subscribe(res => this._AdminService.fetchEventos());

                        break;
                }
            });
    }
}
