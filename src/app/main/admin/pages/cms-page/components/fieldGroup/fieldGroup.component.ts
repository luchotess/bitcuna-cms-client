import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'field-group',
    templateUrl: './fieldGroup.component.html',
    styleUrls: ['./fieldGroup.component.scss']
})
export class FieldGroupComponent implements OnInit {
    @Input() fields;
    @Input() label;

    fieldKeys = Object.keys;

    language = 'en';

    constructor () {
    }

    ngOnInit (): void {}

    isFinal (key): boolean {
        return typeof key === 'string' || typeof key === 'number';
    }
}
