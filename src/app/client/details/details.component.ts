import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Splide from '@splidejs/splide';

interface Article {
  _id: string;
  titre: string;
  prix: number;
  description: string;
  image1: string;
  image2?: string;
  image3?: string;
  status: string;
  reduction: number;
  categorie: string;
  nomvendeur: string;
  telephonev: string;
  genre: string;
  prixReduit: number;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, AfterViewInit {

  urlapi = "https://api-koomerce.shop/articles";
  article: Article | null = null;
  images: string[] = [];
  selectedImage: string = '';
  quantity: number = 1;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

 ngOnInit(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const id = this.route.snapshot.paramMap.get('id'); // <-- changer ici
  if (!id) return;

  this.http.get<Article>(`${this.urlapi}/${id}`).subscribe(
    (data) => {
      this.article = data;
      console.log(this.article); // Maintenant ça doit s'afficher
      this.images = [this.article.image1];
      if (this.article.image2) this.images.push(this.article.image2);
      if (this.article.image3) this.images.push(this.article.image3);
      this.selectedImage = this.images[0];
      setTimeout(() => this.initSplide(), 100);
      this.loading = false;
    },
    (err) => {
      console.error('Erreur API:', err);
      this.loading = false;
    }
  );
}

  ngAfterViewInit(): void {
    // Splide sera initialisé après la récupération des images
  }

  initSplide() {
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
    if (this.quantity > 1) this.quantity--;
  }
}