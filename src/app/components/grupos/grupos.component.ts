import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  public content: Object;
  public language: String;

  public session = false;

  constructor(private _contentService: ContentService) {
    this.language = _contentService.loadLanguage();
  }

  ngOnInit() {
    this.loadContent('grupos');
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
