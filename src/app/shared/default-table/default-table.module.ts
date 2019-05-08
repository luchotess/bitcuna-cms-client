import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';

import { ServiceTableComponent } from './default-table.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        ServiceTableComponent
    ],
    imports     : [
        FuseSharedModule,
        MatTableModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        DragDropModule
    ],
    exports     : [
        ServiceTableComponent
    ]
})

export class DefaultTableModule
{
}
