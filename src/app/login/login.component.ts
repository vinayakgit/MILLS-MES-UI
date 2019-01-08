import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from '../authServices/auth.service';
import {TokenStorage} from '../authServices/token.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService,
  private token: TokenStorage) { }


  username: string;
  password: string;

  login(form) {
    // this.username = form.value.username;
    // this.password = form.value.password;
    console.log('UserName= ' + this.username);

    console.log('Password=' + this.password);
    // this.token.saveToken('kjsdhkhfhhjfsalkdjfhhjj');
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        this.token.saveToken(data.access_token);
        this.router.navigateByUrl('/blank');
      },
      error => {
        if (this.token.getToken() != null ) {
          this.token.removeToken();
        }
        console.error('Login Error= ' + JSON.stringify(error));
        alert('UserName or Password is wrong!');
      }
    );
  }

  ngOnInit() {
  }

}
