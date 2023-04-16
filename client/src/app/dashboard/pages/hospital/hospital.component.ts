import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'uni-hospital',
  templateUrl: 'hospital.component.html',
  styleUrls: ["hospital.component.scss", "../../common.style.scss"]
})

export class HospitalComponent implements AfterViewInit, OnChanges, OnInit {


  constructor(private profileService: ProfileService, private userService: UserService) {
    this.getLocationData = this.getLocationData.bind(this)
  }

  @ViewChild('map') mapElement!: ElementRef<HTMLDivElement>
  map!: google.maps.Map;

  ngOnChanges(changes: SimpleChanges): void {

  }
  ngAfterViewInit(): void {
    console.log(this.mapElement.nativeElement);
  }

  userService$ = this.userService.currentUser;




  ngOnInit(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyC9t2oRtesSGm0c3B1TG0mNNFgr8sb42-o',
      version: 'weekly'
    });

    loader.load().then(async () => {
      // const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      // this.map = new Map(document.getElementById("map") as HTMLElement, {
      //   center: { lat: -34.397, lng: 150.644 },
      //   zoom: 8,
      // });
      const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;
      const element = this.mapElement.nativeElement;
      const location = await this.getLocationData();
      console.log(location)
      if (element) {
        this.map = new Map(element, {
          center: { lat: location.lat, lng: location.lng },
          zoom: 8
        });
      }
    })
  }


  async getLocationData() {
    let location = { lat: 20.5937, lng: 78.9629 };
    console.log('called');

    try {
      location = await new Promise((resolve, reject) => {
        let loc: { lat: number, lng: number } = { lat: 0, lng: 0 };
        navigator.geolocation.getCurrentPosition(
          (position) => {
            loc.lat = position.coords.latitude;
            loc.lng = position.coords.longitude;
            resolve(loc);
          },
          (error) => {
            alert(error.message);
            reject(error);
          }
        );
      });
    } catch (error) {
      console.log(error);
      return { lat: 20.5937, lng: 78.9629 };
    }
    return location;
  }

  paitentProfile$ = this.profileService.current;


}
