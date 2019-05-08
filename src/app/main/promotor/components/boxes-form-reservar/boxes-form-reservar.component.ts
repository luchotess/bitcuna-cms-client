import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup }               from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef }        from '@angular/material';

@Component({
    selector     : 'boxes-form-dialog',
    templateUrl  : './boxes-form-reservar.component.html',
    styleUrls    : ['./boxes-form-reservar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class BoxesFormReservarComponent {
    promotorId: string;
    referenciaInvitado: string;
    box: any = {};
    promotorForm: FormGroup;
    dialogTitle: string;
    dialogRef: any;

    constructor (
        public matDialogRef: MatDialogRef<BoxesFormReservarComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        // Set the defaults
        this.box = this._data.box;
        this.promotorId = this._data.promotorId;


        this.promotorForm = this.createContactForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm (): FormGroup {
        return this._formBuilder.group({
            boxId     : [this.box._id],
            promotorId: [this.promotorId],
            referenciaInvitado: [this.referenciaInvitado]
        });
    }
}
