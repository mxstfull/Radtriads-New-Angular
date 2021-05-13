import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './components/landing/landing.component';
import { PublicMediaBoardComponent } from './components/public-media-board/public-media-board.component';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';
import { ImageEditorComponent } from './components/image-editor/image-editor.component';
import { ImageEditorNewComponent } from './components/image-editor-new/image-editor-new.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: SigninComponent,
    canActivate: [AuthGuard],
  },
  { path: 'register', component: SignupComponent },
  { path: 'landing', component: LandingComponent },
  {
    path: 'public-media-board',
    component: PublicMediaBoardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'image-editor',
    component: ImageEditorNewComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'image-editor-new',
  //   component: ImageEditorNewComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'photo-details',
    component: PhotoDetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
