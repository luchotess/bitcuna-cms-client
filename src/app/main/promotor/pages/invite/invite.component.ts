import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseConfigService }                    from '@fuse/services/config.service';
import { fuseAnimations }                       from '@fuse/animations';
import { AuthService }                          from '../../../../auth/auth.service';
import { ActivatedRoute }                       from '@angular/router';
import { MatDialog, MatSnackBar }               from '@angular/material';
import { AdminService }                         from '../../../admin/admin.service';
import { STATIC_FOLDERS }                       from '../../../../app.constants';
import { FormBuilder, FormGroup }               from '@angular/forms';
import { FuseConfirmDialogComponent }           from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector     : 'login',
    templateUrl  : './invite.component.html',
    styleUrls    : ['./invite.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class InviteComponent implements OnInit {
    public eventoId: any = '';
    public evento: any = {};
    public eventBannerFolder = STATIC_FOLDERS.EVENT_BANNERS;
    eventoForm: FormGroup;
    promotorId: string;
    invitados = '';
    done = false;
    private confirmDialogRef: any;

    constructor (
        private _fuseConfigService: FuseConfigService,
        private _ActivatedRoute: ActivatedRoute,
        public snackBar: MatSnackBar,
        private _AdminService: AdminService,
        private _AuthService: AuthService,
        private _matDialog: MatDialog,
        private _formBuilder: FormBuilder
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

    }

    getEvento (): void {
        this._AdminService.getEvento(this.eventoId).subscribe(evento => {
            this.evento = evento;
        });
    }

    private fetchEvent (): void {
        this._ActivatedRoute.paramMap.subscribe((params) => {
            this.eventoId = params.get('eventId');
            this.promotorId = params.get('promotorId');
            this.eventoForm = this.createEventoForm();

            this.getEvento();
        });
    }

    createEventoForm (): FormGroup {
        return this._formBuilder.group({
            eventId   : [this.eventoId],
            invitados : [this.invitados],
            promotorId: [this.promotorId]
        });
    }

    invitar (): void {
        this._AdminService.addInvitadosToEvento(this.eventoForm.getRawValue()).subscribe(() => {
            this.done = true;
        }, (error) => {

            if (error.status === 422) {
                this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
                    disableClose: false
                });

                this.confirmDialogRef.componentInstance.title = error.error.message;
                this.confirmDialogRef.componentInstance.confirmMessage = 'Porfavor corregir los siguientes invitados:';
                this.confirmDialogRef.componentInstance.invitados = error.error.repetidos;

                this.confirmDialogRef.afterClosed().subscribe(result => {
                    this.confirmDialogRef = null;
                });
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit (): void {
        this._AdminService.fetchEventos();

        this.fetchEvent();
    }
}
