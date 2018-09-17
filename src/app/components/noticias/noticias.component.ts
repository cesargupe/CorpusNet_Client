import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';
import { NoticeService } from '../../services/notice.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
  providers: [NoticeService]
})
export class NoticiasComponent implements OnInit {

  public content: Object;
  public notices: Object;
  public language: String;

  public page: number;

  constructor(private _contentService: ContentService, private _noticeService: NoticeService) {
    this.language = _contentService.loadLanguage();
    this.page = 0;
  }

  ngOnInit() {
    this.loadContent('noticias');
    this.loadNotices();
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

  loadNotices(){

    this._noticeService.getNotices().subscribe(

      response => {

        this.notices = response.notices;
        console.log(this.notices);

      },

      error =>{

        console.log(error._body);

      }

    );

  }

}
