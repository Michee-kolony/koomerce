import { AfterViewInit, Component } from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  search = false;

  ngAfterViewInit(): void {

    // HERO CAROUSEL (remplace Bootstrap)
    new Splide('#hero-carousel', {
      type: 'loop',
      autoplay: true,
      interval: 4000,
      pauseOnHover: true,
      arrows: false,
      pagination: true,
      speed: 1000
    }).mount();


    // TON CAROUSEL PRODUITS 1
    new Splide('#image-carousel', {
      type: 'loop',
      perPage: 3,
      gap: '1.5rem',
      autoplay: true,
      pauseOnHover: true,
      focus: 'center',
      pagination: false,
      breakpoints: {
        1024: { perPage: 3 },
        640: { perPage: 2 }
      }
    }).mount();


    // TON CAROUSEL PRODUITS 2
    new Splide('#image-carousel2', {
      type: 'loop',
      perPage: 3,
      gap: '1.5rem',
      autoplay: true,
      pauseOnHover: true,
      focus: 'center',
      pagination: false,
      breakpoints: {
        1024: { perPage: 3 },
        640: { perPage: 2 }
      }
    }).mount();
  }

  launchsearch() {
    this.search = !this.search;
  }
}