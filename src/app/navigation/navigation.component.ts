import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '../_services';

@Component({
  templateUrl: 'navigation.component.html',
  //styleUrls: ['./navigation.css']
})
export class NavigationComponent implements OnInit {
  subscription:any;
  btnName = ''
  // registerForm: FormGroup;
  loading = false;
  submitted = false;
  
  currLat: any;
  currLng: any;
  wayLat: any;
  wayLng: any;
  waypoint: any = [];
  waypointObj: any;
  origin: any;
  des: any;
  duplicateArr: any = [];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.btnName = 'START';
    this.duplicateArr = ["12.967348,80.152687", "12.956010,80.143532", "12.945350, 80.129688"];
  }

  ngOnInit() {

  }



  findme() {

    if (this.btnName == 'START') {
      this.btnName = 'STOP';
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

          this.currLat = position.coords.latitude;
          this.currLng = position.coords.longitude;
          localStorage.setItem('orginlat', this.currLat);
          localStorage.setItem('orginlng', this.currLng);

          this.subscription = interval(60000).subscribe(n => {
            console.log(`It's been ${n} seconds since subscribing!`)
            this.waypoints()
          });
        });
      }
      else {
        alert("Geolocation is not supported by this browser.");
      }
    } else {
      this.btnName = 'START';
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          // this.currLat = position.coords.latitude;
          // this.currLng = position.coords.longitude;
          this.currLat = 12.922915;
          this.currLng = 80.127457;
          localStorage.setItem('deslat', this.currLat);
          localStorage.setItem('deslng', this.currLng);
          localStorage.setItem('waypoint', JSON.stringify(this.waypoint));
          this.subscription.unsubscribe()
        });
      }
      else {
        alert("Geolocation is not supported by this browser.");
      }
    }

  }

  waypoints() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.wayLat = position.coords.latitude;
        this.wayLng = position.coords.longitude;
      });

      //this.waypointObj = { location: this.wayLat + "," + this.wayLng, stopover: true };
      //this.waypoint.push(this.waypointObj);
      this.duplicateArr.forEach(element => {
        this.waypointObj = { location: element, stopover: true };
        this.waypoint.push(this.waypointObj);
      });

    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
