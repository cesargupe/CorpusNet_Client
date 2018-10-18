import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';
import { UserService } from '../../services/user.service';

declare var $:any;

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  public content: any;
  public language: String;

  public session: any;
  public newContent: any;

  constructor(private _contentService: ContentService, private _userService: UserService) {
    this.language = _contentService.loadLanguage();
    this.session = {identity: '', token: ''};
    this.newContent = {};
  }

  ngOnInit() {

    this.watchStorage();
    this.loadContent('grupos');
    this.session = this._userService.getSession();

  }

  loadContent(contentName){

    this._contentService.getContent(contentName, this.language).subscribe(

      response => {

        this.content = response.content;
        this.sortContent(this.content.data.teams);

      },

      error =>{

        console.log(error._body);

      }

    );

  }

  public error: boolean;

  saveContent(){

    let content = JSON.parse(JSON.stringify(this.content));

    if (this.newContent.link.split('://').length < 2) this.newContent.link = 'http://' + this.newContent.link;

    content.data.teams[this.newContent.index].description = this.newContent.description;
    content.data.teams[this.newContent.index].link = this.newContent.link;

    this._contentService.editContent(this.session.token, content).subscribe(

      response => {
        this.content = content;
        $('#modifyContent').modal('toggle');
      },

      error =>{
        this.error = true;
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
      this.loadContent('grupos');
    });

    this._userService.watchStorage().subscribe((data:string) => {
      this.session = this._userService.getSession();
    });
  }

  sortContent(elements){

    elements.sort(function(element1, element2){

      // Por orden alfabético del grupo
      if(element1.name < element2.name) return -1;
      if(element1.name > element2.name) return 1;

      return 0;
    });

  }

}
