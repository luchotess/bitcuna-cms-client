import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from '../../../../admin/admin.service';
import { Evento } from '../../../../admin/admin.model';
import { MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListPromotorComponent implements OnInit {

    public eventos: BehaviorSubject<Evento[]>;
    private dialogRef: any;

    constructor (private _AdminService: AdminService,
                 private _matDialog: MatDialog) {}

    ngOnInit (): void {
        this._AdminService.fetchEventos();
        this.eventos = this._AdminService.data.eventos;
    }

}
