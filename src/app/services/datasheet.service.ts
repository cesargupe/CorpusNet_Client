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

  saveDatasheet(token, datasheet){

    let params = JSON.stringify(datasheet);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers});

    return this._http.post(this.url + 'datasheet/', params, options).map(res => res.json());

  }

  editDatasheet(token, datasheet){

    let params = JSON.stringify(datasheet);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers});

    return this._http.put(this.url + 'datasheet/' + datasheet._id, params, options).map(res => res.json());

  }

}
