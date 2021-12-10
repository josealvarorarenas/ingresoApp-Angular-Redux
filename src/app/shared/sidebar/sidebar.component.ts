import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string = '';
  userSubs: Subscription;

  constructor( private authService: AuthService,
               private router: Router,
               private store: Store<AppState> ) { }

  ngOnInit(): void {
    // this.store.select('user').subscribe( user => user.user ) // Podemos hacerlo así aunque mejor con  la desestructuración
    // this.userSubs = this.store.select('user').subscribe( ({user}) => this.nombre = user?.nombre ); // 1º Manera correcta de hacerlo
    this.userSubs = this.store.select('user')
    .pipe(
      filter( ({user}) => user != null )
    )
    .subscribe( ({user}) => this.nombre = user.nombre ) // 2º Manera de hacerlo, esta mejor
  }

  ngOnDestroy(){
    this.userSubs.unsubscribe();
  }

  logout(){

    this.authService.logout().then( () =>{
      this.router.navigate(['/login']);
    })
  }
}
