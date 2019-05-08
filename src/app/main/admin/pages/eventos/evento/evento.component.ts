import { Component, OnInit, ViewChild }        from '@angular/core';
import { Box, Evento, Promotor, Invitado }     from '../../../admin.model';
import { BehaviorSubject }                     from 'rxjs';
import { AdminService }                        from '../../../admin.service';
import {
    MatDialog, MatSnackBar, MatPaginator,
    MatTableDataSource, MatSort, Sort
}                                              from '@angular/material';
import { PromotoresFormComponent }             from '../../../components/modals/promotores-form/promotores-form.component';
import { FormGroup }                           from '@angular/forms';
import { ActivatedRoute }                      from '@angular/router';
import { EventosFormComponent }                from '../../../components/modals/eventos-form/eventos-form.component';
import { PermisosPromotorEventoFormComponent } from '../../../components/modals/permisos-promotor-evento-form/permisos-promotor-evento-form.component';
import { STATIC_FOLDERS }                      from '../../../../../app.constants';
import { FileUploader }                        from 'ng2-file-upload';
import { AddinvitadoEventosFormComponent }     from '../../../components/modals/addinvitado-eventos-form/addinvitado-eventos-form.component';
import { AuthService }                         from '../../../../../auth/auth.service';
import { BoxesFormComponent }                  from '../../../components/modals/boxes-form/boxes-form.component';
import { FuseConfirmDialogComponent }          from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import * as XLSX                               from 'xlsx';
import { formatDate }                          from '@angular/common';

const URL = '/api/events/boxesmap';


function compare (a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
    selector   : 'app-evento',
    templateUrl: './evento.component.html',
    styleUrls  : ['./evento.component.scss']
})
export class EventoComponent implements OnInit {
    public evento: Evento = new Evento();
    public selectedPromotor: Promotor;
    public eventoId: any;
    public assignedPromotores: BehaviorSubject<Promotor[]> = new BehaviorSubject([]);
    public invitados: BehaviorSubject<Invitado[]> = new BehaviorSubject([]);
    public dataSourceInvitados: MatTableDataSource<any>;
    public promotores: Promotor[];
    public puertas: BehaviorSubject<Promotor[]> = new BehaviorSubject([]);
    public boxes: BehaviorSubject<Box[]> = new BehaviorSubject([]);
    private dialogRef: any;
    public displayedColumnsInvitados: string[] = ['name', 'promotor', 'fecha', 'actions'];
    public displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];
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
                 private _AuthService: AuthService) {
    }


    sortData (sort: Sort): void {
        const data = this.evento.invitados.slice();
        if (!sort.active || sort.direction === '') {
            this.dataSourceInvitados = new MatTableDataSource(data);
            this.dataSourceInvitados.paginator = this.paginator;
            this.dataSourceInvitados.sort = this.sort;
            return;
        }

        this.dataSourceInvitados = new MatTableDataSource(data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';


            switch (sort.active) {
                case 'name': return compare(a.name.toLowerCase().trim(), b.name.toLowerCase().trim(), isAsc);
                case 'promotor': return compare(a.promotor.name.toLowerCase().trim(), b.promotor.name.toLowerCase().trim(), isAsc);
                case 'fecha': return compare(a.date, b.date, isAsc);
                default: return 0;
            }
        }));

        this.dataSourceInvitados.paginator = this.paginator;
        this.dataSourceInvitados.sort = this.sort;
    }

    onFileSelected (filename: HTMLInputElement): void {
        this.uploader.uploadAll();

        this._AdminService.updateEventoBoxesmap(this.eventoId, filename.files[0].name)
            .subscribe(() => this.getEvento());
    }

    ngOnInit (): void {
        this._AdminService.fetchEventos();
        this.fetchEvent();
        this._AdminService.fetchPromotores();

        this._AdminService.data.promotores.subscribe(promotores => {
            this.promotores = promotores;
        });

    }



    private fetchEvent (): void {
        this._ActivatedRoute.paramMap.subscribe((params) => {
            this.eventoId = params.get('eventId');

            this.getEvento();
        });
    }

    public addPuerta (): void {
        this.dialogRef = this._matDialog.open(PromotoresFormComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                title : 'Agregar Puerta',
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }

                this._AdminService.addPuerta(response.getRawValue(), this.eventoId).subscribe(() => {
                    this.getEvento();
                });
            });
    }

    public addGuess (invitados = ''): void {
        this.dialogRef = this._matDialog.open(AddinvitadoEventosFormComponent, {
            panelClass: 'addinvitado-eventos-form-dialog',
            data      : {
                title     : 'Agregar Invitado',
                promotorId: this._AuthService.user._id,
                evento    : this.evento,
                invitados : invitados
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
                        if (result) {
                            this.addGuess(response.getRawValue().invitados);
                        }
                        this.confirmDialogRef = null;
                    });
                });
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

    public addBox (): void {
        this.dialogRef = this._matDialog.open(BoxesFormComponent, {
            panelClass: 'boxes-form-dialog',
            data      : {
                title : 'Agregar boxes',
                evento: this.evento
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }

                this._AdminService.addBoxToEvento(this.eventoId, response.getRawValue()).subscribe(() => {
                    this.getEvento();
                });
            });
    }

    editBox (box: any): void {
        this.dialogRef = this._matDialog.open(BoxesFormComponent, {
            panelClass: 'boxes-form-dialog',
            data      : {
                box   : box,
                action: 'edit',
                title : 'Editar boxes'
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

                        this._AdminService.updateBox(this.eventoId, formData.getRawValue())
                            .subscribe(res => this.getEvento());

                        break;
                }
            });
    }

    getEvento (): void {
        this._AdminService.getEvento(this.eventoId).subscribe(evento => {
            const promotoresCalculados = evento.promotores.map(promotor => {
                promotor.asistentes = 0;
                promotor.invitados = 0;

                evento.invitados.map(invitado => {
                    if (promotor._id === invitado.promotor._id) {
                        if (invitado.ingreso) {
                            promotor.asistentes++;
                        }

                        promotor.invitados++;
                    }
                });

                promotor.eficiencia = promotor.asistentes / promotor.invitados;

                return promotor;
            });

            this.puertas.next(evento.puertas);
            this.boxes.next(evento.boxes);
            this.evento = evento;
            this.evento.asistentes = this.getAsistentes(this.evento.invitados);
            this.evento.boxesDisponibles = this.getBoxesDisponibles(evento.boxes);
            this.evento.asistentesPercentage = this.evento.asistentes / this.evento.invitados.length;


            this.dataSourceInvitados = new MatTableDataSource(evento.invitados);
            this.dataSourceInvitados.paginator = this.paginator;
            this.dataSourceInvitados.sort = this.sort;

        });
    }

    public openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 5000,
        });
    }

    addPromotorToEvent (): void {
        this._AdminService.addPromotorToEvento(this.evento._id, this.selectedPromotor._id).subscribe((res) => {
            this.getEvento();
            this.selectedPromotor = null;
            this.openSnackBar('Exito: Promotor asignado correctamente al evento.', 'Entendido');
        }, (error) => {
            if (error.status === 422) {
                this.openSnackBar('Error: El Promotor ya se encuentra asignado a este evento.', 'Entendido');
            }
        });
    }

    editEvento (evento: Evento): void {
        this.dialogRef = this._matDialog.open(EventosFormComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                evento: evento,
                action: 'edit'
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
                        console.log('guardando evento', this.eventoId);

                        this._AdminService.updateEvento(formData.getRawValue())
                            .subscribe(res => this.getEvento());

                        break;
                }
            });
    }



    editPuerta (promotor: Promotor): void {
        this.dialogRef = this._matDialog.open(PromotoresFormComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                promotor: promotor,
                action  : 'edit'
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

                        this._AdminService.updatePromotor(formData.getRawValue())
                            .subscribe(res => this.getEvento());

                        break;
                }
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


    public deletePuerta (puerta): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = '¿Seguro que deseas eliminarlo?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._AdminService.deletePuerta(this.eventoId, puerta._id).subscribe((res) => {
                    this.openSnackBar('Exito: Puerta eliminada del evento.', 'Entendido');
                    this.getEvento();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public deleteBox (box: any): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = '¿Seguro que deseas eliminarlo?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._AdminService.deleteBoxFromEvento(this.eventoId, box._id).subscribe((res) => {
                    this.openSnackBar('Exito: Box eliminado del evento.', 'Entendido');
                    this.getEvento();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public deleteInvitado (invitado: any): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = `¿Seguro que deseas eliminar a ${invitado.name}?`;

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._AdminService.deleteInvitadoFromEvento(this.eventoId, invitado._id).subscribe((res) => {
                    this.openSnackBar('Exito: Invitado eliminado del evento.', 'Entendido');
                    this.getEvento();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    exportTableInvitados (): void {
        const dataWithFormattedDates = this.evento.invitados.map((invitado) => {
            delete invitado._id;
            invitado.fechaIngreso = invitado.fechaIngreso ? formatDate(invitado.fechaIngreso, 'short', 'en-us') : '';
            invitado.date = invitado.date ? formatDate(invitado.date, 'short', 'en-us') : '';
            invitado.promotor = invitado.promotor.name;
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
}
