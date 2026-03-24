import { Component } from '@angular/core';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})

export class CommandeComponent {
  searchTerm: string = '';

 commandes = [
  {
    id: 1,
    produit: 'Chaussures Sport',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    prix: 79.99,
    client: 'Jean Mbala',
    telephone: '+243 812 345 678',
    adresse: 'Kinshasa, Gombe',
    status: 'Livrée'
  },
  {
    id: 2,
    produit: 'Sac à Dos',
    image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
    prix: 49.99,
    client: 'Alice Mbuyi',
    telephone: '+243 815 987 654',
    adresse: 'Kinshasa, Limete',
    status: 'Non Livrée'
  },
  {
    id: 3,
    produit: 'Montre Connectée',
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    prix: 129.99,
    client: 'Patrick Kabila',
    telephone: '+243 998 123 456',
    adresse: 'Kinshasa, Bandalungwa',
    status: 'Livrée'
  },
  {
    id: 4,
    produit: 'Veste Homme',
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    prix: 59.99,
    client: 'Linda Mukendi',
    telephone: '+243 812 456 789',
    adresse: 'Kinshasa, Ngaliema',
    status: 'Non Livrée'
  },
  {
    id: 5,
    produit: 'T-shirt Femme',
    image: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_.jpg',
    prix: 19.99,
    client: 'Emmanuel Tshibanda',
    telephone: '+243 814 321 987',
    adresse: 'Kinshasa, Kintambo',
    status: 'Livrée'
  },
  {
    id: 6,
    produit: 'Jeans Homme',
    image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UL640_QL65_ML3_.jpg',
    prix: 39.99,
    client: 'Catherine Moyo',
    telephone: '+243 819 876 543',
    adresse: 'Kinshasa, Limete',
    status: 'Non Livrée'
  },
  {
    id: 7,
    produit: 'Chaussures Femme',
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879_.jpg',
    prix: 89.99,
    client: 'Eric Mbombo',
    telephone: '+243 811 234 567',
    adresse: 'Kinshasa, Gombe',
    status: 'Livrée'
  },
  {
    id: 8,
    produit: 'Sacoche Homme',
    image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    prix: 69.99,
    client: 'Marie Kitenge',
    telephone: '+243 817 654 321',
    adresse: 'Kinshasa, Bandalungwa',
    status: 'Non Livrée'
  }
];

  filteredCommandes() {
    if (!this.searchTerm) return this.commandes;
    return this.commandes.filter(c =>
      c.produit.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.client.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}