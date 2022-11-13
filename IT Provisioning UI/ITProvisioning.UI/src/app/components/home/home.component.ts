import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from 'src/app/models';
import { AuthenticationService, UserService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loading = false;
  users: User[] | any;
  currentUser: User | undefined;

  constructor(private userService: UserService, private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.getCurrentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users) => {
        this.loading = false;
        this.users = users;
      });
  }
}
