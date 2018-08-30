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
    this.content = require('./app.json');
  }

  ngOnInit(){

    this.loadContent('general');
    
  }

  loadContent(contentName){

    let language = window.location.href.split('/').slice(-1)[0];

    this._contentService.getContent(contentName, language).subscribe(

      response => {

        this.content = response.content;
        console.log(this.content);

      },

      error =>{

        console.log(error._body);
        this._router.navigate(['/server-error']);

      }

    );

  }

  paintContent(){
    console.log("kj");
    console.log(this.content);
  }

}
