import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { Hero } from '../interfaces/hero';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all heroes', (done) => {
    service.getAll().subscribe(heroes => {
      expect(heroes.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should filter by name', (done) => {
    service.getByName('man').subscribe(heroes => {
      expect(heroes.some(h => h.name.includes('man'))).toBeTrue();
      done();
    });
  });

  it('should create a hero', (done) => {
    const newHero = { name: 'Batman', power: 'Money', city: 'Gotham' };
    service.create(newHero).subscribe(hero => {
      expect(hero.id).toBeDefined();
      done();
    });
  });
});