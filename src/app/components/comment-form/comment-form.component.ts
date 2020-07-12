import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Comment } from "../../core/interfaces/comment";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {
  @Input() comments: Comment[];
  @Output() deleteComment = new EventEmitter<number>();
  @Output() editComment = new EventEmitter<Comment>();
  @Output() addComment = new EventEmitter<{ body: string; email: string; }>();
  form = this.fb.group({
	body: this.fb.control('', Validators.required),
	email: this.fb.control('', [Validators.required, Validators.email]),
  })
  
  constructor(private fb: FormBuilder) {}
  
  addNewComment() {
    this.addComment.emit(this.form.value);
    this.form.reset();
  }
}
