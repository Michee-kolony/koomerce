import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {

  const router = inject(Router);

  const token = localStorage.getItem('admin_token');

  //Pas de token
  if (!token) {
    router.navigate(['/auth']);
    return false;
  }

  try {
    //Décodage du JWT
    const payload = JSON.parse(atob(token.split('.')[1]));

    //Pas admin
    if (payload.role !== 'admin') {
      router.navigate(['/']);
      return false;
    }

    //Token expiré (optionnel mais conseillé)
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('admin_token');
      router.navigate(['/auth']);
      return false;
    }

    //OK
    return true;

  } catch (error) {
    router.navigate(['/auth']);
    return false;
  }
};