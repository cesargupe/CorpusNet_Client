import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { Error500Component } from './components/error500/error500.component';
import { Error404Component } from './components/error404/error404.component';
import { CorpusComparablesComponent } from './components/corpus-comparables/corpus-comparables.component';
import { CorpusParalelosComponent } from './components/corpus-paralelos/corpus-paralelos.component';
import { HerramientasTagsetsComponent } from './components/herramientas-tagsets/herramientas-tagsets.component';
import { HerramientasTecnicasComponent } from './components/herramientas-tecnicas/herramientas-tecnicas.component';
import { AplicacionesComponent } from './components/aplicaciones/aplicaciones.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { FichaTecnicaComponent } from './components/ficha-tecnica/ficha-tecnica.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { BasesDatosComponent } from './components/bases-datos/bases-datos.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    Error500Component,
    Error404Component,
    CorpusComparablesComponent,
    CorpusParalelosComponent,
    HerramientasTagsetsComponent,
    HerramientasTecnicasComponent,
    AplicacionesComponent,
    GruposComponent,
    NoticiasComponent,
    FichaTecnicaComponent,
    AccesoComponent,
    UsuariosComponent,
    BasesDatosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    NgxTwitterTimelineModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
