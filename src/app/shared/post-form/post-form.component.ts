import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";
import { Post } from "../../core/interfaces/post";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {
  @Input('post') set patchPost(post: Post) {
    if (post) {
      this.form.patchValue(post);
      this.post = post;
    }
  }
  @Output() savePost = new EventEmitter<Post>();

  form = this.fb.group({
    body: this.fb.control('', Validators.required),
    id: this.fb.control(null),
    title: this.fb.control('', Validators.required),
    userId: this.fb.control(1),
  })
  formIsChanged = false;
  private post: Post;
  private unsubscribe$ = new Subject();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(500),
    ).subscribe(form => {
      this.formIsChanged = JSON.stringify(form) !== JSON.stringify(this.post);
    })
  }
  
  save() {
    this.savePost.emit(this.form.value)
  }
  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
