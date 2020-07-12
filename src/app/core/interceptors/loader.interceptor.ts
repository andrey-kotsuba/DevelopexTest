import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    this.loader.show();
    return next.handle(request).pipe(
      delay(500),
      finalize(() => this.loader.hide())
    );
  }
}
