import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  gl_currentPath: string = ''; // this is global variable among sidebar, photos, music, video, code, upload and folder-creation.
}