import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatasheetService {

  public url: string;

  constructor(private _http: Http) {
    this.url = 'http://localhost:3977/api/';
  }

  getDatasheet(name, type){

    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let options = new RequestOptions({headers: headers});

    return this._http.get(this.url + 'datasheet/' + name + '/' + type, options).map(res => res.json());

  }

}
