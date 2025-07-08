import { Routes } from '@angular/router';
import { HeroListComponent } from './heroes/components/hero-list/hero-list.component';
import { HeroFormComponent } from './heroes/components/hero-form/hero-form.component';

export const routes: Routes = [
    { path: '', component: HeroListComponent },
    { path: 'new', component: HeroFormComponent },
    { path: 'edit/:id', component: HeroFormComponent }
];
