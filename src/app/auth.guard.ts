import { Injectable } from '@angular/core';
import { CanActivate,CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot , Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './connect-db.service';

@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild{

  constructor(private router:Router, private authService: AuthService){

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authService.isUserLogged()){
    	return true;
    }

    // if(localStorage.getItem('currentUser')){
    // 	return true;
    // }

    this.router.navigate(['/login'],{ queryParams:{ returnUrl: state.url}});
    return;
  };
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  	if(this.authService.isUserLogged()){
    	return true;
    }
  	this.router.navigate(['/login'],{ queryParams:{ returnUrl: state.url}});
  	return false;
  }

}
