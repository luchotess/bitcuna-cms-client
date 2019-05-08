import { Component, Input, OnInit } from '@angular/core';
import { Promotor } from '../../../admin.model';
import { FormGroup } from '@angular/forms';
import { AdminService } from '../../../admin.service';
import { MatDialog } from '@angular/material';
import { PromotoresFormComponent } from '../../modals/promotores-form/promotores-form.component';
import { FuseConfirmDialogComponent } from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';

export class Service {
    stage: string;
    description: string;
    resource = new Resource();
    area: string;
    duration = 1;
}

export class Resource {
    description: string;
    dailyCost = 1;
}

@Component({
    selector: 'dashboard-table',
    templateUrl: './dashboard-table.component.html',
    styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent implements OnInit {
    public displayedColumns: string[] = ['checkbox', 'avatar', 'name', 'email', 'phone', 'note' , 'events', 'actions'];
    private dialogRef: any;
    private confirmDialogRef: any;
    @Input() dataSource: any;
    public data = [];
    public checkboxes = {};

    constructor (
        private _AdminService: AdminService,
        public _matDialog: MatDialog) {

    }

    public onSelectedChange (id: string): void {

    }


    ngOnInit(): void {

    }

    editPromotor (promotor: Promotor): void {
        this.dialogRef = this._matDialog.open(PromotoresFormComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                promotor: promotor,
                action : 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];

                console.log(actionType)
                switch ( actionType )
                {
                    /**
                     * Save
                     */
                    case 'save':

                        this._AdminService.updatePromotor(formData.getRawValue())
                            .subscribe(res => this._AdminService.fetchPromotores());

                        break;
                }
            });
    }

    deletePromotor(promotor): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = '¿Seguro que deseas eliminarlo?';
        this.confirmDialogRef.componentInstance.confirmMessage = '¿Seguro que deseas eliminarlo?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._AdminService.deletePromotor(promotor).subscribe(res => {
                    this._AdminService.fetchPromotores();
                });
            }
            this.confirmDialogRef = null;
        });

    }
}
