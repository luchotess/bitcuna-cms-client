import { NgModule }                       from '@angular/core';
import { BrowserModule }                  from '@angular/platform-browser';
import { HttpClientModule }               from '@angular/common/http';
import { BrowserAnimationsModule }        from '@angular/platform-browser/animations';
import { RouterModule, Routes }           from '@angular/router';
import { MatMomentDateModule }            from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule }                from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule }                                                       from '@fuse/fuse.module';
import { FuseSharedModule }                                                 from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig }                    from 'app/fuse-config';
import { AuthGuardService as AuthGuard } from 'app/auth/auth-guard.service';

import { AppComponent }        from 'app/app.component';
import { LayoutModule }        from 'app/layout/layout.module';

const appRoutes: Routes = [
    {
        path        : 'admin',
        canActivate : [AuthGuard],
        loadChildren: './main/admin/admin.module#AdminModule'
    },
    {
        path        : 'promotor',
        loadChildren: './main/promotor/promotor.module#PromotorModule'
    },
    {
        path        : 'puerta',
        loadChildren: './main/promotor/promotor.module#PromotorModule'
    },
    {
        path        : 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    }
    ,
    {
        path      : '**',
        redirectTo: 'admin/eventos'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,

        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule {
}
