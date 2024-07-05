export class Cliente {
  clienteId: number;
  nombre: string;
  apellidos: string;
  direccion: string;
  clienteArticulos: any[]; // Puedes definir una interfaz específica si tienes más detalles sobre la estructura

  constructor() {
    this.clienteId = 0;
    this.nombre = '';
    this.apellidos = '';
    this.direccion = '';
    this.clienteArticulos = [];
  }
}
