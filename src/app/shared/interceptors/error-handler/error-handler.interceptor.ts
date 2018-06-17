import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import {Injectable} from '@angular/core';
import {TechnicalErrorDialogComponent} from '../../components/technical-error-dialog/technical-error-dialog.component';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private modalService: BsModalService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError(
        (error): Observable<any> => {
          this.showErrorDialog(error.message);

          return Observable.create(observer => {
            observer.complete();
          });
        }
      )
    );
  }

  showErrorDialog(message) {
    const modalRef = this.modalService.show(TechnicalErrorDialogComponent);
    /*
    * to be honest, I don't like the way, how we can pass data to the component inside modal.
    * by documentation we also can pass initialState property to the .show funtion and it will be merged into controller instance.
    * but this way is not much better and for some reason don't work out of the box for me
    * */
    modalRef.content.body = message;
  }
}
