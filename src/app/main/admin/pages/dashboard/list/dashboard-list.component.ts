import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from '../../../admin.service';
import { Promotor } from '../../../admin.model';
import { MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { PromotoresFormComponent } from '../../../components/modals/promotores-form/promotores-form.component';

@Component({
    selector: 'dashboard-viewer',
    templateUrl: './dashboard-list.component.html',
    styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {
    public promotores: BehaviorSubject<Promotor[]>;
    private dialogRef: any;

    constructor (private _AdminService: AdminService,
                 private _matDialog: MatDialog) {}

    ngOnInit (): void {
        this._AdminService.fetchPromotores();
        this.promotores = this._AdminService.data.promotores;
    }

    public addPromotor (): void {
        this.dialogRef = this._matDialog.open(PromotoresFormComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }

                this._AdminService.addPromotor(response.getRawValue()).subscribe(() => {
                    this._AdminService.fetchPromotores();
                });
            });
    }
}
