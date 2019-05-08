import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Promotor } from '../../../admin.model';

@Component({
    selector     : 'promotores-form-dialog',
    templateUrl  : './promotores-form.component.html',
    styleUrls    : ['./promotores-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PromotoresFormComponent {
    action: string;
    promotor: Promotor;
    promotorForm: FormGroup;
    dialogTitle: string;
    dialogRef: any;

    constructor(
        public matDialogRef: MatDialogRef<PromotoresFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar Promotor';
            this.promotor = _data.promotor;
        }
        else
        {
            this.dialogTitle = 'Agregar Promotor';
            this.promotor = new Promotor();
        }

        if (_data.title) {
            this.dialogTitle = _data.title;
        }

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
    createContactForm(): FormGroup
    {
        return this._formBuilder.group({
            _id      : [this.promotor._id],
            name    : [this.promotor.name],
            username   : [this.promotor.username],
            phone   : [this.promotor.phone],
            password   : [this.promotor.password],
            note   : [this.promotor.note],
        });
    }


}
