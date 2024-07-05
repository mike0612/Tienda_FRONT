import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tienda } from '../../models/tienda.model';
import { TiendaService } from '../../services/tienda.service';
import { Articulo } from '../../models/articulo.model';
import { ArticulosService } from '../../services/articulos.service';
import { ArticuloTienda } from '../../models/arituclo-tienda.model';




@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  tiendas: Tienda[] = [];
  articulos: Articulo[] = [];
  tiendaForm: FormGroup;
  editMode = false;
  currentTiendaId: number | null = null;

  constructor(
    private tiendaService: TiendaService,
    private articulosService: ArticulosService,
    private fb: FormBuilder
  ) {
    this.tiendaForm = this.fb.group({
      sucursal: ['', Validators.required],
      direccion: ['', Validators.required],
      articuloTiendas: [[]] // Inicializa como un arreglo vacío para iniciar
    });
  }

  ngOnInit(): void {
    this.loadTiendas();
    this.loadArticulos();
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

  loadArticulos() {
    this.articulosService.getAll().subscribe({
      next: (articulos: Articulo[]) => {
        this.articulos = articulos;
      },
      error: (err) => {
        console.error('Error loading articulos:', err);
      }
    });
  }

  onSubmit() {
    if (this.tiendaForm.invalid) {
      return;
    }

    const tiendaData = this.tiendaForm.value;

    // Verifica que cada articuloTiendas tenga datos válidos de Articulo y Tienda
    const articuloTiendasValidos = Array.isArray(tiendaData.articuloTiendas) && tiendaData.articuloTiendas.every((at: any) => at.articulo && at.tienda);

    if (!articuloTiendasValidos) {
      console.error('Los datos de Articulo y Tienda en articuloTiendas son inválidos.');
      return;
    }

    // Construye el objeto Tienda
    const tienda: Tienda = {
      tiendaId: this.editMode ? this.currentTiendaId! : 0,
      sucursal: tiendaData.sucursal,
      direccion: tiendaData.direccion,
      articuloTiendas: tiendaData.articuloTiendas.map((at: any) => ({
        articuloId: at.articulo.articuloId,
        articulo: at.articulo,
        tiendaId: this.editMode ? tiendaData.tiendaId : 0, // Asigna el ID de la tienda actual en modo edición, de lo contrario 0
        tienda: at.tienda,
        fecha: new Date()
      })),
    };

    // Llama al servicio para crear o actualizar la tienda
    if (this.editMode) {
      this.tiendaService.update(this.currentTiendaId!, tienda).subscribe({
        next: () => {
          this.loadTiendas();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error updating tienda:', err);
        }
      });
    } else {
      this.tiendaService.create(tienda).subscribe({
        next: () => {
          this.loadTiendas();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error creating tienda:', err);
        }
      });
    }
  }

  getArticuloDescripcion(articuloTiendas: ArticuloTienda[]): string {
    if (!articuloTiendas || articuloTiendas.length === 0) return '';

    const articuloId = articuloTiendas[0].articulo.articuloId;
    const articulo = this.articulos.find(a => a.articuloId === articuloId);
    return articulo ? articulo.descripcion : '';
  }

  // Método para editar una tienda
  onEdit(tienda: Tienda) {
    this.editMode = true;
    this.currentTiendaId = tienda.tiendaId!;
    this.tiendaForm.patchValue({
      sucursal: tienda.sucursal,
      direccion: tienda.direccion,
      articuloTiendas: tienda.articuloTiendas?.map(at => ({
        articulo: at.articulo,
        tienda: at.tienda
      }))
    });
  }

  // Método para eliminar una tienda
  onDelete(id: number) {
    this.tiendaService.delete(id).subscribe({
      next: () => {
        this.loadTiendas();
      },
      error: (err) => {
        console.error('Error deleting tienda:', err);
      }
    });
  }

  // Método para resetear el formulario
  resetForm() {
    this.tiendaForm.reset();
    this.editMode = false;
    this.currentTiendaId = null;
  }
}
