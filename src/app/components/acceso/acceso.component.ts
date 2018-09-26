import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {

  public content: any;
  public language: String;
  public user: any;

  public session: any;
  public error: any;

  constructor(private _contentService: ContentService, private _userService: UserService) {
    this.language = _contentService.loadLanguage();
    this.user = {};
    this.session = {identity: '', token: ''}
  }

  ngOnInit() {

    this.watchStorage();
    this.loadContent('acceso');
    this.session = this._userService.getSession();

  }

  loadContent(contentName){

    this._contentService.getContent(contentName, this.language).subscribe(
      response => {
        this.content = response.content;
      },
      error =>{
        console.log(error._body);
      }
    );

  }

  login(){

    this._userService.signIn(this.user).subscribe(

      response => {
        this._userService.setSession(response.user, response.token);
      },

      error =>{
        this.error = error;
      }

    );

  }

  logOut(){

    this._userService.removeSession();

  }

  watchStorage(){
    this._contentService.watchStorage().subscribe((data:string) => {
      this.language = data;
      this.loadContent('acceso');
    });

    this._userService.watchStorage().subscribe((data:string) => {
      this.session = this._userService.getSession();
    });
  }

}
