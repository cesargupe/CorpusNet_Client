import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { CorpusComparablesComponent } from './components/corpus-comparables/corpus-comparables.component';
import { CorpusParalelosComponent } from './components/corpus-paralelos/corpus-paralelos.component';
import { HerramientasTagsetsComponent } from './components/herramientas-tagsets/herramientas-tagsets.component';
import { HerramientasTecnicasComponent } from './components/herramientas-tecnicas/herramientas-tecnicas.component';
import { AplicacionesComponent } from './components/aplicaciones/aplicaciones.component';
import { BasesDatosComponent } from './components/bases-datos/bases-datos.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { Error404Component } from './components/error404/error404.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const appRoutes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'corpus-comparables', component: CorpusComparablesComponent},
  {path: 'corpus-paralelos', component: CorpusParalelosComponent},
  {path: 'herramientas-tagsets', component: HerramientasTagsetsComponent},
  {path: 'herramientas-tecnicas', component: HerramientasTecnicasComponent},
  {path: 'aplicaciones', component: AplicacionesComponent},
  {path: 'bases-datos', component: BasesDatosComponent},
  {path: 'grupos', component: GruposComponent},
  {path: 'noticias', component: NoticiasComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers:[],
  declarations: []
})
export class AppRoutingModule { }
