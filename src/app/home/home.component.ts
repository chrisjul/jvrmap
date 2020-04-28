import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    totKM = '';
    currentUser: User;
    users = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService, public router:Router
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.totKM = '25KM'
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    viewMap(id: number) {
        this.router.navigate(['/mapview'])
       /* this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());*/
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}