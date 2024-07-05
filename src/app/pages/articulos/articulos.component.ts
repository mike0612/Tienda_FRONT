import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Articulo } from '../../models/articulo.model';
import { ArticulosService } from '../../services/articulos.service';
import { Tienda } from '../../models/tienda.model';
import { TiendaService } from '../../services/tienda.service';
import { ArticuloTienda } from '../../models/arituclo-tienda.model';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  articulos: Articulo[] = [];
  tiendas: Tienda[] = [];
  articuloForm: FormGroup;
  editMode = false;
  currentArticuloId: number | null = null;

  constructor(
    private articuloService: ArticulosService,
    private tiendaService: TiendaService,
    private fb: FormBuilder
  ) {
    this.articuloForm = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      imagen: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      articuloTiendas: [[]], // Inicializa como un arreglo vacío para iniciar
      clienteArticulos: [[]], // Inicializa como un arreglo vacío para iniciar
      tiendaId: [, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadArticulos();
    this.loadTiendas();
  }

  loadArticulos() {
    this.articuloService.getAll().subscribe({
      next: (articulos: Articulo[]) => {
        this.articulos = articulos;
      },
      error: (err) => {
        console.error('Error loading articulos:', err);
      }
    });
  }

  loadTiendas() {
    this.tiendaService.getAll().subscribe({
      next: (tiendas: Tienda[]) => {
        this.tiendas = tiendas;
      },
      error: (err) => {
        console.error('Error loading tiendas:', err);
      }
    });
  }

  onSubmit() {
    if (this.articuloForm.invalid) {
      return;
    }

    const articulo: Articulo = this.articuloForm.value;

    if (this.editMode) {
      this.articuloService.update(this.currentArticuloId!, articulo).subscribe({
        next: () => {
          this.loadArticulos();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error updating articulo:', err);
        }
      });
    } else {
      this.articuloService.create(articulo).subscribe({
        next: () => {
          this.loadArticulos();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error creating articulo:', err);
        }
      });
    }
  }

  onEdit(articulo: Articulo) {
    this.editMode = true;
    this.currentArticuloId = articulo.articuloId;
    this.articuloForm.patchValue(articulo);
  }

  onDelete(id: number) {
    this.articuloService.delete(id).subscribe({
      next: () => {
        this.loadArticulos();
      },
      error: (err) => {
        console.error('Error deleting articulo:', err);
      }
    });
  }

  resetForm() {
    this.articuloForm.reset();
    this.editMode = false;
    this.currentArticuloId = null;
  }

  getTiendaNombre(articuloTiendas: ArticuloTienda[]): string {
    if (!articuloTiendas || articuloTiendas.length === 0) return '';

    const tiendaId = articuloTiendas[0].tienda.tiendaId; // Suponiendo que solo hay una tienda por artículo
    const tienda = this.tiendas.find(t => t.tiendaId === tiendaId);
    return tienda ? tienda.sucursal : '';
  }
}
