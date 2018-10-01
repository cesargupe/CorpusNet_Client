import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';

import { ContentService } from '../../services/content.service';
import { DatasheetService } from '../../services/datasheet.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-ficha-tecnica',
  templateUrl: './ficha-tecnica.component.html',
  styleUrls: ['./ficha-tecnica.component.css'],
  providers: [DatasheetService]
})
export class FichaTecnicaComponent implements OnInit {

  @Input() element: any;
  @Input() type: String;

  public content: any;
  public datasheet: any;

  public session: any;

  constructor(private _contentService: ContentService, private _datasheetService: DatasheetService, private _userService: UserService) {
    this.session = {identity: '', token: ''};
  }

  ngOnChanges(changes: SimpleChanges) {

    if(!changes["element"].isFirstChange()){

      this.datasheet = null;
      this.error = null;
      this.loadContent();

    }

  }

  ngOnInit() {

    this.watchStorage();
    this.loadContent();
    this.session = this._userService.getSession();

  }

  loadContent(){

    console.log(this.type)

    this._contentService.getContentDatasheet(this.type).subscribe(

      response => {

        this.content = response.content;
        this.loadDatasheet();

      },

      error =>{

        console.log(error._body);

      }

    );

  }

  loadDatasheet(){

    this._datasheetService.getDatasheet(this.element['name'], this.type).subscribe(

      response => {
        this.datasheet = response.datasheet;
      },

      error =>{
        console.log(error._body);
        this.inicialiceDatasheet();
      }

    );

  }

  public error: number;

  saveDatasheet(){

    let datasheet = JSON.parse(JSON.stringify(this.datasheet));

    if (datasheet._id) {
      this.updateDatasheet(datasheet);
    }else{
      this.addDatasheet(datasheet);
    }

  }

  addDatasheet(datasheet){

    this._datasheetService.saveDatasheet(this.session.token, datasheet).subscribe(

      response => {
        this.datasheet = datasheet;
        this.datasheet._id = response.datasheet._id;
        console.log(this.datasheet)
        this.error = 0;
      },

      error =>{
        this.error = 1;
        if (error.status == 401) this._userService.removeSession();
      }

    );

  }

  updateDatasheet(datasheet){

    this._datasheetService.editDatasheet(this.session.token, datasheet).subscribe(

      response => {
        this.datasheet = datasheet;
        this.error = 0;
      },

      error =>{
        this.error = 1;
        if (error.status == 401) this._userService.removeSession();
      }

    );

  }

  deepCopy(element, index){

    let copyELement = Object.assign({}, element);
    copyELement.index = index;

    return copyELement;

  }

  inicialiceDatasheet(){

    this.datasheet = {name: this.element.name, type: this.type, data:[]};

    for (let i = 0; i < this.content.data.length; i++) {
        this.datasheet.data.push('');
    }

  }

  watchStorage(){
    this._userService.watchStorage().subscribe((data:string) => {
      this.session = this._userService.getSession();
    });
  }

}
