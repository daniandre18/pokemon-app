
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonComponent } from './components/pokemon/pokemon.component';

   
const routes: Routes = [
  { path: '', component: PokemonComponent, pathMatch: 'full' },
  { path: 'pokemon', component: PokemonComponent, pathMatch: 'full' }
];
   
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
