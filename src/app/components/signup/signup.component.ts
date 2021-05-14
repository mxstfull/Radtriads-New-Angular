import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'; 
import { ConfirmedValidator } from '../../confirmed.validator';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationComponent } from "../../shared/confirmation/confirmation.component";
import { AlertComponent } from '../../shared/alert/alert.component';

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
  planOption;

  get f(){
    return this.registerForm.controls;
  }
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private router_input: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.router_input.queryParams.subscribe(params => {
      this.planOption = params['plan'];
    });
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
      acceptTerms: [''], 
      planOption: this.planOption
    }, { 
      validator: ConfirmedValidator('password', 'password_confirmation')
    })
  }

  ngOnInit() {
    
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe(
      result => {
      },
      error => {
        if(error.error == "no_plan_selected") {
          this.dialog.open(AlertComponent,{
            data:{
              message: 'Invalid Plan selected.',
              buttonText: {
                cancel: 'Close'
              }
            },
          });
        } 
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