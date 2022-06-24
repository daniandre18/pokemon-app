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

  pokemonList : Pokemon[] = [];
  form!: FormGroup;
  form2!: FormGroup;

  faClose = faClose;
  faSave = faSave;
  faAdd = faAdd;
  faEdit = faEdit;

  addFormView = false;
  editFormView = false;
  submitted = false;

  searchString: string ='';
  attack:number = 0;
  defense:number = 0;
     
  constructor( private pokemonService:PokemonService ) {}

  ngOnInit(): void {
    this.getAll();
    this.pokemonform();
  }

  pokemonform(){
    this.form = new FormGroup({
      id:new FormControl(0, Validators.required),
      name: new FormControl(null, [Validators.required]),
      attack: new FormControl(0, Validators.required),
      image: new FormControl('https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png', Validators.required),
      defense: new FormControl(0, Validators.required),
      idAuthor : new FormControl(2, Validators.required),
      hp: new FormControl(35, Validators.required),
      type:  new FormControl('electric', Validators.required),
    });

    this.f['attack'].valueChanges
    .subscribe(value => {
       this.attack = value;
    });

    this.f['defense'].valueChanges
    .subscribe(value => {
      this.defense = value;
    });
  }

  getAll(){
    this.pokemonService.getAll()
    .subscribe(
      (data : Pokemon[]) => {
      this.pokemonList = data;
      }
    );
  }

  create() {
    this.pokemonService.create(this.form.value)
    .subscribe((res:Pokemon) => {
      this.pokemonList.push(res);
      }
    )
  }

  delete(id:number){
    this.pokemonService?.delete(id)
    .subscribe(
      () => {
        this.pokemonList = this.pokemonList.filter(item => item.id !== id);
      }
    )
  }

  loadData(id:number){
    this.addFormView = false;
    this.editFormView = true;
    let pokemon = this.pokemonList.find(item => item.id === id);
    this.form.patchValue({
      id: pokemon?.id,
      name: pokemon?.name,
      idAuthor:2,
      attack: pokemon?.attack,
      image: pokemon?.image ,
      defense: pokemon?.defense,
      hp:  pokemon?.hp ,
      type:  pokemon?.type
    }); 
  }

  update(){
    let id =  this.form.value.id;
    this.pokemonService.update(id ,this.form.value)
    .subscribe(res => {
      const index = this.pokemonList.findIndex( pokemon => pokemon.id === id);
      this.pokemonList[index] = res;
      this.resetForm();
      this.editFormView = false;
    })
  }

  find(id:number){
    this.pokemonService.findById(id)
    .subscribe(res => {
      this.pokemonList = this.pokemonList.filter(item => item.id !== id);
    })
  }

  toggleShow() {
    this.pokemonform();
    this.addFormView = ! this.addFormView; 
    this.editFormView = false;
  }

  resetForm() {
    this.form.reset();
  }
  get f(){
    return this.form.controls;
  }
}
