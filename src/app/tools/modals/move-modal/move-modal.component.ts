import { Component, OnInit, Inject } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { NavItem } from '../../../components/interfaces/nav-item';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Globals } from '../../../global';
import { FileviewService } from '../../../shared/fileview.service';
import { MatDialogRef } from '@angular/material/dialog';
/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'app-move-modal',
  templateUrl: './move-modal.component.html',
  styleUrls: ['./move-modal.component.css']
})
export class MoveModalComponent implements OnInit {

  activeNode;
  private _transformer = (node: NavItem, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.displayName,
      level: level,
      path: node.path
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  fileList = [];
  action;

  constructor(
    private fileviewService: FileviewService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private globals: Globals,
    private dialogRef: MatDialogRef<MoveModalComponent>
    ) {
    this.dataSource.data = [data['folderTree']];
    this.fileList = data['fileList'];
    this.action = data['action'];
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {

  }
  logNode(node) {
    if (this.activeNode === node) return;
    this.activeNode = node;
  }
  onMoveConfirm() {
    if (this.activeNode === undefined) return;
    let requestPayload = {
      user_id: localStorage.getItem('user_id'),
      unique_id: localStorage.getItem('unique_id'),
      destPath: this.activeNode['path'],
      fileList: this.fileList, 
      action: this.action
    };
    this.fileviewService.moveFiles(requestPayload).subscribe(
      result => {
        
      },
      error => {

      }, () => {
        //
        this.activeNode = undefined;
        this.dialogRef.close('refresh');
      }
    );
  }
}
