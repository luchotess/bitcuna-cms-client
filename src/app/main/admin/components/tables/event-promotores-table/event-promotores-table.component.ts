import { Component, Input, OnInit }      from '@angular/core';
import { Promotor }                      from '../../../admin.model';
import { FormGroup }                     from '@angular/forms';
import { AdminService }                  from '../../../admin.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { PromotoresFormComponent }       from '../../modals/promotores-form/promotores-form.component';
import { FuseConfirmDialogComponent }    from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';

export class Service {
    stage: string;
    description: string;
    admin = new Resource();
    area: string;
    duration = 1;
}

export class Resource {
    description: string;
    dailyCost = 1;
}

@Component({
    selector: 'event-promotores-table',
    templateUrl: './event-promotores-table.component.html',
    styleUrls: ['./event-promotores-table.component.scss']
})
export class EventPromotoresTableComponent implements OnInit {
    public displayedColumns: string[] = [ 'name', 'email', 'phone', 'actions'];

    datasource: any;
    @Input() promotoresAsignados: any;

    constructor (
        private _AdminService: AdminService,
        public _matDialog: MatDialog) {}

    ngOnInit (): void {
        this.datasource = new MatTableDataSource(this.promotoresAsignados);

        console.log(this.datasource);
        console.log(this.promotoresAsignados);
    }
}
