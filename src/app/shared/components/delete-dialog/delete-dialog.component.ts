import {Component, Inject} from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core'; 

/**
 * @title 
 */

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './delete-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, TranslateModule],
})
export class DeleteDialogComponent {
  itemType: 'users' | 'profiles' | 'categories';

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: any; type: 'users' | 'profiles' | 'categories' }
  ) {
    this.itemType = data.type;
  }

  confirmDelete(): void {
    this.dialogRef.close(true);
  }
  
  onNoClick(): void {
    this.dialogRef.close(false); 
  }
}
