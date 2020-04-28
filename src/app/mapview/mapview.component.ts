import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MouseEvent } from '@agm/core';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '../_services';
import { from } from 'rxjs';

@Component({ templateUrl: 'mapview.component.html' })
export class MapviewComponent implements OnInit {
    //initial center position
    name = 'Angular 5';
    lat: Number = 41.85;
    lng: Number = -87.65;
    //google maps zoom
    zoom: Number = 6;

    //Get Directions
    dir = undefined;
    origin: any;
    des: any;
    waypoints: any;
    loading = false;
    submitted = false;
    //public secondsCounter;
    constructor(
        // private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {

    }

    public getDirection() {
        this.origin = localStorage.getItem('orginlat') + "," + localStorage.getItem('orginlng');
        this.des = localStorage.getItem('deslat') + "," + localStorage.getItem('deslng');
        this.waypoints = localStorage.getItem('waypoint');
        this.waypoints = JSON.parse( this.waypoints);
        console.log( this.waypoints);
       // this.waypoints = [{ location: "montreal, quebec", stopover: true }, { "location": "toronto, ont", "stopover": true }, { "location": "winnipeg, mb", "stopover": true }, { "location": "spokane, wa", "stopover": true }]
       // console.log(  this.waypoints);
        this.dir = {
            // origin: 'Halifax, NS',
            // destination: 'Los Angeles, CA',
            origin: this.origin,
            destination: this.des,
            waypoints: this.waypoints,
            optimizeWaypoints: true,
            travelMode: 'DRIVING',
        }
        console.log(this.dir);

    }


    ngOnInit() {
        this.getDirection();
    }
}