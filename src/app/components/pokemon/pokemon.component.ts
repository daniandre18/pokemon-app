import { Component, OnInit} from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { faClose, faSave, faAdd, faEdit } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemonList : Pokemon[] =[];
  form!: FormGroup;
  form2!: FormGroup;
  faClose = faClose;
  faSave = faSave;
  faAdd = faAdd;
  faEdit = faEdit;
  loading = false;
  submitted = false;
  searchString: string ='';
     
  constructor( public pokemonService:PokemonService) { }

  ngOnInit(): void {
    this.loading = true;
    this.pokemonService.getAll().subscribe((data : Pokemon[]) => {
      this.pokemonList = data;
      this.loading = false;
      console.log("pokemones", this.pokemonList);
    });
    
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      attack: new FormControl(0, Validators.required),
      image: new FormControl('https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png', Validators.required),
      defense: new FormControl(0, Validators.required),
      idAuthor  : new FormControl(1, Validators.required),
      hp: new FormControl(35, Validators.required),
      type:  new FormControl('electric', Validators.required),
    });
  }


  deletePokemon(id:number){
    this.pokemonService.delete(id).subscribe(res => {
      this.pokemonList = this.pokemonList.filter(item => item.id !== id);
    })
  }

  updatePokemon(id:number){
    this.pokemonService.update(id,this.form.value).subscribe(res => {
      this.pokemonList = this.pokemonList.filter(item => item.id !== id);
    })
  }

  findpokemon(id:number){
    this.pokemonService.findById(id,).subscribe(res => {
      this.pokemonList = this.pokemonList.filter(item => item.id !== id);
    })
  }

  get f(){
    return this.form.controls;
  }

  toggleShow() {
    this.loading = ! this.loading;
  }

  submit(){
    this.pokemonService.create(this.form.value).subscribe((res:Pokemon) => {
      this.pokemonList.push(res);
     
    })
  }

  applyFilter(filterValue: string) {
    this.pokemonList.filter(i => i.name.toLowerCase().includes(filterValue.toLowerCase()));
  }

  resetForm() {
    this.form.reset();
  }

  

}
