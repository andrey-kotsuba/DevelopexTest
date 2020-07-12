import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { filter, switchMap, takeUntil } from "rxjs/operators";
import { EditCommentComponent } from "../../components/edit-comment/edit-comment.component";
import { Comment } from "../../core/interfaces/comment";
import { Post } from "../../core/interfaces/post";
import { PostsService } from "../../core/services/posts.service";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post;
  comments: Comment[];
  private id: string;
  private unsubscribe$ = new Subject();
  
  constructor(
	private service: PostsService,
	private route: ActivatedRoute,
	private router: Router,
	private dialog: MatDialog,
  ) {
  }
  
  ngOnInit() {
	this.route.params.pipe(
	  takeUntil(this.unsubscribe$),
	  switchMap(params => {
		this.id = params.id;
		return this.service.getPost(this.id);
	  }),
	  switchMap(post => {
		this.post = post;
		return this.service.getPostsComments(this.id);
	  }),
	).subscribe(comments => {
	  this.comments = comments;
	});
  }
  
  deletePost() {
	this.service.deletePost(this.id).subscribe(() => {
	  this.router.navigate(['posts']);
	});
  }
  
  updatePost(post: Post) {
	this.service.updatePost(this.id, post).subscribe(() => {
	  this.post = post;
	})
  }
  
  deleteComment(id) {
	this.service.deleteComment(id).subscribe(() => {
	  this.comments = this.comments.filter(item => item.id != id);
	})
  }
  
  addComment(comment) {
	const newComment = Object.assign({postId: this.id, name: ''}, comment)
	this.service.addComment(newComment).subscribe(post => {
	  this.comments.push(post);
	})
  }
  
  editComment(comment: Comment) {
	this.dialog.open(EditCommentComponent, {
	  width: '90%',
	  maxWidth: '400px',
	  data: comment,
	}).afterClosed().pipe(
	  takeUntil(this.unsubscribe$),
	  filter(value => !!value),
	  switchMap(body => this.service.updateComment(comment.id, {body})),
	).subscribe(commentData => {
	  this.comments = this.comments.map(item => {
	    if (item.id === commentData.id) {
	      return commentData;
		} else {
	      return item;
		}
	  })
	})
  }
  
  ngOnDestroy() {
	this.unsubscribe$.next();
	this.unsubscribe$.complete();
  }
}
