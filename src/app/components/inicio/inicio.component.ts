import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public content: Object;
  public language: String;

  constructor(private _contentService: ContentService) {
    this.language = _contentService.loadLanguage();
  }

  ngOnInit() {
    this.loadContent('inicio');
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

}
