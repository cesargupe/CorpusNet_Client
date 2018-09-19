import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';
import { NoticeService } from '../../services/notice.service';

declare var $:any;

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
  providers: [NoticeService]
})
export class NoticiasComponent implements OnInit {

  public content: Object;
  public notices: Object[];
  public language: String;
  public page: number;

  public session = true;
  public token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YmEyM2JmZjk1ZDg0YjAwYjc0ZTM4NTUiLCJ0ZWFtIjoiQUNUUkVTIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTUzNzM2MDUwMTY5OSwiZXhwIjoxNTM4MjI0NTAxNjk5fQ.BQZzT-JnpmYOzySRNS1TNQQZNouVzQCipMydm5OXRyE";
  public newNotice: Object;


  constructor(private _contentService: ContentService, private _noticeService: NoticeService) {
    this.language = _contentService.loadLanguage();
    this.page = 0;
    this.newNotice = {};
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

  saveNotice(){

    if (this.newNotice['_id']) {
      this.updateNotice();
    }else{
      this.addNotice();
    }

    $('#modifyContent').modal('toggle');

  }

  addNotice(){

    this._noticeService.saveNotice(this.token, this.newNotice).subscribe(

      response => {

        this.notices.unshift(response.notice);
        console.log(response.notice);

      },
      error =>{

        console.log(error);

      }

    );

  }

  updateNotice(){
    console.log(this.newNotice);
    this.notices[this.newNotice['index']] = this.newNotice;
  }

  deepCopy(element, index){

    let copyELement = Object.assign({}, element);
    copyELement.index = index;

    return copyELement;

  }

}
