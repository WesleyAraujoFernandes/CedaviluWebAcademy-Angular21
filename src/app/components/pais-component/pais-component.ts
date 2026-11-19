import { Component, inject, signal } from '@angular/core';
import { Pais } from '../../models/pais-interface';
import { PaisesService } from '../../services/paises-service';

@Component({
  selector: 'app-pais-component',
  imports: [],
  standalone: true,
  templateUrl: './pais-component.html',
  styleUrl: './pais-component.css',
})
export class PaisComponent {
  private paisService = inject(PaisesService);
  paises = signal<Pais[]>([]);
  cargando = signal<boolean> (true);
  error = signal<string | null>(null);
  constructor() {
    this.cargarPaises();
  }

  cargarPaises(): void {
    this.cargando.set(false);
    this.paisService.obtenerPaises().subscribe({
      next: (data) => {
        this.paises.set(data);
        this.cargando.set(true);
      },
      error: (err) => {
        console.error('Error al cargar el país:', err);
        this.error.set('Error al cargar el país.');
      },
    });
  }
}
