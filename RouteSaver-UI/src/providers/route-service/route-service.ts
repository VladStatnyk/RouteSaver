import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from '../../app/app.config';
import { Route } from '../../models/Route';
import { Observable } from 'rxjs';


@Injectable()
export class RouteService {
    constructor(private http: Http, private config: AppConfig) {
    }

    SaveRoute(RouteName:string, FirstPoint : string, LastPoint : string, MiddlePoints : Array<string>){
        this.http.post(this.config.apiUrl + '/route/create', 
        {
            FirstPoint : FirstPoint,
            LastPoint : LastPoint,
            MiddlePoints : MiddlePoints,
            RouteName : RouteName
        }, this.jwt()).subscribe(data => { window.location.reload(); }, error => {})
    }

    GetAllRoutes(): Observable<Response> {
        return Observable.from(this.http.get(this.config.apiUrl + '/route/get-all-routes', this.jwt()));
    }

    GetRouteById(id : Number) : Route{
        let route = new Route;
        this.http.get(this.config.apiUrl + '/route/get-route-by-id?Id='+ id, this.jwt()).subscribe(data =>{
            route = <Route>data.json();
        });

        return route;
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}