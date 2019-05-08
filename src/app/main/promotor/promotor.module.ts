import { NgModule }                                from '@angular/core';
import { CommonModule }                            from '@angular/common';
import { RouterModule }                            from '@angular/router';
import { DashboardListPromotorComponent }          from './pages/dashboard/list/dashboard-list.component';
import { PromotoresTableModule }                   from '../admin/components/tables/promotores-table/promotores-table.module';
import { EventPromotoresTableModule }              from '../admin/components/tables/event-promotores-table/event-promotores-table.module';
import { DashboardTableModule }                    from '../admin/components/tables/dashboard-table/dashboard-table.module';
import { EventosTableModule }                      from '../admin/components/tables/eventos-table/eventos-table.module';
import { TranslateModule }                         from '@ngx-translate/core';
import { FuseSharedModule }                        from '../../../@fuse/shared.module';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule,
    MatMenuModule, MatOptionModule, MatPaginatorModule,
    MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule,
    MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { FuseConfirmDialogModule }                 from '../../../@fuse/components';
import { EventosListPromotorComponent }            from './pages/eventos/list/eventos-list-promotor.component';
import { EventosPromotorComponent }                from './pages/eventos/eventosPromotor.component';
import { EventoPromotorComponent }                 from './pages/eventos/evento/evento-promotor.component';
import { BannerEventosTablePromotorComponent }     from './components/banner-eventos-table-promotor/banner-eventos-table-promotor.component';
import { AddinvitadoEventosFormPromotorComponent } from './components/addinvitado-eventos-form-promotor/addinvitado-eventos-form-promotor.component';
import { BoxesFormReservarComponent }              from './components/boxes-form-reservar/boxes-form-reservar.component';
import { InviteComponent }                         from './pages/invite/invite.component';

const routes = [
    {
        path     : 'invite/:eventId/:promotorId',
        component: InviteComponent
    },
    {
        path     : 'eventos',
        component: EventosPromotorComponent,
        children : [
            {
                path     : '',
                component: EventosListPromotorComponent
            },
            {
                path     : ':eventId',
                component: EventoPromotorComponent
            }
        ]
    },
];

@NgModule({
    declarations   : [
        DashboardListPromotorComponent,
        BannerEventosTablePromotorComponent,
        EventosPromotorComponent,
        EventosListPromotorComponent,
        EventoPromotorComponent,
        AddinvitadoEventosFormPromotorComponent,
        BoxesFormReservarComponent,
        InviteComponent
    ],
    imports        : [
        RouterModule.forChild(routes),
        CommonModule,
        PromotoresTableModule,
        EventPromotoresTableModule,
        DashboardTableModule,
        EventosTableModule,
        TranslateModule,

        FuseSharedModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatTabsModule,
        MatOptionModule,
        MatSelectModule,
        MatListModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatSnackBarModule,
        MatSortModule,
        MatPaginatorModule,
        FuseConfirmDialogModule
    ],
    entryComponents: [
        AddinvitadoEventosFormPromotorComponent,
        BoxesFormReservarComponent
    ]
})
export class PromotorModule {
}
