import { NgModule } from '@angular/core';

import { VerticalLayout1Module } from 'app/layout/main-layout/main-layout.module';

@NgModule({
    imports: [
        VerticalLayout1Module
    ],
    exports: [
        VerticalLayout1Module
    ]
})
export class LayoutModule
{
}
