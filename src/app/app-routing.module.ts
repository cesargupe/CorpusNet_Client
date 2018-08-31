import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { Error500Component } from './components/error500/error500.component';
import { Error404Component } from './components/error404/error404.component';

const appRoutes: Routes = [
  {path: '', component: InicioComponent},

  {path: 'inicio', component: InicioComponent},
  {path: 'inicio/:language', component: InicioComponent},

  {path: '**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers:[],
  declarations: []
})
export class AppRoutingModule { }
