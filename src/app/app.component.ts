import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContentService } from './services/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ContentService]
})

export class AppComponent implements OnInit{

  public content: Object;
  public error: Boolean;
  public route: String;
  public language: String;

  constructor(private _router: Router, private _contentService: ContentService,) {
    this.language = _contentService.loadLanguage();
  }

  ngOnInit(){

    this.loadContent('general');

  }

  changeLanguage(language){

    localStorage.setItem('language', language);
    location.href = window.location.href;

  }

  loadContent(contentName){

    this._contentService.getContent(contentName, this.language).subscribe(

      response => {

        this.content = response.content;
        console.log(this.content);

      },

      error =>{

        console.log(error._body);
        this.error = true;

      }

    );

  }

}
