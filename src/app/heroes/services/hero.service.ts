import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Hero {
  id: number;
  name: string;
  power: string;
  city: string;
}

@Injectable({ providedIn: 'root' })
export class HeroService {
  // Simulación de una base de datos local para héroes
  // De nuevo, si quieres que este servicio funcione con una base de datos real, debes implementar las peticiones HTTP correspondientes.
  // Si me dan la oportunidad puedo diseñar un mock de una base de datos real, pero por ahora, este servicio simula una base de datos local con un array de héroes.

  private heroes: Hero[] = [
    { id: 1, name: 'Spiderman', power: 'Telas de araña', city: 'New York' },
    { id: 2, name: 'Superman', power: 'Vuelo', city: 'Metropolis' },
    { id: 3, name: 'Hulk', power: 'Fuerza', city: 'Estados Unidos' },
    { id: 4, name: 'Thor', power: 'Trueno', city: 'Asgard' }
  ];

  

  constructor() {}

  getAll(): Observable<Hero[]> {
    return of(this.heroes).pipe(delay(500));
  }

  getById(id: number): Observable<Hero | undefined> {
    const hero = this.heroes.find(h => h.id === id);
    return of(hero).pipe(delay(300));
  }

  getByName(name: string): Observable<Hero[]> {
    const filtered = this.heroes.filter(h =>
      h.name.toLowerCase().includes(name.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }

  create(hero: Omit<Hero, 'id'>): Observable<Hero> {
    const newHero = { ...hero, id: Date.now() };
    this.heroes.push(newHero);
    return of(newHero).pipe(delay(400));
  }

  update(hero: Hero): Observable<Hero> {
    const index = this.heroes.findIndex(h => h.id === hero.id);
    if (index !== -1) {
      this.heroes[index] = hero;
    }
    return of(hero).pipe(delay(400));
  }

  delete(id: number): Observable<void> {
    this.heroes = this.heroes.filter(h => h.id !== id);
    return of(undefined).pipe(delay(400));
  }
}