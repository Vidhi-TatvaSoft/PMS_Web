import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-confirm-dialog-component',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './confirm-dialog-component.html',
  styleUrl: './confirm-dialog-component.css',
})
export class ConfirmDialogComponent {
  safeMessage: SafeHtml;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
    this.safeMessage = this.sanitizer.bypassSecurityTrustHtml(this.data.message);
  }

  onYes() {
    this.dialogRef.close(true);
  }

  onNo() {
    this.dialogRef.close(false);
  }
}
