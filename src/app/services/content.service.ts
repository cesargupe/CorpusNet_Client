import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContentService {

  public url: string;

  constructor(private _http: Http) {
    this.url = 'http://localhost:3977/api/';
  }

  getContent(nameContent, language){

    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let options = new RequestOptions({headers: headers});

    return this._http.get(this.url + 'content/' + nameContent + '/' + language, options).map(res => res.json());

  }

  loadLanguage(){

    let language = 'es';

    if (localStorage.getItem('language')) {
        language = localStorage.getItem('language');
    }

    return language;
  }

}
