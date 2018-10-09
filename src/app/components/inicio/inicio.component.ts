import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';
import { NoticeService } from '../../services/notice.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [NoticeService]
})
export class InicioComponent implements OnInit {

  public content: any;
  public language: String;
  public lastNotice: any;

  constructor(private _contentService: ContentService, private _noticeService: NoticeService) {
    this.language = _contentService.loadLanguage();
  }

  ngOnInit() {

    this.watchStorage();
    this.loadContent('inicio');

  }

  loadContent(contentName){

    this._contentService.getContent(contentName, this.language).subscribe(

      response => {
        this.content = response.content;
        this.loadLastNotice()
      },

      error =>{
        console.log(error._body);
      }

    );

  }

  loadLastNotice(){

    this._noticeService.getLastNotice().subscribe(

      response => {
        this.lastNotice = response.notice;
      },

      error =>{
        console.log(error._body);
      }

    );

  }

  watchStorage(){
    this._contentService.watchStorage().subscribe((data:string) => {
      this.language = data;
      this.loadContent('inicio');
    });
  }

}
