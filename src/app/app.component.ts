import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContentService } from './services/content.service';
import { UserService } from './services/user.service';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ContentService, UserService]
})

export class AppComponent implements OnInit{

  public content: any;
  public error: Boolean;
  public router: Router;
  public language: String;

  public session: any;

  constructor(private _router: Router, private _contentService: ContentService, private _userService: UserService) {
    this.router = _router;
    this.language = _contentService.loadLanguage();
    this.session = {identity: '', token: ''};
  }

  ngOnInit(){

    this.watchStorage();
    this.loadContent('general');
    this.checkToken();

  }

  checkToken(){

    let session = this._userService.getSession();

    if (session.identity && session.token) {

      this._userService.checkUser(session.token).subscribe(

        response => {
          this.session = session;
        },

        error => {
          this._userService.removeSession();
        }

      );

    }

  }

  changeLanguage(language){

    this._contentService.setLanguage(language);

  }

  loadContent(contentName){

    this._contentService.getContent(contentName, this.language).subscribe(

      response => {

        this.content = response.content;

      },

      error =>{

        console.log(error._body);
        this.error = true;

      }

    );

  }

  watchStorage(){
    this._contentService.watchStorage().subscribe((data:string) => {
      this.language = data;
      this.loadContent('general');
    });

    this._userService.watchStorage().subscribe((data:string) => {
      this.session = this._userService.getSession();
    });
  }

}
