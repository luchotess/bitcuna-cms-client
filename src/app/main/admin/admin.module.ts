import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';
import { TranslateModule }     from '@ngx-translate/core';
import { FileUploadModule } from 'ng2-file-upload';
import { FuseSharedModule }    from '@fuse/shared.module';

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
import { PromotoresListComponent }             from './pages/promotores/list/promotores-list.component';
import { PromotoresTableModule }               from './components/tables/promotores-table/promotores-table.module';
import { PromotoresFormComponent }             from './components/modals/promotores-form/promotores-form.component';
import { FuseConfirmDialogModule }             from '../../../@fuse/components';
import { EventosListComponent }                from './pages/eventos/list/eventos-list.component';
import { EventosTableModule }                  from './components/tables/eventos-table/eventos-table.module';
import { EventosFormComponent }                from './components/modals/eventos-form/eventos-form.component';
import { AddpromotorEventosFormComponent }     from './components/modals/addpromotor-eventos-form/addpromotor-eventos-form.component';
import { AddinvitadoEventosFormComponent }     from './components/modals/addinvitado-eventos-form/addinvitado-eventos-form.component';
import { ConfigboxEventosFormComponent }       from './components/modals/configbox-eventos-form/configbox-eventos-form.component';
import { DashboardListComponent }              from './pages/dashboard/list/dashboard-list.component';
import { EventoComponent }                     from './pages/eventos/evento/evento.component';
import { DashboardTableModule }                from './components/tables/dashboard-table/dashboard-table.module';
import { EventosComponent }                    from './pages/eventos/eventos.component';
import { BannerEventosTableComponent }         from './components/tables/banner-eventos-table/banner-eventos-table.component';
import { EventPromotoresTableModule }          from './components/tables/event-promotores-table/event-promotores-table.module';
import { PermisosPromotorEventoFormComponent } from './components/modals/permisos-promotor-evento-form/permisos-promotor-evento-form.component';
import { BoxesFormComponent }                  from './components/modals/boxes-form/boxes-form.component';
import {PromotoresEventoTableModule} from './components/tables/promotores-evento-table/promotores-evento-table.module';

const routes = [
    {
        path     : 'pages/:page',
        component: PromotoresListComponent
    }
];

@NgModule({
    declarations: [
        PromotoresListComponent,
        PromotoresFormComponent,
        EventosFormComponent,
        AddpromotorEventosFormComponent,
        AddinvitadoEventosFormComponent,
        ConfigboxEventosFormComponent,
        BannerEventosTableComponent,
        DashboardListComponent,
        EventosListComponent,
        EventoComponent,
        EventosComponent,
        PermisosPromotorEventoFormComponent,
        BoxesFormComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        PromotoresTableModule,
        EventPromotoresTableModule,
        DashboardTableModule,
        EventosTableModule,
        TranslateModule,
        FileUploadModule,
        PromotoresEventoTableModule,
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
        PromotoresFormComponent,
        EventosFormComponent,
        AddpromotorEventosFormComponent,
        ConfigboxEventosFormComponent,
        AddinvitadoEventosFormComponent,
        BoxesFormComponent,
        PermisosPromotorEventoFormComponent
    ]
})

export class AdminModule {
}
