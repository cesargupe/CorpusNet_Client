import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  public url: string;

  constructor(private _http: Http) {
    this.url = 'http://localhost:3977/api/';
  }

  signIn(user_to_login){

    let params = JSON.stringify(user_to_login);

    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let options = new RequestOptions({headers: headers});

    return this._http.post(this.url + 'login/', params, options).map(res => res.json());

  }

  setSession(identity, token){

    localStorage.setItem('identity', JSON.stringify(identity));
    localStorage.setItem('token', JSON.stringify(token));

  }

  getSession(){

    let sesion = {identity: '', token: ''};

    if (localStorage.getItem('identity')) {
        sesion.identity = localStorage.getItem('identity');
    }

    if (localStorage.getItem('token')) {
        sesion.token = localStorage.getItem('token');
    }

    return sesion;

  }

  removeSession(){

    localStorage.removeItem('identity');
    localStorage.removeItem('token');

  }

}
