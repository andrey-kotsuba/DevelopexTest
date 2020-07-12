import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Comment } from '../interfaces/comment';
import { Post } from '../interfaces/post';

@Injectable()
export class PostsService {
  private readonly apiUrl: string;
  
  constructor(private http: HttpClient) {
	this.apiUrl = environment.apiUrl;
  }
  
  getAllPosts(): Observable<Post[]> {
	const url = `${ this.apiUrl }/posts`;
	return this.http.get<Post[]>(url);
  }
  
  getPost(id): Observable<Post> {
	const url = `${ this.apiUrl }/posts/${ id }`;
	return this.http.get<Post>(url);
  }
  
  getAllComments(): Observable<Comment[]> {
	const url = `${ this.apiUrl }/comments`;
	return this.http.get<Comment[]>(url);
  }
  
  getPostsComments(id): Observable<Comment[]> {
	const url = `${ this.apiUrl }/comments?postId=${ id }`;
	return this.http.get<Comment[]>(url);
  }
  
  savePost(post: Post): Observable<Post> {
	const url = `${ this.apiUrl }/posts`;
	return this.http.post<Post>(url, post);
  }
  
  addComment(comment: Comment): Observable<Comment> {
	const url = `${ this.apiUrl }/comments`;
	return this.http.post<Comment>(url, comment);
  }
  
  updatePost(id, post: Post): Observable<Post> {
	const url = `${ this.apiUrl }/posts/${ id }`;
	return this.http.put<Post>(url, post);
  }
  
  updateComment(id, comment: { body: string }): Observable<Comment> {
	const url = `${ this.apiUrl }/comments/${ id }`;
	return this.http.patch<Comment>(url, comment);
  }
  
  deletePost(id) {
	const url = `${ this.apiUrl }/posts/${ id }`;
	return this.http.delete(url);
  }
  
  deleteComment(id): Observable<Comment> {
	const url = `${ this.apiUrl }/comments/${ id }`;
	return this.http.delete<Comment>(url);
  }
}
