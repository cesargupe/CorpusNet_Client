import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ContentService } from './services/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ContentService]
})

export class AppComponent implements OnInit{

  public router : Router;
  public content: Object;

  constructor(private _router: Router, private _contentService: ContentService, private _route: ActivatedRoute) {
    this.router = _router;
  }

  ngOnInit(){

    //this.loadContent('general');

    if (this.content != null){
      this.paintContent();
    }

  }

  loadContent(contentName){

    let language = window.location.href.split('/').slice(-1)[0];

    this._contentService.getContent(contentName, language).subscribe(

      response => {

        this.content = response.content;
        console.log(this.content);

      },

      error =>{

        var errorMessage = <any>error;

        if (errorMessage != null) {

          var body = JSON.parse(error._body);
          console.log(error);

        }
      }

    );

  }

  paintContent(){

  }

}
