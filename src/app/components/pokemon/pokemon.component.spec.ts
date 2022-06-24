import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PokemonComponent } from './pokemon.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { of } from "rxjs";


describe('lista de pokemones', () => {
  let fixture: ComponentFixture<PokemonComponent>
  let component:PokemonComponent;
  let pokemonHttpSpy : jasmine.SpyObj<PokemonService>;

  beforeEach(waitForAsync(() => {

    pokemonHttpSpy = jasmine.createSpyObj<PokemonService>('PokemonService', ['getAll', 'create', 'delete', 'update', 'findById'])

    TestBed.configureTestingModule({
      declarations: [PokemonComponent],
      providers: [
         {provide : PokemonService, useValue:pokemonHttpSpy}
      ]
    }).compileComponents()
  }))

  beforeEach(waitForAsync(() => {
     fixture = TestBed.createComponent(PokemonComponent);
     component = fixture.componentInstance;
  }))

  it('El componente se debe instanciar ', () => {
    expect(component).toBeDefined();
    expect(component).toBeInstanceOf(PokemonComponent);
    expect(component.pokemonList.length).toBe(0);
  });

  it('El metodo getAll de inicializar el atributo pokemon', () => {
    pokemonHttpSpy.getAll.and.returnValue(of([ 
      {id:12,name:'pikachu',image:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png',attack:56,defense:65,hp:23,type:'water',idAuthor:2}
    ]));
    component.getAll()
    expect(component.pokemonList.length).toBe(1);
  });

  it('El metodo create de agregar un pokemon ', () => {
    const newPokemon =  {id:12,name:'pikachu',image:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png',attack:56,defense:65,hp:23,type:'water',idAuthor:2}
    pokemonHttpSpy.create.and.returnValue(of());
    component.create()
    expect(component.pokemonList.length).toBe(1);
  });

  it('El metodo update debe actualizar un pokemon ', () => {
    const newPokemon =  {id:12,name:'pikachu',image:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png',attack:56,defense:65,hp:23,type:'water',idAuthor:2}
    pokemonHttpSpy.create.and.returnValue(of(newPokemon));
    component.create()
    newPokemon.name ='TestUpdate';
    component.update();
    pokemonHttpSpy.update.and.returnValue(of(newPokemon));
    expect(component.pokemonList.length).toBe(1);
    expect(component.pokemonList[0].name).toBe(newPokemon.name);

  });


  it('El metodo delete debe eliminar un pokemon ', () => {
    const newPokemon =  {id:12,name:'pikachu',image:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png',attack:56,defense:65,hp:23,type:'water',idAuthor:2}
    pokemonHttpSpy.create.and.returnValue(of(newPokemon));
    component.create()
    pokemonHttpSpy.delete.and.returnValue(of());
    component.delete(newPokemon.id);
    expect(component.pokemonList.length).toBe(0);

  });

});
