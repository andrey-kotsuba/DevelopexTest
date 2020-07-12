import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { PostsComponent } from './pages/posts/posts.component';


const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostsComponent },
  { path: 'new-post', component: NewPostComponent },
  { path: 'post/:id', component: EditPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
