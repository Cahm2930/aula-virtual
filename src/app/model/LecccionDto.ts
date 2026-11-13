export interface LeccionDTO {
  id?: number;

  // Relación con módulo o capacitación
  moduloId?: number | null;
  capacitacionId?: number | null;

  titulo: string;
  descripcion: string;

  tipoContenido: string;
  contenidoTexto?: string;

  duracionMinutos?: number | null;
  orden: number;

  esObligatoria: boolean;
  estado?: string;

  fechaCreacion?: string;
}
