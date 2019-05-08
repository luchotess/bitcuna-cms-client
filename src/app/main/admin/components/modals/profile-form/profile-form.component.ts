import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup }                       from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef }                from '@angular/material';
import { Promotor }                                     from '../../../admin.model';
import { FileUploader }                                 from 'ng2-file-upload';
import { STATIC_FOLDERS }                               from '../../../../../app.constants';
const URL = '/api/users/profiles';

@Component({
    selector     : 'profile-form-dialog',
    templateUrl  : './profile-form.component.html',
    styleUrls    : ['./profile-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ProfileFormComponent implements OnInit {
    action: string;
    user: any;
    promotor: Promotor;
    promotorForm: FormGroup;
    dialogTitle: string;
    dialogRef: any;
    background: any = '';
    public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
    public profileAvatarFolder = STATIC_FOLDERS.PROFILE_AVATARS;

    constructor (
        public matDialogRef: MatDialogRef<ProfileFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        // Set the defaults
        this.action = _data.action;
        this.user = _data.user;

        if (this.action === 'edit') {
            this.dialogTitle = 'Editar Promotor';
            this.promotor = _data.promotor;
        }
        else {
            this.dialogTitle = 'Agregar Promotor';
            this.promotor = new Promotor();
        }

        if (_data.title) {
            this.dialogTitle = _data.title;
        }

        this.promotorForm = this.createContactForm();
    }

    ngOnInit (): void {
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log('ImageUpload:uploaded:', item, status, response);
        };
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
            _id       : [this.user._id],
            name      : [this.user.name],
            username  : [this.user.username],
            avatar    : [this.user.avatar],
            background: [this.background],
            phone     : [this.user.phone],
            note      : [this.user.note],
        });
    }

    onFileSelected (filename: HTMLInputElement): void {
        this.promotorForm.controls.avatar.setValue(filename.files[0].name);
    }

    save (): void {
        this.uploader.uploadAll();

        this.matDialogRef.close(this.promotorForm);
    }
}
