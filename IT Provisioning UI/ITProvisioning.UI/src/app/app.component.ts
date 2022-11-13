import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models';
import { AuthenticationService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ITProvisioning.UI';
  currentUser: User | undefined;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.getCurrentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
