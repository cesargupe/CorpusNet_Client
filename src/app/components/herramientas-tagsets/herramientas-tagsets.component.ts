import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-herramientas-tagsets',
  templateUrl: './herramientas-tagsets.component.html',
  styleUrls: ['./herramientas-tagsets.component.css']
})
export class HerramientasTagsetsComponent implements OnInit {

  public content: Object;
  public language: String;

  constructor(private _contentService: ContentService) {
    this.language = _contentService.loadLanguage();
  }

  ngOnInit() {
    this.loadContent('herramientas-tagsets');
  }

  loadContent(contentName){

    this._contentService.getContent(contentName, this.language).subscribe(

      response => {

        this.content = response.content;
        console.log(this.content);

      },

      error =>{

        console.log(error._body);

      }

    );

  }

}
