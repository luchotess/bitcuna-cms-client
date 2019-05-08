import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup }               from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef }        from '@angular/material';
import { Evento }                               from '../../../admin.model';
import { STATIC_FOLDERS }                       from '../../../../../app.constants';

@Component({
    selector     : 'addinvitado-eventos-form-dialog',
    templateUrl  : './addinvitado-eventos-form.component.html',
    styleUrls    : ['./addinvitado-eventos-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AddinvitadoEventosFormComponent {
    action: string;
    evento: Evento;
    invitados = '';
    promotorId: string;
    eventoForm: FormGroup;
    dialogTitle: string;
    dialogRef: any;
    public eventBannerFolder = STATIC_FOLDERS.EVENT_BANNERS;

    constructor (
        public matDialogRef: MatDialogRef<AddinvitadoEventosFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        // Set the defaults
        this.action = _data.action;

        this.dialogTitle = 'Agregar Invitados';
        this.evento = _data.evento;
        this.promotorId = _data.promotorId;
        this.invitados = _data.invitados;

        this.eventoForm = this.createEventoForm();
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
            eventId       : [this.evento._id],
            invitados: [this.invitados],
            promotorId: [this.promotorId]
        });
    }


}
