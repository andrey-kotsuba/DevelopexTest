import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Post } from "../../core/interfaces/post";
import { PostsService } from "../../core/services/posts.service";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {

  constructor(
    private service: PostsService,
    private router: Router,
    ) { }

  savePost(post: Post) {
    this.service.savePost(post).subscribe(() => {
      this.router.navigate(['posts']);
    })
  }
}
