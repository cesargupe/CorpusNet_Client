import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { CorpusComparablesComponent } from './components/corpus-comparables/corpus-comparables.component';
import { CorpusParalelosComponent } from './components/corpus-paralelos/corpus-paralelos.component';
import { HerramientasTagsetsComponent } from './components/herramientas-tagsets/herramientas-tagsets.component';
import { HerramientasTecnicasComponent } from './components/herramientas-tecnicas/herramientas-tecnicas.component';
import { Error404Component } from './components/error404/error404.component';

const appRoutes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'corpus-comparables', component: CorpusComparablesComponent},
  {path: 'corpus-paralelos', component: CorpusParalelosComponent},
  {path: 'herramientas-tagsets', component: HerramientasTagsetsComponent},
  {path: 'herramientas-tecnicas', component: HerramientasTecnicasComponent},
  {path: '**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers:[],
  declarations: []
})
export class AppRoutingModule { }
