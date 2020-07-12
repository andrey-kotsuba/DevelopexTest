import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from "rxjs";
import { debounceTime, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { Post } from '../../core/interfaces/post';
import { PostsService } from '../../core/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  posts: Post[];
  search = new FormControl('');
  dataSource = new MatTableDataSource<Post>(this.posts);
  displayedColumns = ['id', 'title', 'comments'];
  private unsubscribe$ = new Subject();
  private initTableData$ = new Subject();
  
  constructor(private service: PostsService) {}
  
  ngOnInit() {
	this.service.getAllPosts().pipe(
	  switchMap(posts => {
		this.posts = posts;
		return this.service.getAllComments();
	  })
	).subscribe(comments => {
	  this.posts.map(post => post.comments = comments.filter(comment => comment.postId === post.id));
	  this.initTableData$.next(true);
	});

	this.initTableData$.pipe(
	  switchMap(() => this.search.valueChanges.pipe(startWith(''))),
	  takeUntil(this.unsubscribe$),
	  debounceTime(500),
	).subscribe(search => {
	  this.dataSource.data = this.searchPosts(search);
	  this.dataSource.paginator = this.paginator;
	})
  }
  
  searchPosts(searchVal: string): Post[] {
    const search = searchVal.toLocaleLowerCase();
    return this.posts.filter(post => {
      return post.title.toLocaleLowerCase().indexOf(search) >= 0
	  || post.comments.some(comment => comment.body.toLocaleLowerCase().indexOf(search) >= 0);
	})
  }
  
  ngOnDestroy() {
	this.unsubscribe$.next();
	this.unsubscribe$.complete();
  }
}
