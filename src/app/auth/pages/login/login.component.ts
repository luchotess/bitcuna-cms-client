import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations/index';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    wrongUsername = false;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _AuthService: AuthService,
        private router: Router
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            username   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    public loginAttemp(): void {
        this._AuthService.login({
            username: this.loginForm.value.username.trim().toLowerCase(),
            password: this.loginForm.value.password
        }).subscribe((response: any) => {
            this._AuthService.setUserFromToken(response.authToken);

            this.router.navigate(['admin/pages/home']);

        }, (err) => {
            this.wrongUsername = true;
        });
    }
}
