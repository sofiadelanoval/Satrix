import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AsistenteVirtualComponent } from '../../components/asistente-virtual/asistente-virtual.component';

@Component({
  selector: 'app-facturacion-boletos',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AsistenteVirtualComponent],
  templateUrl: './facturacion-boletos.component.html',
  styleUrls: ['./facturacion-boletos.component.css']
})
export class FacturacionBoletosComponent {
  rfc: string = '';
  token: string = '';
  rfcExtraido: string | null = null;
  tokenExtraido: string | null = null;

  archivoSeleccionado: File | null = null;
  documentoRFC: File | null = null;

  rfcInvalid: boolean = false;
  tokenInvalid: boolean = false;

  mensajeAsistente: string = '';
  mostrarEjemplo: boolean = false;
  asistenteVisible: boolean = false;

  constructor(private http: HttpClient) {}

  toggleAsistente() {
    this.asistenteVisible = !this.asistenteVisible;
  }

  accionRFC() {
    this.mensajeAsistente = "Un RFC válido en México tiene 12 o 13 caracteres. Si no lo conoces, puedes consultarlo en el SAT: https://www.sat.gob.mx";
  }

  accionToken() {
    this.mensajeAsistente = "Lo que ves es una imagen de tu ticket donde he señalado el token.";
    this.mostrarEjemplo = true;
  }

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.archivoSeleccionado = input.files[0];
    }
  }

  analizarImagen(): void {
    if (!this.archivoSeleccionado) {
      alert("Por favor selecciona una imagen del boleto.");
      return;
    }

    const formData = new FormData();
    formData.append('boleto', this.archivoSeleccionado);

    this.http.post<any>('http://localhost:3001/api/vision/token-boleto', formData)
      .subscribe({
        next: (res) => {
          this.tokenExtraido = res.tokenExtraido;
          if (this.tokenExtraido) {
            this.token = this.tokenExtraido;
          } else {
            alert('No se detectó un token válido en la imagen.');
          }
        },
        error: (err) => {
          console.error(err);
          alert('Error al procesar la imagen.');
        }
      });
  }

  onDocumentoRFCSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.documentoRFC = input.files[0];
    }
  }

  analizarRFC(): void {
    if (!this.documentoRFC) {
      alert("Por favor selecciona tu constancia fiscal (imagen o PDF).");
      return;
    }

    const formData = new FormData();
    formData.append('documento', this.documentoRFC);

    this.http.post<any>('http://localhost:3001/api/vision/extraer-rfc', formData)
      .subscribe({
        next: (res) => {
          this.rfcExtraido = res.rfcExtraido;
          if (this.rfcExtraido) {
            this.rfc = this.rfcExtraido;
          } else {
            alert('No se detectó un RFC válido.');
          }
        },
        error: (err) => {
          console.error(err);
          alert('Error al procesar el documento.');
        }
      });
  }

  enviarFormulario() {
    this.rfcInvalid = !(this.rfc.length === 12 || this.rfc.length === 13);
    this.tokenInvalid = this.token.trim() === '';

    if (this.rfcInvalid || this.tokenInvalid) {
      this.mensajeAsistente = 'Ups... revisa bien tu RFC o el token 🧐';
      this.mostrarEjemplo = true;
      this.asistenteVisible = true;
      return;
    }

    this.mensajeAsistente = '';
    this.mostrarEjemplo = false;
    console.log('Formulario válido 🎉');
  }
}
