import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "../../../auth/service/auth.service";
import { Store } from 'store';

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
    private authService: AuthService
  ) { }

  ngOnInit() {
    // get notified when user status changes
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<Member>('user');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
