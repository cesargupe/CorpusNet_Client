import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  public content: Object;
  public language: String;

  public page: number;

  constructor(private _contentService: ContentService) {
    this.language = _contentService.loadLanguage();
    this.page = 0;
  }

  ngOnInit() {
    this.loadContent('noticias');
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

  incrementPage(){
    this.page ++;
    
  }

  decrementPage(){
    this.page --;
  }

}
