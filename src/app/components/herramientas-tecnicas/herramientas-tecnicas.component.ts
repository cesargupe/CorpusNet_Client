import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';
import { UserService } from '../../services/user.service';

declare var $:any;

@Component({
  selector: 'app-herramientas-tecnicas',
  templateUrl: './herramientas-tecnicas.component.html',
  styleUrls: ['./herramientas-tecnicas.component.css']
})
export class HerramientasTecnicasComponent implements OnInit {

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
    this.loadContent('herramientas-tecnicas');
    this.session = this._userService.getSession();

  }

  loadContent(contentName){

    this._contentService.getContent(contentName, this.language).subscribe(

      response => {
        this.content = response.content;
        this.sortContent(this.content.data.tools.tagger);
        this.sortContent(this.content.data.tools.browser);
        this.sortContent(this.content.data.tools.aligner);
      },

      error =>{
        console.log(error._body);
      }

    );

  }

  setElement(index, type){
    this.selectedItem = this.content.data.tools[type][index];
  }

  public error: boolean;

  saveContent(){

    let content = JSON.parse(JSON.stringify(this.content));

    if (!this.newContent.author) {

      content.data.tools[this.newContent.type].unshift({});
      this.newContent.author = this.session.identity.team;
      this.newContent.acronym = this.session.identity.acronym;

    }

    let action = {'title': 'edit', 'datasheet': {'oldName': content.data.tools[this.newContent.type][this.newContent.index].name, 'newName': this.newContent.name, 'type': 'herramientas-tecnicas'}};

    if (this.newContent.link.split('://').length < 2) this.newContent.link = 'http://' + this.newContent.link;

    content.data.tools[this.newContent.type][this.newContent.index] = JSON.parse(JSON.stringify(this.newContent));

    delete content.data.tools[this.newContent.type][this.newContent.index].type;
    delete content.data.tools[this.newContent.type][this.newContent.index].index;
    delete content.data.tools[this.newContent.type][this.newContent.index].updated;

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

  deleteContent(index, type){

    let content = JSON.parse(JSON.stringify(this.content));
    content.data.tools[type].splice(index, 1);

    let action = {'title': 'delete', 'datasheet': {'oldName': this.content.data.tools[type][index].name, 'type': 'herramientas-tecnicas'}};

    this._contentService.editContent(this.session.token, content, action).subscribe(

      response => {
        this.content = content;
      },

      error =>{
        if (error.status == 401) this._userService.removeSession();
      }

    );

  }

  deepCopy(element, index, type){

    let copyELement = Object.assign({}, element);
    copyELement.index = index;
    copyELement.type = type;
    copyELement.updated = true;

    return copyELement;

  }

  watchStorage(){
    this._contentService.watchStorage().subscribe((data:string) => {
      this.language = data;
      this.loadContent('herramientas-tecnicas');
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
