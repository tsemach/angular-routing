import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  /**
   * route.navigate: some notes about navigation
   * 1) 1th argument: is relative to that component so '/servers' and 'servers' are the same.
   * 2) ActiveRoute: is an object represent the current active route which able to inject by angular.
   */
  loadServers() {
    this.router.navigate(['/servers']);
  }

  /**
   * route.navigate: route navigation with url parameters
   * 1) 1th argument: is relative to that component so '/servers' and 'servers' are the same.
   * 2) ActiveRoute: is an object represent the current active route which able to inject by angular.
   */
  loadServer(id: number) {
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }
}
