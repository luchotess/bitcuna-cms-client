import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../../../admin.service';
import { FileUploader } from 'ng2-file-upload';
import { STATIC_FOLDERS } from '../../../../../../app.constants';

const URL = '/api/cms/v2/images';

@Component({
    selector: 'field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
    @Input() label;
    @Input() field;
    @Input() reference;
    type = 'simple';

    currentLanguage;
    currentValue;

    public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
    public profileAvatarFolder = STATIC_FOLDERS.IMAGES;

    constructor (private _AdminService: AdminService) {
    }

    ngOnInit (): void {
        this.type = this._AdminService.customTypes[this.label] || 'simple';

        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log('ImageUpload:uploaded:', item, status, response);

            this.setNewValue(this.currentValue, this.currentLanguage);
        };
    }

    setType (type): void {
        this._AdminService.customTypes[this.label] = type;
        this.type = this._AdminService.customTypes[this.label];

        this._AdminService.updateTypes();
    }

    onFileSelected (filename: HTMLInputElement, language): void {
        this.uploader.uploadAll();

        this.currentValue = filename.files[0].name;
        this.currentLanguage = language;
    }

    setNewValue (value, language): void {
        if (this.field[language]) {
            this.field[language] = value;
        } else {
            this.reference[this.label] = value;
        }
    }
}
