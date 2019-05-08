import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';

import { DashboardTableComponent } from './dashboard-table.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatTableModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        DashboardTableComponent
    ],
    imports     : [
        FuseSharedModule,
        MatTableModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatInputModule,
        DragDropModule,
        MatButtonModule
    ],
    exports     : [
        DashboardTableComponent
    ]
})

export class DashboardTableModule {}
