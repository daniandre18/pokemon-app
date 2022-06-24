import { Observable, of } from "rxjs";
import { Pokemon } from "../models/pokemon";

export class PokemonServiceTestingService{
    getAll(): Observable<Pokemon[]> {
      return of([ 
        {id:12,name:'pikachu',image:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png',attack:56,defense:65,hp:23,type:'water',idAuthor:2}
      ])
    }  
  }