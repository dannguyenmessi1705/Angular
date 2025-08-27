import {
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from "@angular/common/http";
import { tap } from "rxjs";

export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  console.log("Auth Interceptor");
  const req = request.clone({
    headers: request.headers.set("Authorization", "Bearer YOUR_TOKEN"),
  });
  console.log(req);
  return next(req).pipe(
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
