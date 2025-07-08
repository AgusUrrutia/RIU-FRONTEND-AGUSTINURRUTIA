import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../interfaces/hero';
import { Router } from '@angular/router';


import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UppercaseDirective } from '../../../shared/directives/uppercase.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    UppercaseDirective
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent {
  displayedColumns: string[] = ['name', 'power', 'city', 'actions'];
  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];
  heroesPaginated: Hero[] = [];

  filterName = '';
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private heroService: HeroService, private router: Router) {
    this.loadHeroes();
  }

  loadHeroes() {
    this.heroService.getAll().subscribe(heroes => {
      this.heroes = heroes;
      this.applyFilter();
    });
  }

  applyFilter() {
    const filterValue = this.filterName.trim().toLowerCase();
    this.filteredHeroes = this.heroes.filter(hero =>
      hero.name.toLowerCase().includes(filterValue)
    );
    this.pageIndex = 0;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.heroesPaginated = this.filteredHeroes.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedData();
  }

  edit(hero: Hero) {
    this.router.navigate(['edit', hero.id]);
  }

  delete(hero: Hero) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estas seguro que quieres eliminar a ${hero.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroService.delete(hero.id).subscribe(() => {
          console.log("Hero eliminado:", hero.name);
          this.loadHeroes();
        });
      }
    });
  }

  add() {
    this.router.navigate(['new']);
  }
}
