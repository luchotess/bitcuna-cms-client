import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup }                       from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef }                from '@angular/material';
import { Evento }                                       from '../../../admin.model';
import {  FileUploader }                                from 'ng2-file-upload/ng2-file-upload';
import { STATIC_FOLDERS }                               from '../../../../../app.constants';
const URL = '/api/events/banner';

@Component({
    selector: 'eventos-form-dialog',
    templateUrl: './eventos-form.component.html',
    styleUrls: ['./eventos-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class EventosFormComponent implements OnInit {
    action: string;
    evento: Evento;
    eventoForm: FormGroup;
    dialogTitle: string;
    dialogRef: any;
    srcResult: any;
    public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
    public eventBannerFolder = STATIC_FOLDERS.EVENT_BANNERS;

    horas = [
        '12:00 AM',
        '01:00 AM',
        '02:00 AM',
        '03:00 AM',
        '04:00 AM',
        '05:00 AM',
        '06:00 AM',
        '07:00 AM',
        '08:00 AM',
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 AM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
        '05:00 PM',
        '06:00 PM',
        '07:00 PM',
        '08:00 PM',
        '09:00 PM',
        '10:00 PM',
        '11:00 PM'
    ];

    constructor (
        public matDialogRef: MatDialogRef<EventosFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Editar Evento';
            this.evento = _data.evento;
        }
        else {
            this.dialogTitle = 'Agregar Evento';
            this.evento = new Evento();
        }

        this.eventoForm = this.createEventoForm();
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
    createEventoForm (): FormGroup {
        return this._formBuilder.group({
            _id: [this.evento._id],
            name: [this.evento.name],
            details: [this.evento.details],
            date: [this.evento.date],
            banner: [this.evento.banner],
            note: [this.evento.note],
            time: [this.evento.time],
            timeLimit: [this.evento.timeLimit],
            allowInvitadosAfterStarted: [this.evento.allowInvitadosAfterStarted]
        });
    }

    onFileSelected (filename: HTMLInputElement): void {
        this.eventoForm.controls.banner.setValue(filename.files[0].name);
    }

    save (action: string = ''): void {
        this.uploader.uploadAll();

        const data = action === 'save' ?  ['save', this.eventoForm] : this.eventoForm;

        this.matDialogRef.close(data);
    }
}
