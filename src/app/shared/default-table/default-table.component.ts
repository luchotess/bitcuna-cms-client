import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material';

export class Service {
    stage: string;
    description: string;
    resource = new Resource();
    area: string;
    duration = 1;
}

export class Resource {
    description: string;
    dailyCost = 1;
}

@Component({
    selector: 'default-table',
    templateUrl: './default-table.component.html',
    styleUrls: ['./default-table.component.scss']
})
export class ServiceTableComponent implements OnInit {
    displayedColumns: string[] = ['stage', 'description', 'resource', 'area', 'duration', 'cost'];

    @Input() dataSource: BehaviorSubject<Service[]>;
    @Input() admin = [];

    stages = [
        {
            name: 'Planificación'
        },
        {
            name: 'Diseño'
        },
        {
            name: 'Desarrollo'
        },
        {
            name: 'Reporte'
        }
    ];

    areas = [
        {
            name: 'Diseño'
        },
        {
            name: 'Desarrollo'
        },
        {
            name: 'Cuentas'
        }
    ];

    data = [];

    getCost (cost, duration): number {
        return parseFloat(cost) * parseFloat(duration);
    }

    drop (event: CdkDragDrop<string[]>): void {
        const newArray = [...this.data];
        console.log(this.data);

        moveItemInArray(newArray, event.previousIndex, event.currentIndex);
        this.data = [...newArray];
        console.log(this.data);
    }

    ngOnInit (): void {
        this.data = this.dataSource.value;
    }
}
