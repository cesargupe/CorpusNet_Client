import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NoticeService {

  public url: string;

  constructor(private _http: Http) {
    this.url = 'http://localhost:3977/api/';
    //this.url = 'http://corpusnet.unileon.es:3977/api/';
  }

  getNotices(){

    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let options = new RequestOptions({headers: headers});

    return this._http.get(this.url + 'notices/', options).map(res => res.json());

  }

  getLastNotice(){

    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let options = new RequestOptions({headers: headers});

    return this._http.get(this.url + 'last-notice/', options).map(res => res.json());

  }

  saveNotice(token, notice){

    let params = JSON.stringify(notice);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers});

    return this._http.post(this.url + 'notice/', params, options).map(res => res.json());

  }

  editNotice(token, notice){

    let params = JSON.stringify(notice);

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers});

    return this._http.put(this.url + 'notice/' + notice._id, params, options).map(res => res.json());

  }

  deleteNotice(token, id){

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers});

    return this._http.delete(this.url + 'notice/' + id, options).map(res => res.json());

  }

}
