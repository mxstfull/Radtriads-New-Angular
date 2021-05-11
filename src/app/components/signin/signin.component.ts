import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  errors = null;
  loading = false;
  submitted = false;

  get f(){
    return this.loginForm.controls;
  }

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
  ) {
    this.loginForm = this.fb.group({
      email: [],
      password: []
    })
  }

  ngOnInit() { }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

      this.authService.signin(this.loginForm.value).subscribe(
        result => {
          this.responseHandler(result);
        },
        error => {
          this.errors = error.error;
          this.loading = false;
        },() => {
          this.authState.setAuthState(true);
          this.loginForm.reset();
          this.router.navigate(['total']);
        }
      );
  }

  // Handle response
  responseHandler(data){
    localStorage.setItem('user_id', data.user.id);
    localStorage.setItem('unique_id', data.user.unique_id);
    this.token.handleData(data.access_token);
  }
}