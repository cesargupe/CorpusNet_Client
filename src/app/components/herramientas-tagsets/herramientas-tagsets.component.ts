import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';
import { UserService } from '../../services/user.service';

declare var $:any;

@Component({
  selector: 'app-herramientas-tagsets',
  templateUrl: './herramientas-tagsets.component.html',
  styleUrls: ['./herramientas-tagsets.component.css']
})
export class HerramientasTagsetsComponent implements OnInit {

  public content: any;
  public language: String;
  public selectedItem: any;

  public session: any;
  public newContent: any;

  constructor(private _contentService: ContentService, private _userService: UserService) {
    this.language = _contentService.loadLanguage();
    this.session = {identity: '', token: ''};
    this.newContent = {};
  }

  ngOnInit() {

    this.watchStorage();
    this.loadContent('herramientas-tagsets');
    this.session = this._userService.getSession();

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

  setElement(index){
    this.selectedItem = this.content.data.tools[index];
  }

  public error: boolean;

  saveContent(){

    let content = JSON.parse(JSON.stringify(this.content));

    if (!this.newContent.author) {

      content.data.tools.unshift({});
      this.newContent.author = this.session.identity.team;
      this.newContent.acronym = this.session.identity.acronym;

    }

    if (this.newContent.link.split('://').length < 2) this.newContent.link = 'http://' + this.newContent.link;
    content.data.tools[this.newContent.index] = this.newContent;
    delete content.data.tools[this.newContent.index].index;

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

  deleteContent(index){

    let content = JSON.parse(JSON.stringify(this.content));
    content.data.tools.splice(index, 1);

    this._contentService.editContent(this.session.token, content).subscribe(

      response => {
        this.content = content;
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
      this.loadContent('herramientas-tagsets');
    });

    this._userService.watchStorage().subscribe((data:string) => {
      this.session = this._userService.getSession();
    });
  }

}
