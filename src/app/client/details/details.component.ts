import { AfterViewInit, Component } from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements AfterViewInit {

  images: string[] = [
    'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
    'https://images.unsplash.com/photo-1518443895914-2b4d4a1b7c74',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    'https://images.unsplash.com/photo-1585386959984-a41552262c68'
  ];

  selectedImage: string = this.images[0];

  quantity: number = 1;

  ngAfterViewInit(): void {
    new Splide('#thumbnail-carousel', {
      type: 'loop',
      perPage: 3,
      gap: '1rem',
      autoplay: true,
      interval: 2000,
      pauseOnHover: true,
      arrows: false,
      pagination: false,
      breakpoints: {
        640: { perPage: 2 },
        1024: { perPage: 3 }
      }
    }).mount();
  }

  changeImage(img: string) {
    this.selectedImage = img;
  }

  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}