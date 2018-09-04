import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { Error500Component } from './components/error500/error500.component';
import { Error404Component } from './components/error404/error404.component';
import { CorpusComparablesComponent } from './components/corpus-comparables/corpus-comparables.component';
import { CorpusParalelosComponent } from './components/corpus-paralelos/corpus-paralelos.component';
import { HerramientasTagsetsComponent } from './components/herramientas-tagsets/herramientas-tagsets.component';
import { HerramientasTecnicasComponent } from './components/herramientas-tecnicas/herramientas-tecnicas.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    Error500Component,
    Error404Component,
    CorpusComparablesComponent,
    CorpusParalelosComponent,
    HerramientasTagsetsComponent,
    HerramientasTecnicasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
