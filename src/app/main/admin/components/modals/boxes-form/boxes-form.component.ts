import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup }               from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef }        from '@angular/material';
import { Promotor }                             from '../../../admin.model';

@Component({
    selector     : 'boxes-form-dialog',
    templateUrl  : './boxes-form.component.html',
    styleUrls    : ['./boxes-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class BoxesFormComponent {
    action: string;
    box: any = {};
    promotorForm: FormGroup;
    dialogTitle: string;
    dialogRef: any;

    constructor (
        public matDialogRef: MatDialogRef<BoxesFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.box = this._data.box;
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
    createContactForm (): FormGroup {
        return this._formBuilder.group({
            _id     : [this.box._id],
            name    : [this.box.name],
            capacity: [this.box.capacity],
            details : [this.box.details]
        });
    }


}
