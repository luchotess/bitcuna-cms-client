import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Evento, Promotor, Box } from '../../../admin.model';
import { AdminService } from '../../../admin.service';

@Component({
    selector     : 'configbox-eventos-form-dialog',
    templateUrl  : './configbox-eventos-form.component.html',
    styleUrls    : ['./configbox-eventos-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ConfigboxEventosFormComponent {
    action: string;
    evento: Evento;
    promotores: Promotor[] = [];
    box: Box[] = [];
    eventoForm: FormGroup;
    dialogTitle: string;
    dialogRef: any;

    constructor(
        public matDialogRef: MatDialogRef<ConfigboxEventosFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        this.dialogTitle = 'Administrar Boxes';
        this.evento = _data.evento;


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
    createEventoForm(): FormGroup
    {
        return this._formBuilder.group({
            id    : [this.evento._id],
            box   : [this.box],
        });
    }


}
