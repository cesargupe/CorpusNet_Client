import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-corpus-paralelos',
  templateUrl: './corpus-paralelos.component.html',
  styleUrls: ['./corpus-paralelos.component.css']
})
export class CorpusParalelosComponent implements OnInit {

  public content: Object;
  public language: String;

  //public session = false;

  constructor(private _contentService: ContentService) {
    this.language = _contentService.loadLanguage();
  }

  ngOnInit() {
    this.loadContent('corpus-paralelos');
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

  closePanel(){
    document.getElementById('instructions').classList.add("d-none");
  }

}
