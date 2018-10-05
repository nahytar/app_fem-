import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Coordenadas } from '../../interface/coordenadas';
import { DatabaseService } from '../../service/database.service';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // Coleccion de coordenadas
  coordenadas: Coordenadas = {
    userid: '',
    latitud: '',
    longitud: ''
  };

  @ViewChild('map')
  public mapElement: ElementRef;
  search: any;

  public appId: any;

  public appCode: any;

  @Input()
  public lat: any;

  @Input()
  public lng: any;

  @Input()
  public width: any;

  @Input()
  public height: any;

  private platform: any;
  private map: any;
  public query: any;

  private ui: any;
  public directions: any;

  public constructor(
    private authService: AuthService,
    private router: Router,
    private afs: AngularFirestore,
    private dataservice: DatabaseService,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {
    this.route
      .data
      .subscribe(data => {
        this.appId = data.appId
        this.appCode = data.appCode
        this.platform = new H.service.Platform({
          'app_id': this.appId,
          'app_code': this.appCode,
          useCIT: true,
          useHTTPS: true
        });
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.showPosition();
          });
          this.search = new H.places.Search(this.platform.getPlacesService());
          this.directions = [];
        }
      });
  }

  showPosition() {
    const defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 15,
        center: { lat: this.lat, lng: this.lng }
      }
    );
    this.displayUserMarker();
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
  }

  public places(query: string) {
    this.map.removeObjects(this.map.getObjects());
    this.search.request({ 'q': query, 'at': this.lat + ',' + this.lng }, {}, data => {
      for (let i = 0; i < data.results.items.length; i++) {
        this.dropMarker({ 'lat': data.results.items[i].position[0], 'lng': data.results.items[i].position[1] }, data.results.items[i]);
      }
    }, error => {
      console.error(error);
    });
  }


  private dropMarker(coordinates: any, data: any) {
    const marker = new H.map.Marker(coordinates);
    marker.setData('<p>' + data.title + '<br>' + data.vicinity + '</p>');
    marker.addEventListener('tap', event => {
      const bubble = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.ui.addBubble(bubble);
    }, false);
    this.map.addObject(marker);
  }

  displayUserMarker() {
    // tslint:disable-next-line:max-line-length
    const svgMarkup = '<svg aria-hidden="true" data-prefix="fas" width="30" height="30" data-icon="map-marker-alt" class="svg-inline--fa fa-map-marker-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>';
    const svgIcon = new H.map.Icon(svgMarkup),
      coords = {
        lat: this.lat,
        lng: this.lng
      },
      marker = new H.map.Marker(coords, {
        icon: svgIcon
      });
    this.map.addObject(marker);
  }
}
