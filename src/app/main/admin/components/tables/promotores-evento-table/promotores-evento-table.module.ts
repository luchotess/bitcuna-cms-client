import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';

import { PromotoresEventoTableComponent } from './promotores-evento-table.component';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        PromotoresEventoTableComponent
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
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule
    ],
    exports     : [
        PromotoresEventoTableComponent
    ]
})

export class PromotoresEventoTableModule {}
