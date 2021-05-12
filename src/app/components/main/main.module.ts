import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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

import { TopbarComponent } from '../topbar/topbar.component';

import { NgxFlowModule, FlowInjectionToken } from '@flowjs/ngx-flow';
import Flow from '@flowjs/flow.js';

import { MainRoutingModule } from './main-routing.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { CdkTableModule } from '@angular/cdk/table';
@NgModule({
    declarations: [AccountComponent,
        CodeComponent,
        FolderCreationComponent,
        MusicComponent,
        PhotosComponent,
        TotalComponent,
        UploadingComponent,
        VideoComponent,
        UpgradeAccountComponent,
        TrashComponent,
        TopbarComponent
    ],
    providers: [{
        provide: FlowInjectionToken,
        useValue: Flow
    }],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
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
        MatProgressBarModule,
        MatTreeModule,
        NgxFlowModule,
        MainRoutingModule
    ]
})
export class MainModule { }