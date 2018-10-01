import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {

  public url: string;
  private storage = new Subject<string>();

  constructor(private _http: Http) {
    this.url = 'http://localhost:3977/api/';
  }

  watchStorage(): Observable<any> {
    return this.storage.asObservable();
  }

  signIn(user_to_login){

    let params = JSON.stringify(user_to_login);

    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let options = new RequestOptions({headers: headers});

    return this._http.post(this.url + 'login/', params, options).map(res => res.json());

  }

  getAllUsers(token){

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers});

    return this._http.get(this.url + 'users/', options).map(res => res.json());

  }

  saveUser(token, user){

    let params = JSON.stringify(user);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers});

    return this._http.post(this.url + 'new_user/', params, options).map(res => res.json());

  }


  setSession(identity, token){

    localStorage.setItem('identity', JSON.stringify(identity));
    localStorage.setItem('token', JSON.stringify(token));

    this.storage.next("change");

  }

  getSession(){

    let sesion = {identity: '', token: ''};

    if (localStorage.getItem('identity')) {
        sesion.identity = JSON.parse(localStorage.getItem('identity'));
    }

    if (localStorage.getItem('token')) {
        sesion.token = localStorage.getItem('token');
    }

    return sesion;
    //return {identity: '', token: ''};

  }

  removeSession(){

    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.storage.next("change");

  }

}
