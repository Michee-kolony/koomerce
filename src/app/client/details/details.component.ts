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
  urlpanier = "https://api-koomerce.shop/panier";

  article: Article | null = null;
  images: string[] = [];
  selectedImage: string = '';
  quantity: number = 1;
  loading: boolean = true;

  // 🔥 USER
  user: any = null;
  userId: string | null = null;
  isLoggedIn: boolean = false; // ✅ AJOUT

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 🔥 RÉCUPÉRATION USER LOCALSTORAGE
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.userId = this.user?._id || null;
      this.isLoggedIn = true; // ✅ AJOUT
      console.log("User connecté:", this.user);
    } else {
      this.isLoggedIn = false;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.http.get<Article>(`${this.urlapi}/${id}`).subscribe(
      (data) => {
        this.article = data;

        console.log(this.article);

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

  ngAfterViewInit(): void {}

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