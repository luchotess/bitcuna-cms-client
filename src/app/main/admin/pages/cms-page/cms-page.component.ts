import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from '../../admin.service';
import { Promotor } from '../../admin.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FuseNavigationService } from '../../../../../@fuse/components/navigation/navigation.service';

@Component({
    selector: 'cms-page',
    templateUrl: './cms-page.component.html',
    styleUrls: ['./cms-page.component.scss']
})
export class CmsPageComponent implements OnInit {
    public page = '';
    public currentPage;

    public fields: any = [];
    public childBlocks: any = [{name: 'Loading'}];

    constructor (private _AdminService: AdminService,
                 private _ActivatedRoute: ActivatedRoute,
                 private _fuseNavigationService: FuseNavigationService,
                 public snackBar: MatSnackBar,
                 private route: ActivatedRoute) {
    }

    ngOnInit (): void {
        this._AdminService.localContent = this.route.snapshot.data.content;
        this._AdminService.customTypes = this.route.snapshot.data.types;
        this.buildNavigation();

        this._ActivatedRoute.params.subscribe(params => {
            this.page = params.page;
            this.currentPage = this._AdminService.localContent[this.page];
        });
    }

    buildNavigation (): void {
        const newNavigation = [];

        for (const nav in this._AdminService.localContent) {
            if (this._AdminService.localContent.hasOwnProperty(nav)) {
                newNavigation.push({
                    id   : nav,
                    title: nav,
                    type : 'item',
                    icon : 'dashboard',
                    url  : '/admin/pages/' + nav
                });
            }
        }

        this._fuseNavigationService.updateNavigationItem('admin', {
            children: newNavigation
        });
    }

    public openSnackBar (message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 5000,
        });
    }

    saveChanges (): void {
        this._AdminService.saveCMS(this._AdminService.localContent)
            .subscribe(updatedCMS => {
                console.log(updatedCMS);

                this.openSnackBar('Contenido Actualizado', 'Ocultar');
            });
    }
}
