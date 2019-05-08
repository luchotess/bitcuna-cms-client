import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Evento, Promotor } from '../../../admin.model';
import { AdminService } from '../../../admin.service';

@Component({
    selector     : 'addpromotor-eventos-form-dialog',
    templateUrl  : './addpromotor-eventos-form.component.html',
    styleUrls    : ['./addpromotor-eventos-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AddpromotorEventosFormComponent {
    action: string;
    evento: Evento;
    promotores: Promotor[] = [];
    eventoForm: FormGroup;
    dialogTitle: string;
    dialogRef: any;

    constructor (public matDialogRef: MatDialogRef<AddpromotorEventosFormComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private _formBuilder: FormBuilder,
                private _AdminService: AdminService) {
        // Set the defaults
        this.action = _data.action;

        this.dialogTitle = 'Administrar Promotores';
        this.evento = _data.evento;

        this.eventoForm = this.createEventoForm();

        _AdminService.fetchPromotores();

        _AdminService.data.promotores.subscribe(promotores => {
            this.promotores = promotores;
        });
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
            name    : [this.evento.name],
            promotores   : [this.evento.promotores],
        });
    }


    public addPromotorToEvent (promotor: Promotor): void {
        this.evento.promotores.push(promotor);
    }
}
