import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AccountService } from 'src/app/shared/account.service';
import { TokenService } from 'src/app/shared/token.service';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationComponent } from "../../../shared/confirmation/confirmation.component";
import { AlertComponent } from '../../../shared/alert/alert.component';
import { AppSettings } from '../../../shared/appSettings';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  MyInfoForm: FormGroup;
  SettingForm: FormGroup;
  PrivacyForm: FormGroup;
  selected = 'option1';
  errors = null;
  submitted = false;
  user_info = { u_id: localStorage.getItem('unique_id') };
  user_inf: object;
  plan_inf: any;

  allRate: number = 0;
  photoRate: number;
  musicRate: number;
  videoRate: number;
  codeRate: number;
  trashRate: number;
  selectedFile: File = null;
  fileCount: string = "";
  stripe_plan: string;
  tab: number;

  fileToUpload: any;
  imageUrl: any;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public AccountService: AccountService,
    private token: TokenService,
    private authState: AuthStateService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
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
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.tab) {
        if (params.tab === 'plan') {
          this.tab = 1;
        }
      }
    });
    this.AccountService.GetUserData(this.user_info).subscribe(
      result => {
        this.responseGetDataHandler(result);
      },
    );
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    let requestPayload = {
      unique_id: localStorage.getItem('unique_id'),
      fileToUpload: this.fileToUpload
    };
    this.AccountService.uploadAvatar(requestPayload).subscribe(
      result => {
      },
    );
  }
  responseGetDataHandler(result: any) {
    this.user_inf = result.message.user;
    this.plan_inf = result.message.plan;

    this.MyInfoForm.patchValue({ Username: this.user_inf['name'], email: this.user_inf['email'], old_password: "", new_password: "", new_password_confirmation: "" });
    this.SettingForm.patchValue({ check_direct: this.user_inf['show_direct_link'], check_html: this.user_inf['show_html_code'], check_bulletin: this.user_inf['show_forum_code'], check_button: this.user_inf['show_social_share'] });

    if (this.user_inf['is_account_public']) this.selected = 'option1';
    else this.selected = 'option2';

    if (this.plan_inf.is_free_trial) {
      this.plan_inf.trial_ends_date = new Date(this.plan_inf.trial_ends_date * 1000).toLocaleDateString();
    }

    this.PrivacyForm.patchValue({ Privacy_seleted: this.selected });

    this.stripe_plan = this.user_inf['stripe_plan'];
    this.getDiskUsage();
    if(this.user_inf['profile_picture']) {
      this.imageUrl = AppSettings.backendURL+"avatar/"+this.user_inf['profile_picture'];
    }
  }

  getDiskUsage() {
    let requestPayload = {
      user_id: localStorage.getItem('user_id'),
    }
    this.AccountService.getDiskUsage(requestPayload).subscribe(
      result => {
        this.drawPercentBar(result);
      },
    );
  }
  drawPercentBar(result: any) {
    if (result) {
      this.allRate = result['all'];
      this.photoRate = this.musicRate = this.videoRate = this.codeRate = this.trashRate = 0;
      if (result['deleted'] != null) this.trashRate = result['deleted'];
      result['category'].forEach(
        element => {
          switch (element['category']) {
            case 0: this.photoRate = element['diskspace']; break;
            case 1: this.musicRate = element['diskspace']; break;
            case 2: this.videoRate = element['diskspace']; break;
            case 3: this.codeRate = element['diskspace']; break;
          }
        }
      );
      this.fileCount = result['file_count'].toString();
    }
  }
  convertToBigUnit(byteSize) {
    if (byteSize < 1000) {
      return byteSize + "byte";
    } else if (byteSize < 1000 * 1000) {
      return Math.round(byteSize / 1000) + "KB";
    } else if (byteSize < 1000 * 1000 * 1000) {
      return Math.round(byteSize / 1000 / 1000) + "MB";
    } else if (byteSize < 1000 * 1000 * 1000 * 1000) {
      return Math.round(byteSize / 1000 / 1000 / 1000) + "GB";
    }
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
        this.dialog.open(AlertComponent, {
          data: {
            message: 'Success!',
            buttonText: {
              cancel: 'Close'
            }
          },
        });
        this.submitted = false;
        this.MyInfoForm.reset();
      }
    );
  }

  responseHandler(result: any) {
  }
  responseHandler_setting(result: any) {
    localStorage.setItem('show_direct_link', result.message.show_direct_link);
    localStorage.setItem('show_html_code', result.message.show_html_code);
    localStorage.setItem('show_forum_code', result.message.show_forum_code);
    localStorage.setItem('show_social_share', result.message.show_social_share);
  }
  onSubmit_Settings() {
    this.AccountService.Settings(this.SettingForm.value, this.user_info).subscribe(
      result => {
        this.responseHandler_setting(result);
      },
      error => {
        this.errors = error.error;
      }, () => {
        this.dialog.open(AlertComponent, {
          data: {
            message: 'Success!',
            buttonText: {
              cancel: 'Close'
            }
          },
        });
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
        this.dialog.open(AlertComponent, {
          data: {
            message: 'Success!',
            buttonText: {
              cancel: 'Close'
            }
          },
        });
      }
    );
  }

  public onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile) {

      // If selected file exist make upload request
    }
  }

  signOut() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
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
    });
  }
}
