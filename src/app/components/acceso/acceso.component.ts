import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {

  public content: Object;
  public language: String;
  public user: Object;

  public session: Object;
  public error: any;

  constructor(private _contentService: ContentService, private _userService: UserService) {
    this.language = _contentService.loadLanguage();
    this.user = {};
    this.session = {identity: '', token: ''}
  }

  ngOnInit() {
    this.loadContent('acceso');
    this.session = this._userService.getSession();
  }

  loadContent(contentName){

    this._contentService.getContent(contentName, this.language).subscribe(
      response => {
        this.content = response.content;
      },
      error =>{
        console.log(error);
      }
    );

  }

  login(){

    this._userService.signIn(this.user).subscribe(
      response => {

        this._userService.setSession(this.session['identity'], this.session['token']);
        window.location.reload();

      },
      error =>{
        this.error = error;
      }
    );

  }

  logOut(){

    this._userService.removeSession();
    window.location.reload();

  }

}
