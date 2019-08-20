import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = { };
  jwtHelper = new JwtHelperService();

  constructor(
    public authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      // console.log('User logged in successfully');
      this.alertifyService.success('User logged in successfully');
    }, error => {
      // console.log(error);
      this.alertifyService.error(error);
    },
      () => {
        this.router.navigate(['/members']);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertifyService.message('logged out');
    this.router.navigate(['/home']);
  }

}
