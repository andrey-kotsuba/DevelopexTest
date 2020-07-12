import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Comment } from "../../core/interfaces/comment";

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  comment = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<EditCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Comment
    ) { }

  ngOnInit() {
    this.comment.patchValue(this.data.body)
  }
}
