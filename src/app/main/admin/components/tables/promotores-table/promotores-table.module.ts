import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';

import { PromotoresTableComponent } from './promotores-table.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatTableModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        PromotoresTableComponent
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
        PromotoresTableComponent
    ]
})

export class PromotoresTableModule {}
