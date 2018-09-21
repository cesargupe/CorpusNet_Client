import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';
import { NoticeService } from '../../services/notice.service';
import { UserService } from '../../services/user.service';

declare var $:any;

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
  providers: [NoticeService]
})
export class NoticiasComponent implements OnInit {

  public content: any;
  public notices: any[];
  public language: String;
  public page: number;

  public session: any;
  public newNotice: any;

  constructor(private _contentService: ContentService, private _noticeService: NoticeService, private _userService: UserService) {
    this.language = _contentService.loadLanguage();
    this.page = 0;

    this.session = {identity: '', token: ''};
    this.newNotice = {};
  }

  ngOnInit() {

    this.watchStorage();
    this.loadContent('noticias');
    this.loadNotices();
    this.session = this._userService.getSession();

  }

  loadContent(contentName){

    this._contentService.getContent(contentName, this.language).subscribe(

      response => {
        this.content = response.content;
      },

      error =>{
        window.location.reload();
      }

    );

  }

  loadNotices(){

    this._noticeService.getNotices().subscribe(

      response => {
        this.notices = response.notices;
      },

      error =>{
        console.log(error._body);
      }

    );

  }

  public error: boolean;

  saveNotice(){

    if (this.newNotice._id) {
      this.updateNotice();
    }else{
      this.addNotice();
    }

  }

  addNotice(){

    this.newNotice.team = this.session.identity.team;

    this._noticeService.saveNotice(this.session.token, this.newNotice).subscribe(

      response => {
        this.notices.unshift(response.notice);
        $('#modifyContent').modal('toggle');
      },

      error =>{
        this.error = true;
        if (error.status == 401) this._userService.removeSession();
      }

    );

  }

  updateNotice(){

    this._noticeService.editNotice(this.session.token, this.newNotice).subscribe(

      response => {
        this.notices[this.newNotice.index] = this.newNotice;
        $('#modifyContent').modal('toggle');
      },

      error =>{
        this.error = true;
        if (error.status == 401) this._userService.removeSession();
      }

    );


  }

  deleteNotice(noticeID, index){

    this._noticeService.deleteNotice(this.session.token, noticeID).subscribe(

      response => {
        this.notices.splice(index, 1);
      },

      error =>{
        if (error.status == 401) this._userService.removeSession();
      }

    );

  }

  deepCopy(element, index){

    let copyELement = Object.assign({}, element);
    copyELement.index = index;

    return copyELement;

  }

  watchStorage(){
    this._contentService.watchStorage().subscribe((data:string) => {
      this.language = data;
      this.loadContent('noticias');
    });

    this._userService.watchStorage().subscribe((data:string) => {
      this.session = this._userService.getSession();
    });
  }

}
