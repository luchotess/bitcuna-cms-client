import { Component, Input, OnInit } from '@angular/core';
import { Evento,Promotor } from '../../../admin.model';
import { FormGroup } from '@angular/forms';
import { AdminService } from '../../../admin.service';
import { MatDialog } from '@angular/material';
import { EventosFormComponent } from '../../modals/eventos-form/eventos-form.component';
import { AddpromotorEventosFormComponent } from '../../modals/addpromotor-eventos-form/addpromotor-eventos-form.component';
import { FuseConfirmDialogComponent } from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import { ConfigboxEventosFormComponent } from '../../modals/configbox-eventos-form/configbox-eventos-form.component';

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
    selector: 'eventos-table',
    templateUrl: './eventos-table.component.html',
    styleUrls: ['./eventos-table.component.scss']
})
export class EventosTableComponent implements OnInit {
    public displayedColumns: string[] = ['checkbox', 'name', 'date', 'time', 'invitados', 'actions'];
    private dialogRef: any;
    private confirmDialogRef: any;
    @Input() dataSource: any;
    @Input() promotores: any;
    public data = [];
    public checkboxes = {};

    constructor (
        private _AdminService: AdminService,
        public _matDialog: MatDialog) {}

    ngOnInit (): void { }

    public onSelectedChange (id: string): void {

    }

    editEvento (evento: Evento): void {
        this.dialogRef = this._matDialog.open(EventosFormComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                evento : evento,
                action : 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];

                console.log(actionType);
                switch ( actionType )
                {
                    /**
                     * Save
                     */
                    case 'save':

                        this._AdminService.updateEvento(formData.getRawValue())
                            .subscribe(res => this._AdminService.fetchEventos());

                        break;
                }
            });
    }

    addPromotorToEvent (evento: Evento): void {
        this.dialogRef = this._matDialog.open(AddpromotorEventosFormComponent, {
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

                        this._AdminService.updateEvento(formData.getRawValue())
                            .subscribe(res => this._AdminService.fetchEventos());

                        break;
                }
            });
    }

    configBoxToEvent (evento: Evento): void {
        this.dialogRef = this._matDialog.open(ConfigboxEventosFormComponent, {
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

                        this._AdminService.updateEvento(formData.getRawValue())
                            .subscribe(res => this._AdminService.fetchEventos());

                        break;
                }
            });
    }

    deleteEvento(evento): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = '¿Seguro que deseas eliminarlo?';
        this.confirmDialogRef.componentInstance.confirmMessage = '¿Seguro que deseas eliminarlo?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._AdminService.deleteEvento(evento).subscribe(res => {
                    this._AdminService.fetchEventos();
                });
            }
            this.confirmDialogRef = null;
        });

    }
}
