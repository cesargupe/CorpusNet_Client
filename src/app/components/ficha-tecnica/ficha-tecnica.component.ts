import { Component, Input, OnInit } from '@angular/core';

import { DatasheetService } from '../../services/datasheet.service';

@Component({
  selector: 'app-ficha-tecnica',
  templateUrl: './ficha-tecnica.component.html',
  styleUrls: ['./ficha-tecnica.component.css'],
  providers: [DatasheetService]
})
export class FichaTecnicaComponent implements OnInit {

  @Input() element: Object;
  public datasheet: Object;

  constructor(private _datasheetService: DatasheetService) { }

  ngOnInit() {
    this.loadDatasheet();
  }

  loadDatasheet(){

    this._datasheetService.getDatasheet(this.element['name'], 'corpus-comparables').subscribe(

      response => {

        this.datasheet = response.datasheet;
        console.log(this.datasheet);

      },

      error =>{

        console.log(error._body);

      }

    );

  }

}
