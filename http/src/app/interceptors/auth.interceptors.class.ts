import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log("Auth Interceptor Class");
    const req = request.clone({
      headers: request.headers.set("Signature", "Signature YOUR_TOKEN"),
    });
    console.log(req);
    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            console.log("Response Interceptor");
            console.log(event.status);
            console.log(event.body);
          }
        },
      })
    );
  }
}
