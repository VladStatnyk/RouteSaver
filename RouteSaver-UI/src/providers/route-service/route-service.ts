import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from '../../app/app.config';
import { Route } from '../../models/Route';
import { Observable } from 'rxjs';
import { TokenService } from '../token-service/token-service'


@Injectable()
export class RouteService {
    constructor(private http: Http, private config: AppConfig, private tokenService: TokenService) {
    }

    SaveRoute(RouteName:string, FirstPoint : string, LastPoint : string, MiddlePoints : Array<string>){
        this.http.post(this.config.apiUrl + '/route/create', 
        {
            FirstPoint : FirstPoint,
            LastPoint : LastPoint,
            MiddlePoints : MiddlePoints,
            RouteName : RouteName
        }, this.tokenService.GetToken()).subscribe(data => { window.location.reload(); }, error => {})
    }

    GetAllRoutes(): Observable<Response> {
        return Observable.from(this.http.get(this.config.apiUrl + '/route/get-all-routes', this.tokenService.GetToken()));
    }

    GetRouteById(id : Number) : Route{
        let route = new Route;
        this.http.get(this.config.apiUrl + '/route/get-route-by-id?Id='+ id, this.tokenService.GetToken()).subscribe(data =>{
            route = <Route>data.json();
        });

        return route;
    }

    
}