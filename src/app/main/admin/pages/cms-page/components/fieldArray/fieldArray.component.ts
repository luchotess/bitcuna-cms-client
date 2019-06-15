import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'field-array',
    templateUrl: './fieldArray.component.html',
    styleUrls: ['./fieldArray.component.scss']
})
export class FieldArrayComponent implements OnInit {
    @Input() arrayFields;
    @Input() label;

    constructor () {
    }

    ngOnInit (): void {
    }

    isFinal (key): boolean {
        return typeof key === 'string' || typeof key === 'number';
    }
}
