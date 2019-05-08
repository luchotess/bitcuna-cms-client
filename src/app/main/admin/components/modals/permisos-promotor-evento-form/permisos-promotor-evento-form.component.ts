import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup }               from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef }        from '@angular/material';
import { Evento, PermisosPorEvento, Promotor }  from '../../../admin.model';
import { STATIC_FOLDERS }                       from '../../../../../app.constants';

@Component({
    selector     : 'addpromotor-eventos-form-dialog',
    templateUrl  : './permisos-promotor-evento-form.component.html',
    styleUrls    : ['./permisos-promotor-evento-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PermisosPromotorEventoFormComponent {
    action: string;
    promotor: Promotor;
    evento: Evento;
    permisosForm: FormGroup;
    dialogTitle: string;
    dialogRef: any;
    permissions: PermisosPorEvento = new PermisosPorEvento();
    public eventBannerFolder = STATIC_FOLDERS.EVENT_BANNERS;

    constructor (public matDialogRef: MatDialogRef<PermisosPromotorEventoFormComponent>,
                 @Inject(MAT_DIALOG_DATA) private _data: any,
                 private _formBuilder: FormBuilder) {
        // Set the defaults
        this.action = _data.action;

        this.dialogTitle = 'Editar Permisos Promotor';
        this.evento = _data.evento;
        this.promotor = _data.promotor;

        if (this.promotor.permissions && this.promotor.permissions[this.evento._id]) {
            this.permissions = this.promotor.permissions[this.evento._id];
        }

        this.permisosForm = this.createEventoForm();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createEventoForm (): FormGroup {
        return this._formBuilder.group({
            eventoId                       : [this.evento._id],
            promotorId                     : [this.promotor._id],
            maxInvitados                   : [this.permissions.maxInvitados],
            boxes                          : [this.permissions.boxes],
            maxBoxes                       : [this.permissions.maxBoxes],
            allowInvitadosAfterEventStarted: [this.permissions.allowInvitadosAfterEventStarted]
        });
    }
}
