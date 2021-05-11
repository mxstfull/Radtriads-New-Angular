import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { LandingComponent } from './components/landing/landing.component';
import { PublicMediaBoardComponent } from './components/public-media-board/public-media-board.component';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';
import { ImageEditorComponent } from './components/image-editor/image-editor.component';
import { ImageEditorNewComponent } from './components/image-editor-new/image-editor-new.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AccountComponent } from './components/account/account.component';
import { CodeComponent } from './components/code/code.component';
import { FolderCreationComponent } from './components/folder-creation/folder-creation.component';
import { MusicComponent } from './components/music/music.component';
import { PhotosComponent } from './components/photos/photos.component';
import { TotalComponent } from './components/total/total.component';
import { UploadingComponent } from './components/uploading/uploading.component';
import { VideoComponent } from './components/video/video.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ModalsComponent } from './components/modals/modals.component';
import { NavService } from './components/sidebar/nav-service';
import { MenuListItemComponent } from './components/sidebar/menu-list-item/menu-list-item.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxFlowModule, FlowInjectionToken } from '@flowjs/ngx-flow';
import Flow from '@flowjs/flow.js';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {
  MatListModule
} from '@angular/material/list';

import {
  MatSidenavModule
} from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CdkTableModule } from '@angular/cdk/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { AngMusicPlayerModule } from  'ang-music-player';

import { CardComponent } from './tools/card/card.component';
import { PrivacyModalComponent } from './tools/modals/privacy-modal/privacy-modal.component';
import { ShareModalComponent } from './tools/modals/share-modal/share-modal.component';
import { RenameModalComponent } from './tools/modals/rename-modal/rename-modal.component';
import { DeleteModalComponent } from './tools/modals/delete-modal/delete-modal.component';
import { RenameConfirmModalComponent } from './tools/modals/rename-confirm-modal/rename-confirm-modal.component';
import { ToastUiImageEditorComponent } from './components/toast-ui-image-editor/toast-ui-image-editor.component';
import { Globals } from './global';
import { PixieImageEditorComponent } from './components/pixie-image-editor/pixie-image-editor.component';
import { MoveModalComponent } from './tools/modals/move-modal/move-modal.component';
import { AudioModalComponent } from './tools/modals/audio-modal/audio-modal.component';
import { VideoModalComponent } from './tools/modals/video-modal/video-modal.component';
import { TrashComponent } from './components/trash/trash.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
@NgModule({
  exports: [
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatTableModule,
    CdkTableModule,
    MatCheckboxModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  declarations: [
  ],
})
export class MaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    LandingComponent,
    PublicMediaBoardComponent,
    PhotoDetailComponent,
    ImageEditorComponent,
    SidebarComponent,
    AccountComponent,
    CodeComponent,
    FolderCreationComponent,
    MusicComponent,
    PhotosComponent,
    TotalComponent,
    UploadingComponent,
    VideoComponent,
    TopbarComponent,
    ModalsComponent,
    MenuListItemComponent,
    CardComponent,
    PrivacyModalComponent,
    ShareModalComponent,
    RenameModalComponent,
    DeleteModalComponent,
    RenameConfirmModalComponent,
    ImageEditorNewComponent,
    ToastUiImageEditorComponent,
    PixieImageEditorComponent,
    MoveModalComponent,
    AudioModalComponent,
    VideoModalComponent,
    TrashComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxFlowModule,
    MatTreeModule,
    AngMusicPlayerModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule.forRoot({duration: 1})
  ],
  exports: [
    SidebarComponent,
    ModalsComponent,
    ToastUiImageEditorComponent,
    PixieImageEditorComponent
  ],
  providers: [
    {
      provide: FlowInjectionToken,
      useValue: Flow
    },
    NavService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    Globals,
    { 
      provide: MatDialogRef,
      useValue: []
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }