import { Component, Input, OnInit }                from '@angular/core';
import { Evento }                                  from '../../../admin/admin.model';
import { FormGroup }                               from '@angular/forms';
import { AdminService }                            from '../../../admin/admin.service';
import { MatDialog }                               from '@angular/material';
import { AddinvitadoEventosFormPromotorComponent } from '../addinvitado-eventos-form-promotor/addinvitado-eventos-form-promotor.component';
import { STATIC_FOLDERS }                          from '../../../../app.constants';
import { AuthService }                             from '../../../../auth/auth.service';

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
    selector   : 'banner-eventos-table-promotor',
    templateUrl: './banner-eventos-table.component.html',
    styleUrls  : ['./banner-eventos-table.component.scss']
})
export class BannerEventosTablePromotorComponent implements OnInit {

    public eventos: Evento[] = [];

    public eventBannerFolder = STATIC_FOLDERS.EVENT_BANNERS;

    constructor (
        private _AdminService: AdminService,
        public _matDialog: MatDialog,
        private _AuthService: AuthService) {
    }

    ngOnInit (): void {
        this._AdminService.data.eventos
            .subscribe(eventos => {
                if (this._AuthService.user.type === 'promotor') {
                    this.eventos = eventos.filter(evento => {
                        let isAssigned = false;
                        evento.promotores.map(promotor => {
                            if (promotor._id === this._AuthService.user._id) {
                                isAssigned = true;
                            }
                        });
                        return isAssigned;
                    });
                }

                if (this._AuthService.user.type === 'puerta') {
                    this.eventos = eventos.filter(evento => {
                        console.log(evento._id, this._AuthService.user.event);
                        return evento._id === this._AuthService.user.event;
                    });
                }
            });
    }
}
