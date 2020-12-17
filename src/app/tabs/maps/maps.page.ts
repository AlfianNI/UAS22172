
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';

const { Geolocation } = Plugins;
declare var google: any;

@Component({
    selector: 'app-maps',
    templateUrl: './maps.page.html',
    styleUrls: ['./maps.page.scss'],
})
export class MapsPage {
    locations: Observable<any>;
    locationsCollection: AngularFirestoreCollection<any>;
    isCheckIn: boolean = false;
    locName: string;

    async ionViewWillEnter() {
        await this.getCurrentLocation();
        this.showMap();
    }

    @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
    map: any;
    markers = [];
    userLoc = {lat: -6.181589, lng: 106.663363};
    infoWindow:any = new google.maps.InfoWindow();

    constructor(private afs: AngularFirestore) {
        this.getCurrentLocation();
    }

    ionViewDidEnter(){
        this.showMap();
      }

    showMap() {
        const options = {
            center: new google.maps.LatLng(this.userLoc.lat, this.userLoc.lng),
            zoom: 15,
            disableDefaultUI: true
        };
        this.map = new google.maps.Map(this.mapRef.nativeElement, options);

        const marker = new google.maps.Marker({
            position: this.userLoc,
            map: this.map
        });
    }

    toggleCheckIn() {
        this.isCheckIn = !this.isCheckIn;
    }

    getCurrentLocation() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position:Position)=>{
              const pos={
                lat:position.coords.latitude,
                lng:position.coords.longitude
              };
              console.log(pos);
              this.infoWindow.setPosition(pos);
              this.infoWindow.setContent('Your Current Location');
              this.infoWindow.open(this.map);
              this.map.setCenter(pos);
            });
          }
    }

    addCheckIn() {
        //var.

        //}
    }

    centerMap(){

    }
}

