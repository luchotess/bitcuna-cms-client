import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Evento, Promotor} from '../../../admin.model';
import {FormGroup} from '@angular/forms';
import {AdminService} from '../../../admin.service';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {FuseConfirmDialogComponent} from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {PermisosPromotorEventoFormComponent} from '../../modals/permisos-promotor-evento-form/permisos-promotor-evento-form.component';

function compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
    selector: 'promotores-evento-table',
    templateUrl: './promotores-evento-table.component.html',
    styleUrls: ['./promotores-evento-table.component.scss']
})
export class PromotoresEventoTableComponent implements OnInit, OnChanges {
    private dialogRef: any;
    private confirmDialogRef: any;
    @Input() dataSource: MatTableDataSource<any>;
    @Input() evento: Evento;
    @Output() onGetEvento: EventEmitter<any> = new EventEmitter();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public displayedColumns: string[] = ['avatar', 'name', 'email', 'phone', 'actions'];

    constructor(
        private _AdminService: AdminService,
        public _matDialog: MatDialog,
        public snackBar: MatSnackBar) {
    }

    ngOnInit (): void {
        this.dataSource = new MatTableDataSource(this.evento.promotores);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnChanges (): void {
        this.dataSource = new MatTableDataSource(this.evento.promotores);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter (filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    sortData(sort: Sort): void {
        const data = this.evento.promotores.slice();
        if (!sort.active || sort.direction === '') {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            return;
        }

        this.dataSource = new MatTableDataSource(data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';


            switch (sort.active) {
                case 'name':
                    return compare(a.name.toLowerCase().trim(), b.name.toLowerCase().trim(), isAsc);
                case 'email':
                    return compare(a.username.toLowerCase().trim(), b.username.toLowerCase().trim(), isAsc);
                case 'phone':
                    return compare(a.phone, b.phone, isAsc);
                default:
                    return 0;
            }
        }));

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 5000,
        });
    }

    public openPermisosPromotor(promotor: Promotor, evento: Evento): void {
        this.dialogRef = this._matDialog.open(PermisosPromotorEventoFormComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                promotor: promotor,
                evento: evento,
                action: 'save'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];

                switch (actionType) {
                    /**
                     * Save
                     */
                    case 'save':

                        this._AdminService.updatePermisosPromotorEvento(
                            formData.getRawValue().promotorId,
                            formData.getRawValue().eventoId,
                            formData.getRawValue()
                        ).subscribe(res => this.onGetEvento.emit());

                        break;
                }
            });
    }

    public deletePromotor(promotor): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = '¿Seguro que deseas eliminarlo?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._AdminService.deletePromotorFromEvento(this.evento._id, promotor._id).subscribe((res) => {
                    this.openSnackBar('Exito: Promotor eliminado del evento.', 'Entendido');

                    this.onGetEvento.emit();
                });
            }
            this.confirmDialogRef = null;
        });
    }
}
