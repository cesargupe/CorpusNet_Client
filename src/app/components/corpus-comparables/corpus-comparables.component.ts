import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-corpus-comparables',
  templateUrl: './corpus-comparables.component.html',
  styleUrls: ['./corpus-comparables.component.css']
})
export class CorpusComparablesComponent implements OnInit {

  public content: Object;
  public language: String;
  public selectedItem: Object;

  constructor(private _contentService: ContentService) {
    this.language = _contentService.loadLanguage();
  }

  ngOnInit() {
    this.loadContent('corpus-comparables');
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

  setElement(index){
    this.selectedItem = this.content['data']['corpus'][index];
  }

}
