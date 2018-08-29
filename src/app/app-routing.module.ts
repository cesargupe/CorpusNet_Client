import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';

const appRoutes: Routes = [
  //{path: '', component: InicioComponent},
  //{path: 'inicio', component: InicioComponent},
  {path: 'inicio/:language', component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers:[],
  declarations: []
})
export class AppRoutingModule { }
