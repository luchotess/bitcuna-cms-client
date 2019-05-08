import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from '../../../admin.service';
import { Promotor } from '../../../admin.model';
import { MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { PromotoresFormComponent } from '../../../components/modals/promotores-form/promotores-form.component';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FuseNavigationService} from '../../../../../../@fuse/components/navigation/navigation.service';

@Component({
    selector: 'service-viewer',
    templateUrl: './promotores-list.component.html',
    styleUrls: ['./promotores-list.component.scss']
})
export class PromotoresListComponent implements OnInit {
    public promotores: BehaviorSubject<Promotor[]>;
    private dialogRef: any;
    public page = '';
    currentPage;

    language = 'en';

    public fields: any = [];
    public childBlocks: any = [{name: 'Loading'}];

    constructor (private _AdminService: AdminService,
                 private _matDialog: MatDialog,
                 private _ActivatedRoute: ActivatedRoute,
                 private _HttpClient: HttpClient,
                 private _FuseNavigationService: FuseNavigationService) {}

    ngOnInit (): void {
        this._ActivatedRoute.params.subscribe(params => {
            this.page = params.page;

            this.getPageFields();
        });
    }

    changeLanguage () {
        this.language = this.language === 'es' ? 'en' : 'es';
    }

    getPageFields (): void {

        this.currentPage = this._FuseNavigationService.navigationPages.find(nav => nav.name === this.page);

        this._HttpClient.get(`/api/blocks/${this.currentPage._id}/fields`).subscribe(page => {
            this.fields = page['fields'];
            this.childBlocks = page['childBlocks'];
        });
    }
}
