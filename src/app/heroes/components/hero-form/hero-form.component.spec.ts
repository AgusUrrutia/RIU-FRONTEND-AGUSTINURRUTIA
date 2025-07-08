import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { FormBuilder } from '@angular/forms';
import { HeroService } from '../../services/hero.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HeroService', ['getById', 'update', 'create']);
    spy.getById.and.returnValue(of({ id: 1, name: 'Spiderman', power: '', city: '' }));

    await TestBed.configureTestingModule({
      declarations: [HeroFormComponent],
      providers: [
        FormBuilder,
        { provide: HeroService, useValue: spy },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    heroServiceSpy = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark all fields as touched on submit if invalid', () => {
    component.form.setValue({ name: '', power: '', city: '' });
    component.onSubmit();
    expect(component.form.valid).toBeFalsy();
  });

  it('should call create when submitting new hero', () => {
    component.form.setValue({ name: 'Batman', power: 'Money', city: 'Gotham' });
    component.onSubmit();
    expect(heroServiceSpy.create).toHaveBeenCalled();
  });
});
