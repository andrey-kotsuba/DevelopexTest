import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderIsVisible$ = new BehaviorSubject(false);

  hide(): void {
    this.loaderIsVisible$.next(false);
  }

  show(): void {
    this.loaderIsVisible$.next(true);
  }
}
