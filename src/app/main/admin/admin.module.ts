import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'ng2-file-upload';
import { FuseSharedModule } from '@fuse/shared.module';

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
import { CmsPageComponent } from './pages/cms-page/cms-page.component';
import { FuseConfirmDialogModule } from '../../../@fuse/components';
import { FieldComponent } from './pages/cms-page/components/field/field.component';
import { FieldGroupComponent } from './pages/cms-page/components/fieldGroup/fieldGroup.component';
import { FieldArrayComponent } from './pages/cms-page/components/fieldArray/fieldArray.component';
import { CMSResolver } from './cms.resolver';
import { TypesResolver } from './types.resolver';

const routes = [
    {
        path: 'pages/:page',
        component: CmsPageComponent,
        resolve: {
            content: CMSResolver,
            types: TypesResolver
        }
    }
];

@NgModule({
    declarations: [
        CmsPageComponent,
        FieldComponent,
        FieldGroupComponent,
        FieldArrayComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        FileUploadModule,
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

    entryComponents: []
})

export class AdminModule {
}
