import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HeroService } from '../../services/hero.service';
import { of } from 'rxjs';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HeroService', ['getAll', 'getByName']);

    await TestBed.configureTestingModule({
      declarations: [HeroListComponent],
      providers: [{ provide: HeroService, useValue: spy }]
    }).compileComponents();

    heroServiceSpy = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
  });

  beforeEach(() => {
    heroServiceSpy.getAll.and.returnValue(of([
      { id: 1, name: 'Spiderman', power: '', city: '' }
    ]));

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load heroes on init', () => {
    expect(component.heroes.length).toBe(1);
  });
});