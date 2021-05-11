import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AccountService } from 'src/app/shared/account.service';
import { TokenService } from 'src/app/shared/token.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent {

  MyInfoForm: FormGroup;
  SettingForm: FormGroup;
  PrivacyForm: FormGroup;
  selected = 'option1';
  errors = null;
  submitted = false;
  user_info = { u_id: localStorage.getItem('unique_id') };
  user_inf: object;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public AccountService: AccountService,
    private token: TokenService,
    private authState: AuthStateService,
  ) {

    this.MyInfoForm = this.fb.group({
      Username: [],
      email: [],
      old_password: [],
      new_password: [],
      new_password_confirmation: []
    })

    this.SettingForm = this.fb.group({
      check_direct: [],
      check_html: [],
      check_bulletin: [],
      check_button: []
    })

    this.PrivacyForm = this.fb.group({
      Privacy_seleted: []
    })

    this.AccountService.GetUserData(this.user_info).subscribe(
      result => {
        this.responseGetDataHandler(result);
      },
    );
  }

  responseGetDataHandler(result: any) {
    this.user_inf = result['message'];

    this.MyInfoForm.patchValue({ Username: this.user_inf['name'], email: this.user_inf['email'], old_password: "", new_password: "", new_password_confirmation: "" });
    this.SettingForm.patchValue({ check_direct: this.user_inf['show_direct_link'], check_html: this.user_inf['show_html_code'], check_bulletin: this.user_inf['show_forum_code'], check_button: this.user_inf['show_social_share'] });

    if (this.user_inf['is_account_public']) this.selected = 'option1';
    else this.selected = 'option2';

    this.PrivacyForm.patchValue({ Privacy_seleted: this.selected });

  }

  onSubmit_myinfo() {
    this.submitted = true;

    this.AccountService.MyInfo(this.MyInfoForm.value, this.user_info).subscribe(
      result => {
        this.responseHandler(result);
      },
      error => {
        this.errors = error.error;
      }, () => {
        console.log('sucess_reset!');
        this.submitted = false;
        this.MyInfoForm.reset();
      }
    );
  }

  responseHandler(result: any) {
  }

  onSubmit_Settings() {
    this.AccountService.Settings(this.SettingForm.value, this.user_info).subscribe(
      result => {
        this.responseHandler(result);
      },
      error => {
        this.errors = error.error;
      }, () => {
        console.log('sucess_reset!');
      }
    );
  }

  onSubmit_Privacy() {
    this.AccountService.Privacy({ seleted: this.selected == 'option1' ? true : false }, this.user_info).subscribe(
      result => {
        this.responseHandler(result);
      },
      error => {
        this.errors = error.error;
      }, () => {
        console.log('sucess_reset!');
      }
    );
  }

  selectedFile: File = null;
  public onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    if (this.selectedFile) {

      // If selected file exist make upload request
    }
  }
  signOut() {
    this.AccountService.delete(this.user_info).subscribe(
      result => {
        this.responseHandler(result);
      },
      error => {
        this.errors = error.error;
      }, () => {
        this.authState.setAuthState(false);
        this.token.removeToken();
        this.router.navigate(['login']);
      }
    );
  }
}
