import { NgModule }                                                                                                                                    from '@angular/core';
import { RouterModule }                                                                                                                                from '@angular/router';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule,
    MatMenuModule, MatOptionModule,
    MatRippleModule, MatSelectModule, MatSnackBarModule, MatTableModule, MatTabsModule,
    MatToolbarModule, MatTooltipModule
} from '@angular/material';

import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent }     from 'app/layout/components/toolbar/toolbar.component';
import { FileUploadModule }     from 'ng2-file-upload';

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    entryComponents: [],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
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
        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        FileUploadModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
