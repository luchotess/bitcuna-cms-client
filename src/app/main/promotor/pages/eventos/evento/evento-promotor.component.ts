import { Component, OnInit, ViewChild }                                            from '@angular/core';
import { Box, Evento, Promotor, Invitado }                                         from '../../../../admin/admin.model';
import { BehaviorSubject }                                                         from 'rxjs';
import { AdminService }                                                            from '../../../../admin/admin.service';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { FormGroup }                                                               from '@angular/forms';
import { ActivatedRoute }                                                          from '@angular/router';
import { STATIC_FOLDERS }                                                          from '../../../../../app.constants';
import { FileUploader }                                                            from 'ng2-file-upload';
import { AuthService }                                                             from '../../../../../auth/auth.service';
import { FuseConfirmDialogComponent }                               from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import { AddinvitadoEventosFormPromotorComponent } from '../../../components/addinvitado-eventos-form-promotor/addinvitado-eventos-form-promotor.component';
import { BoxesFormReservarComponent }              from '../../../components/boxes-form-reservar/boxes-form-reservar.component';
import { formatDate }                              from '@angular/common';
import * as XLSX                                   from 'xlsx';

const URL = '/api/events/boxesmap';

function compare (a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
    selector   : 'app-evento',
    templateUrl: './evento.component.html',
    styleUrls  : ['./evento.component.scss']
})
export class EventoPromotorComponent implements OnInit {
    public evento: Evento = new Evento();
    public selectedPromotor: Promotor;
    public eventoId: any;
    public assignedPromotores: BehaviorSubject<Promotor[]> = new BehaviorSubject([]);
    public invitadosDatasource: any;
    public invitados: any = [];
    public promotores: Promotor[];
    public puertas: BehaviorSubject<Promotor[]> = new BehaviorSubject([]);
    public boxes: BehaviorSubject<Box[]> = new BehaviorSubject([]);
    private dialogRef: any;
    public displayedColumns: string[] = ['name', 'actions'];
    public displayedColumnsbox: string[] = ['name', 'capacidad', 'phone', 'actions'];
    public eventBannerFolder = STATIC_FOLDERS.EVENT_BANNERS;
    public eventBoxesmapFolder = STATIC_FOLDERS.EVENT_BOXES;
    public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
    private confirmDialogRef: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor (private _AdminService: AdminService,
                 private _matDialog: MatDialog,
                 private _ActivatedRoute: ActivatedRoute,
                 public snackBar: MatSnackBar,
                 public _AuthService: AuthService) {
    }

    sortData (sort: Sort): void {
        const data = this.evento.invitados.slice();
        if (!sort.active || sort.direction === '') {
            this.invitadosDatasource = new MatTableDataSource(data);
            this.invitadosDatasource.paginator = this.paginator;
            this.invitadosDatasource.sort = this.sort;
            return;
        }

        this.invitadosDatasource = new MatTableDataSource(data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';

            switch (sort.active) {
                case 'name': return compare(a.name.toLowerCase().trim(), b.name.toLowerCase().trim(), isAsc);
                default: return 0;
            }
        }));

        this.invitadosDatasource.paginator = this.paginator;
        this.invitadosDatasource.sort = this.sort;
    }

    ngOnInit (): void {
        this._AdminService.fetchEventos();

        this.fetchEvent();
        this._AdminService.fetchPromotores();

        this._AdminService.data.promotores.subscribe(promotores => {
            this.promotores = promotores;
        });
    }

    applyFilter (filterValue: string): void {
        this.invitadosDatasource.filter = filterValue.trim().toLowerCase();

        if (this.invitadosDatasource.paginator) {
            this.invitadosDatasource.paginator.firstPage();
        }
    }

    public openSnackBar (message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 5000,
        });
    }

    public generateLink (): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.title = 'Comparte este link con tus invitados';
        this.confirmDialogRef.componentInstance.confirmMessage = `http://www.sevenperweek.com/promotor/invite/${this.eventoId}/${this._AuthService.user._id}`;

        this.confirmDialogRef.afterClosed().subscribe(result => {
            this.confirmDialogRef = null;
        });
    }

    private fetchEvent (): void {
        this._ActivatedRoute.paramMap.subscribe((params) => {
            this.eventoId = params.get('eventId');

            this.getEvento();
        });
    }

    public boxesAllowed (): boolean {
        if (this._AuthService.user.type === 'puerta') {
            return true;
        }

        return this._AuthService.user.permissions[this.eventoId] && this._AuthService.user.permissions[this.eventoId].boxes;
    }

    public addGuess (invitados = ''): void {
        this.dialogRef = this._matDialog.open(AddinvitadoEventosFormPromotorComponent, {
            panelClass: 'addinvitado-eventos-form-dialog',
            data      : {
                title: 'Agregar Invitado',
                promotorId: this._AuthService.user._id,
                evento: this.evento,
                invitados: invitados
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }

                this._AdminService.addInvitadosToEvento(response.getRawValue()).subscribe(() => {
                    this.getEvento();
                }, (error) => {

                    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
                        disableClose: false
                    });

                    this.confirmDialogRef.componentInstance.title = error.error.message;
                    this.confirmDialogRef.componentInstance.confirmMessage = 'Porfavor corregir los siguientes invitados:';
                    this.confirmDialogRef.componentInstance.invitados = error.error.repetidos;

                    this.confirmDialogRef.afterClosed().subscribe(result => {
                        if ( result )
                        {
                            this.addGuess(response.getRawValue().invitados);
                        }
                        this.confirmDialogRef = null;
                    });
                });
            });
    }

    exportTableInvitados (): void {
        const dataWithFormattedDates = this.evento.invitados.map((invitado) => {
            delete invitado._id;
            delete invitado.promotor;
            invitado.fechaIngreso = invitado.fechaIngreso ? formatDate(invitado.fechaIngreso, 'short', 'en-us') : '';
            invitado.date = invitado.date ? formatDate(invitado.date, 'short', 'en-us') : '';
            return invitado;
        });

        let today: any = new Date();
        today = formatDate(today, 'short', 'en-us');

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataWithFormattedDates);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, `sevenperweek-${this.evento.name}-invitados-${today}.xlsx`);
    }


    getEvento (): void {
        this._AdminService.getEvento(this.eventoId).subscribe(evento => {
            this.assignedPromotores.next(evento.promotores);
            this.puertas.next(evento.puertas);
            this.boxes.next(evento.boxes);

            this.invitados = this._AuthService.user.type === 'promotor' ?
                evento.invitados.filter(invitado => invitado.promotor._id === this._AuthService.user._id) :
                evento.invitados;



            this.invitadosDatasource = new MatTableDataSource(this.invitados);
            this.invitadosDatasource.paginator = this.paginator;
            this.invitadosDatasource.sort = this.sort;

            this.evento = evento;
            this.evento.asistentes = this.getAsistentes(this.invitados);
            this.evento.boxesDisponibles = this.getBoxesDisponibles(evento.boxes);
            this.evento.asistentesPercentage = this.evento.asistentes / this.invitados.length;
        });
    }

    getAsistentes (invitados): number {
        let total = 0;

        invitados.map(invitado => {
            if (invitado.ingreso) {
                total++;
            }
        });

        return total;
    }

    marcarIngresoInvitado (invitadoId: any): void {
        if (this.evento.timeLimit !== '') {
            let eventTimeLimit = parseInt(this.evento.timeLimit.split(':')[0], 10);

            let currentHour = parseInt(formatDate(Date.now(),  'h', 'en-us'), 10);
            const currentAM = formatDate(Date.now(),  'a', 'en-us') === 'AM';
            const eventAM = this.evento.timeLimit.split(' ')[1] === 'AM';

            if (eventAM) {
                eventTimeLimit += 12;
            }

            if (currentAM && currentHour !== 12) {
                currentHour += 12;
            }

            if (currentHour < eventTimeLimit) {
                this._AdminService.marcarIngresoInvitado(this.eventoId, invitadoId).subscribe(() => this.getEvento());
            } else {
                alert('El evento ya empezó.');
            }
        } else {
            this._AdminService.marcarIngresoInvitado(this.eventoId, invitadoId).subscribe(() => this.getEvento());
        }

    }

    getBoxesDisponibles (boxes): number {
        const totalBoxes = boxes.length;
        let totalReservados = 0;

        boxes.map(box => {
            if (box.reservado) {
                totalReservados++;
            }
        });

        return totalBoxes - totalReservados;
    }

    reservarBox (box): void {
        this.dialogRef = this._matDialog.open(BoxesFormReservarComponent, {
            panelClass: 'boxes-form-dialog',
            data      : {
                promotorId: this._AuthService.user._id,
                box       : box
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }

                this._AdminService.reservarBox(this.eventoId, response.getRawValue()).subscribe(() => {
                    this.getEvento();
                });
            });
    }

    reclamarBox (box): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.title = box.name;
        this.confirmDialogRef.componentInstance.confirmMessage = 'Confirmar reclamo de box. Se marcará el ingreso del invitado.';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._AdminService.reclamarBox(this.eventoId, box._id).subscribe((res) => {
                    this.openSnackBar('Exito: Box reclamado. Ingreso registrado.', 'Entendido');
                    this.getEvento();
                });
            }
            this.confirmDialogRef = null;
        });
    }
}
