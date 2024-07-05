import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente.model';
import { ClientesService } from '../../services/clientes.service';
import { Articulo } from '../../models/articulo.model';
import { ArticulosService } from '../../services/articulos.service';
import { ClienteArticulo } from '../../models/arituclo-tienda.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  articulos: Articulo[] = [];
  clienteForm: FormGroup;
  editMode = false;
  currentClienteId: number | null = null;

  constructor(
    private clienteService: ClientesService,
    private articuloService: ArticulosService,
    private fb: FormBuilder
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      clienteArticulos: [[]] // Inicializa como un arreglo vacío
    });
  }

  ngOnInit(): void {
    this.loadClientes();
    this.loadArticulos();
  }

  loadClientes() {
    this.clienteService.getAll().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
      },
      error: (err) => {
        console.error('Error loading clientes:', err);
      }
    });
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

  onSubmit() {
    if (this.clienteForm.invalid) {
      return;
    }

    const clienteData: any = { ...this.clienteForm.value };

    // Aseguramos que clienteArticulos sea un arreglo
    clienteData.clienteArticulos = Array.isArray(clienteData.clienteArticulos) ? clienteData.clienteArticulos : [];

    // Convertimos clienteArticulos a la estructura esperada por el backend
    clienteData.clienteArticulos = clienteData.clienteArticulos.map((ca: any) => ({
      articuloId: ca.articulo.articuloId,
      articulo: { ...ca.articulo },
      fecha: ca.fecha
    }));

    const cliente: Cliente = clienteData;

    if (this.editMode) {
      this.clienteService.update(this.currentClienteId!, cliente).subscribe({
        next: () => {
          this.loadClientes();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error updating cliente:', err);
        }
      });
    } else {
      this.clienteService.create(cliente).subscribe({
        next: () => {
          this.loadClientes();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error creating cliente:', err);
        }
      });
    }
  }

  onEdit(cliente: Cliente) {
    this.editMode = true;
    this.currentClienteId = cliente.clienteId;

    // Convertir clienteArticulos a la estructura esperada por el formulario
    const clienteArticulosForm = cliente.clienteArticulos.map((ca: ClienteArticulo) => ({
      articulo: ca.articulo,
      fecha: ca.fecha
    }));

    this.clienteForm.patchValue({
      nombre: cliente.nombre,
      apellidos: cliente.apellidos,
      direccion: cliente.direccion,
      clienteArticulos: clienteArticulosForm
    });
  }

  onDelete(id: number) {
    this.clienteService.delete(id).subscribe({
      next: () => {
        this.loadClientes();
      },
      error: (err) => {
        console.error('Error deleting cliente:', err);
      }
    });
  }

  resetForm() {
    this.clienteForm.reset();
    this.editMode = false;
    this.currentClienteId = null;
  }

  getArticuloDescripcion(clienteArticulos: ClienteArticulo[]): string {
    if (!clienteArticulos || clienteArticulos.length === 0) return '';

    const articuloId = clienteArticulos[0].articulo.articuloId; // Se obtiene el primer artículo asociado al cliente (ejemplo)
    const articulo = this.articulos.find(a => a.articuloId === articuloId);
    return articulo ? articulo.descripcion : '';
  }
}
