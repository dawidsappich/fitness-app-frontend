import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "../../../auth/service/auth.service";
import { Store } from 'store';
import { Router } from "@angular/router";

// interface
import { Member } from "../models/user";

// rxjs
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  user$: Observable<any>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // get notified when user status changes
    this.user$ = this.store.select<Member>('user');
    // FIX: Observable is undefinied when view is loaded although
    // the authservice is injected
    // this.subscription = this.authService.auth$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    // redirect to login screen
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
