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
  urlcommande = "https://api-koomerce.shop/commande";

  loading2: boolean = false;

  article: Article | null = null;
  images: string[] = [];
  selectedImage: string = '';
  quantity: number = 1;
  loading: boolean = true;

  user: any = null;
  userId: string | null = null;
  isLoggedIn: boolean = false;

  // 🔥 AJOUT UX
  addingToCart: boolean = false;
  showPopup: boolean = false;
  popupMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // ❌ SUPPRIMÉ appel inutile de envoyerCommande()

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.userId = this.user?._id || null;
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.http.get<Article>(`${this.urlapi}/${id}`).subscribe(
      (data) => {
        this.article = data;

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

  // 🔥 AJOUT AU PANIER DYNAMIQUE
  ajouterAuPanier() {

    if (!this.isLoggedIn || !this.userId || !this.article) {
      this.showToast("Vous devez être connecté pour ajouter au panier ❌");
      return;
    }

    this.addingToCart = true;

    const panier = {
      userId: this.userId,
      produitId: this.article._id,
      titre: this.article.titre,
      prixReduit: this.article.prixReduit,
      image: this.article.image1,
      quantite: this.quantity,
      nomvendeur: this.article.nomvendeur,
      telephonev: this.article.telephonev
    };

    this.http.post(this.urlpanier, panier).subscribe({
      next: (res) => {
        this.addingToCart = false;
        this.showToast("Article ajouté au panier 🛒");
      },
      error: (err) => {
        console.error(err);
        this.addingToCart = false;
        this.showToast("Erreur lors de l'ajout ❌");
      }
    });
  }

  // 🔥 POPUP SIMPLE
  showToast(message: string) {
    this.popupMessage = message;
    this.showPopup = true;

    setTimeout(() => {
      this.showPopup = false;
    }, 2500);
  }

  // 🔥 PASSER COMMANDE RAPIDE
  envoyerCommande() {

    this.loading2 = true;

    if (!this.article || !this.user) {
      console.error("❌ article ou user non chargé");
      this.loading2 = false;
      return;
    }

    const commande = {
      clientId: this.user._id, 
      titre: this.article.titre,
      image1: this.article.image1,
      prix: this.article.prix,
      quantite: this.quantity,
      nomclient: this.user.nom,
      telephoneclient: this.user.telephone,
      nomvendeur: this.article.nomvendeur,
      numerovendeur: this.article.telephonev
    };

    this.http.post(this.urlcommande, commande).subscribe({
      next: (res) => {
        this.showToast("Commande passée avec succès");
        this.loading2 = false;
      },
      error: (err) => {
        console.error(err);
        this.showToast("Erreur lors de la commande");
        this.loading2 = false;
      }
    });
  }
}