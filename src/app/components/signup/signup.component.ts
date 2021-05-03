import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'; 
import { ConfirmedValidator } from '../../confirmed.validator';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  verifyForm: FormGroup = new FormGroup({});
  errors = null;
  loading = false;
  submitted = false;
  sucess_register = false;
  get f(){
    return this.registerForm.controls;
  }

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
      acceptTerms: ['']
    }, { 
      validator: ConfirmedValidator('password', 'password_confirmation')
    })
  }

  ngOnInit() { }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe(
      result => {
        console.log(result)
      },
      error => {
        this.errors = error.error;
        this.loading = false;
      },
      () => {
        this.registerForm.reset();
        this.router.navigate(['login']);
      }
    )
  }

}