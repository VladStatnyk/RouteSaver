import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Route } from '../models/Route';
import { Observable } from 'rxjs';

export class RouteServiceMock {
    constructor() {
    }
    SaveRoute() {
        return "Ok";
    }

    GetAllRoutes(): Observable<Response> {
        return null;
    }

    GetRouteById(id : Number) : Route{
        return null;
    }
  }