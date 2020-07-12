import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from "@angular/material/table";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { PostsService } from './core/services/posts.service';
import { PostsComponent } from './pages/posts/posts.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { PostFormComponent } from './shared/post-form/post-form.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { EditCommentComponent } from './components/edit-comment/edit-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    PostsComponent,
    NewPostComponent,
    EditPostComponent,
    PostFormComponent,
    CommentFormComponent,
    EditCommentComponent,
  ],
  imports: [
	BrowserModule,
	AppRoutingModule,
	BrowserAnimationsModule,
	HttpClientModule,
	MatProgressBarModule,
	MatTableModule,
	MatPaginatorModule,
	MatButtonModule,
	MatInputModule,
	ReactiveFormsModule,
	FlexModule,
	MatCardModule,
	MatDialogModule,
  ],
  providers: [
    PostsService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  entryComponents: [EditCommentComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
