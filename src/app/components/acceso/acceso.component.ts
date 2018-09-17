import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {

  public content: Object;
  public language: String;
  public user: Object;

  constructor(private _contentService: ContentService) {
    this.language = _contentService.loadLanguage();
    this.user = {};
  }

  ngOnInit() {
    this.loadContent('acceso');
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
    console.log(this.user);
  }

}
