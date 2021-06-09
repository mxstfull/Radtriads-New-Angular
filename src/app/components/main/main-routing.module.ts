import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from '../sidebarPages/account/account.component';
import { CodeComponent } from '../sidebarPages/code/code.component';
import { FolderCreationComponent } from '../sidebarPages/folder-creation/folder-creation.component';
import { MusicComponent } from '../sidebarPages/music/music.component';
import { PhotosComponent } from '../sidebarPages/photos/photos.component';
import { TotalComponent } from '../sidebarPages/total/total.component';
import { UploadingComponent } from '../sidebarPages/uploading/uploading.component';
import { VideoComponent } from '../sidebarPages/video/video.component';
import { UpgradeAccountComponent } from '../sidebarPages/upgrade-account/upgrade-account.component';
import { TrashComponent } from '../sidebarPages/trash/trash.component';
import { MainComponent } from './main.component';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { SubmitSuccessComponent } from '../sidebarPages/submit-success/submit-success.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: 'total', component: TotalComponent, canActivate: [AuthGuard] },
            { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
            { path: 'Code/:path', component: CodeComponent, canActivate: [AuthGuard] },
            { path: 'folder-creation', component: FolderCreationComponent, canActivate: [AuthGuard] },
            { path: 'Music/:path', component: MusicComponent, canActivate: [AuthGuard] },
            { path: 'Photo/:path', component: PhotosComponent, canActivate: [AuthGuard] },
            { path: 'trash', component: TrashComponent, canActivate: [AuthGuard] },
            { path: 'upgrade-account', component: UpgradeAccountComponent, canActivate: [AuthGuard] },
            { path: 'submit-success', component: SubmitSuccessComponent, canActivate: [AuthGuard] },
            { path: 'uploading', component: UploadingComponent, canActivate: [AuthGuard] },
            { path: 'Video/:path', component: VideoComponent, canActivate: [AuthGuard] },
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }