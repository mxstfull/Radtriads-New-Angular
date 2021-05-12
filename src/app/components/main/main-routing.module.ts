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

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: 'total', component: TotalComponent },
            { path: 'account', component: AccountComponent },
            { path: 'code/:path', component: CodeComponent },
            { path: 'folder-creation', component: FolderCreationComponent },
            { path: 'music/:path', component: MusicComponent },
            { path: 'photos/:path', component: PhotosComponent },
            { path: 'trash', component: TrashComponent },
            { path: 'upgrade-account', component: UpgradeAccountComponent },
            { path: 'uploading', component: UploadingComponent },
            { path: 'video/:path', component: VideoComponent },
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }