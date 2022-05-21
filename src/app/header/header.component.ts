import { Component, OnInit } from '@angular/core';
import { autoLogout, getIsAuthenticated } from '@app/auth/state';
import { AppState } from '@app/store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(getIsAuthenticated)
  }

  onLogout(){
    this.store.dispatch(autoLogout())
  }

}
