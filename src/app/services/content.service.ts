import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ContentService {

  public url: string;
  private storage = new Subject<string>();

  constructor(private _http: Http) {
    this.url = 'http://localhost:3977/api/';
  }

  watchStorage(): Observable<any> {
    return this.storage.asObservable();
  }

  loadLanguage(){

    let language = 'es';

    if (localStorage.getItem('language')) {
        language = localStorage.getItem('language');
    }

    return language;
  }

  setLanguage(language){

    localStorage.setItem('language', language);
    this.storage.next(this.loadLanguage());

  }

  getContent(nameContent, language){

    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let options = new RequestOptions({headers: headers});

    return this._http.get(this.url + 'content/' + nameContent + '/' + language, options).map(res => res.json());

  }

  getContentDatasheet(type){

    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let options = new RequestOptions({headers: headers});

    return this._http.get(this.url + 'content_datasheet/' + type, options).map(res => res.json());

  }

  editContent(token, content){

    let params = JSON.stringify(content);

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers});

    return this._http.put(this.url + 'content/' + content._id, params, options).map(res => res.json());

  }

}
