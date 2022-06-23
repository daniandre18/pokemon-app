import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemonList : Pokemon[] =[];
  form!: FormGroup;
     

  constructor( public pokemonService:PokemonService) { }

  ngOnInit(): void {
    console.log("pokemons");

    this.pokemonService.getAll().subscribe((data : Pokemon[]) => {
      this.pokemonList = data;
      console.log("pokemones", this.pokemonList);
    });
    
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
  }

   /**
   * Write code on Method
   *
   * @return response()
   */
    deletePokemon(id:number){
      this.pokemonService.delete(id).subscribe(res => {
           this.pokemonList = this.pokemonList.filter(item => item.id !== id);
           console.log('pokemon deleted successfully!');
      })
    }

    get f(){
      return this.form.controls;
    }

    submit(){
      console.log(this.form.value);
      this.pokemonService.create(this.form.value).subscribe((res:any) => {
           console.log('Post created successfully!');
      })
    }


}
