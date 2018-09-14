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
  public router: Router;
  public language: String;

  constructor(private _router: Router, private _contentService: ContentService) {
    this.router = _router;
    this.language = _contentService.loadLanguage();
  }

  ngOnInit(){

    this.loadContent('general');

  }

  changeLanguage(language){

    localStorage.setItem('language', language);
    window.location.reload();

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

}
