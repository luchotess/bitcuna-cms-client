import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';

import { EventosTableComponent } from './eventos-table.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatTableModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        EventosTableComponent
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
        EventosTableComponent
    ]
})

export class EventosTableModule {}
