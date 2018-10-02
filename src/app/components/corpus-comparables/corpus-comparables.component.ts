import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';
import { UserService } from '../../services/user.service';

declare var $:any;

@Component({
  selector: 'app-corpus-comparables',
  templateUrl: './corpus-comparables.component.html',
  styleUrls: ['./corpus-comparables.component.css']
})
export class CorpusComparablesComponent implements OnInit {

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
    this.loadContent('corpus-comparables');
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
    this.selectedItem = this.content.data.corpus[index];
  }

  public error: boolean;

  saveContent(){

    let content = JSON.parse(JSON.stringify(this.content));

    if (!this.newContent.author) {
      content.data.corpus.unshift({});
      this.newContent.author = this.session.identity.team;
    }

    let action = {'title': 'edit', 'datasheet': {'oldName': this.content.data.corpus[this.newContent.index].name, 'newName': this.newContent.name, 'type': 'corpus-comparables'}};

    if (this.newContent.link.split('://').length < 2) this.newContent.link = 'http://' + this.newContent.link;
    content.data.corpus[this.newContent.index] = this.newContent;

    delete content.data.corpus[this.newContent.index].index;

    this._contentService.editContent(this.session.token, content, action).subscribe(

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
    content.data.corpus.splice(index, 1);

    let action = {'title': 'delete', 'datasheet': {'oldName': this.content.data.corpus[index].name, 'type': 'corpus-comparables'}};

    this._contentService.editContent(this.session.token, content, action).subscribe(

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
      this.loadContent('corpus-comparables');
    });

    this._userService.watchStorage().subscribe((data:string) => {
      this.session = this._userService.getSession();
    });
  }

}
