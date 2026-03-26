import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Splide from '@splidejs/splide';

interface Article {
  _id: string;
  titre: string;
  prix: number;
  prixReduit?: number;
  reduction: number;
  description: string;
  image1: string;
  image2?: string;
  image3?: string;
  createdAt: string;
  categorie: string;
  genre: string;
  status: string;
  nomvendeur: string;
  telephonev: string;
}

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit, AfterViewInit {

  api = "https://api-koomerce.shop/articles";
  articles: Article[] = [];
  searchTerm: string = '';
  loading = true;

  selectedArticle: Article | null = null;
  showModal: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  // ⚡ Récupérer les articles depuis l'API et trier par date
  loadArticles(): void {
    this.http.get<Article[]>(this.api).subscribe(
      data => {
        this.articles = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.loading = false;
        setTimeout(() => this.initSplides(), 100); // Init Splide après le rendu
      },
      err => console.error(err)
    );
  }

  // ⚡ Initialiser Splide pour chaque article
  initSplides(): void {
    this.articles.forEach(article => {
      new Splide('#splide-' + article._id, {
        type: 'loop',
        perPage: 1,
        pagination: true,
        arrows: true,
        gap: '0.5rem'
      }).mount();
    });
  }

  ngAfterViewInit(): void {
    // Rien ici, Splide initialisé après fetch
  }

  // ⚡ Filtrage dynamique
  filteredArticles(): Article[] {
    if (!this.searchTerm) return this.articles;
    return this.articles.filter(a =>
      a.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // ⚡ Supprimer un article
  deleteArticle(articleId: string): void {
    if (!confirm('Voulez-vous vraiment supprimer cet article ?')) return;
    this.http.delete(`${this.api}/${articleId}`).subscribe(
      () => {
        this.articles = this.articles.filter(a => a._id !== articleId);
        alert('Article supprimé avec succès !');
      },
      err => console.error(err)
    );
  }

  // ⚡ Modifier un article (ouvrir modale)
  editArticle(article: Article): void {
    this.selectedArticle = { ...article }; // clone
    this.showModal = true;
  }

  // ⚡ Enregistrer les modifications
  saveArticle(): void {
    if (!this.selectedArticle) return;
    const id = this.selectedArticle._id;
    this.http.put(`${this.api}/${id}`, this.selectedArticle).subscribe(
      () => {
        const index = this.articles.findIndex(a => a._id === id);
        if (index > -1) this.articles[index] = { ...this.selectedArticle! };
        this.showModal = false;
        this.selectedArticle = null;
        alert('Article modifié avec succès !');
      },
      err => console.error(err)
    );
  }

  // ⚡ Fermer la modale
  closeModal(): void {
    this.showModal = false;
    this.selectedArticle = null;
  }
}