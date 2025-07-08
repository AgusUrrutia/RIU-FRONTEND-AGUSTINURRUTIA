import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../interfaces/hero';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent implements OnInit {
  form!: FormGroup;
  heroId: number | null = null;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.heroId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.heroId;

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      power: ['', Validators.required],
      city: ['', Validators.required]
    });

    if (this.isEdit) {
      this.heroService.getById(this.heroId).subscribe(hero => {
        if(hero){
          this.form.patchValue(hero);
        }
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const hero: Hero = {
      id: this.heroId || Date.now(), // Si es nuevo, uso timestamp como ID "temporal"
      ...this.form.value
    };

    if (this.isEdit) {
      this.heroService.update(hero).subscribe(() => {
        this.router.navigate(['']);
      });
    } else {
      this.heroService.create(hero).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }
  backToList(): void {
    this.router.navigate(['']);
  }

}
