import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';
import { UserService } from '../../services/user.service';

declare var $:any;

@Component({
  selector: 'app-bases-datos',
  templateUrl: './bases-datos.component.html',
  styleUrls: ['./bases-datos.component.css']
})
export class BasesDatosComponent implements OnInit {

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
    this.loadContent('bases-datos');
    this.session = this._userService.getSession();

  }

  loadContent(contentName){

    this._contentService.getContent(contentName, this.language).subscribe(

      response => {

        this.content = response.content;
        //this.sortContent(this.content.data.databases);

      },

      error =>{

        console.log(error._body);

      }

    );

  }

  public error: boolean;

  saveContent(){

    let content = JSON.parse(JSON.stringify(this.content));

    if (!this.newContent.author) {

      content.data.databases.unshift({});
      this.newContent.author = this.session.identity.team;
      this.newContent.acronym = this.session.identity.acronym;

    }

    let action = {'title': 'edit', 'datasheet': {'oldName': content.data.databases[this.newContent.index].name, 'newName': this.newContent.name, 'type': 'aplicaciones'}};

    if (this.newContent.link.split('://').length < 2) this.newContent.link = 'http://' + this.newContent.link;
    content.data.databases[this.newContent.index] = this.newContent;

    delete content.data.databases[this.newContent.index].updated;
    delete content.data.databases[this.newContent.index].index;

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
    content.data.databases.splice(index, 1);

    let action = {'title': 'delete', 'datasheet': {'oldName': this.content.data.databases[index].name, 'type': 'aplicaciones'}};

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
    copyELement.updated = true;

    return copyELement;

  }

  watchStorage(){
    this._contentService.watchStorage().subscribe((data:string) => {
      this.language = data;
      this.loadContent('bases-datos');
    });

    this._userService.watchStorage().subscribe((data:string) => {
      this.session = this._userService.getSession();
    });
  }

  sortContent(elements){

    elements.sort(function(element1, element2){

      // Por orden alfabético del grupo
      if(element1.author < element2.author) return -1;
      if(element1.author > element2.author) return 1;

      // Si coincide el grupo por orden alfabético del nombre
      if(element1.name < element2.name) return -1;
      if(element1.name > element2.name) return 1;

      return 0;
    });

  }

}
