import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

declare var H: any;
@Injectable({
  providedIn: 'root'
})
export class GeoService {

  private platform: any;
  private search: any;

  constructor() { }

  ngOnInit(): void {
  }

  initPlatform(appId, appCode): any {
    this.platform = new H.service.Platform({
      'app_id': appId,
      'app_code': appCode,
      useCIT: true,
      useHTTPS: true,
      crossOrigin: true
    });

    this.search = new H.places.Search(this.platform.getPlacesService());
    
    return this.platform;
  }

  getPlatform(): any {
    return this.platform;
  }

  getRoute(origin, destination): Promise<any> {
    const routingParameters = {
      'mode': 'shortest;pedestrian',
      // The start point of the route:
      'waypoint0': `geo!${origin[0]},${origin[1]}`,
      // The end point of the route:
      'waypoint1': `geo!${destination[0]},${destination[1]}`,
      // To retrieve the shape of the route we choose the route
      // representation mode 'display'
      'representation': 'display'
    };

    return new Promise((resolve, reject) => {
      this.platform.getRoutingService().calculateRoute(routingParameters, result => {
        if(result.response.route) {
          resolve(result.response.route[0]);
        } else {
          reject("No se encontraron rutas");
        }
      }, error => {
        reject("Error en la llamada.");
      })
    });
  }

  findPlaces(query, lat, lng): Promise<any> {
    return new Promise((resolve, reject) => {
      this.search.request({ 'q': query, 'at': lat + ',' + lng }, {}, data => {
        resolve(data);
      }, error => {
        reject(error);
      })
    })
  }
}
