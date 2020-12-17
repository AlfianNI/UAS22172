import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
declare var google:any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  map:any;
  infoWindow:any = new google.maps.InfoWindow();
  @ViewChild('map',{read:ElementRef,static:false}) mapRef:ElementRef;
  umnPos: any = {
    lat:-6.256081,
    lng:106.618755
  };

  userLoc:any ={lat:0,lng:0};
  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.showMap(this.umnPos);
  }
  showCurrLoc(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position:Position)=>{
        const pos={
          lat:position.coords.latitude,
          lng:position.coords.longitude
        };
        this.infoWindow.setPosition(pos);
        this.infoWindow.open(this.map);
        this.map.setCenter(pos);
        this.infoWindow.setContent('You Are Here');
        console.log(pos);
        this.userLoc = {lat:pos.lat,lng:pos.lng};
      });
    }

  }

  showMap(pos:any){
    const location = new google.maps.LatLng(pos.lat,pos.lng);

    const options ={
      center:location,
      zoom:13,
      disableDefaultUI:true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement,options);
    const marker = new google.maps.Marker({
      position: this.userLoc,
      map: this.map
  });
  }

}
