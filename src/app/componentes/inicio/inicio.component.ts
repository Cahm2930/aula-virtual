import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InicioComponent {
  tabSeleccionado = 'videos';

  videoUrl!: SafeResourceUrl;
  videoModal = false;

  a: any;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {}

  abrirVideo(idVideo: string) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${idVideo}?autoplay=1`,
    );

    this.videoModal = true;
  }

  instagram() {}

  facebook() {}

  ubicanos() {}

  login() {
    this.router.navigate(['login']);
  }

  cerrarVideo() {
    this.videoModal = false;
    this.videoUrl = '';
  }
}
