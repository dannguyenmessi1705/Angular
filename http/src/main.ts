import { bootstrapApplication } from "@angular/platform-browser";

import { AppComponent } from "./app/app.component";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { authInterceptor } from "./app/interceptors/Auth.interceptors";
import { AuthInterceptor } from "./app/interceptors/auth.interceptors.class";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor]), // Sử dụng interceptor từ function
      withInterceptorsFromDi() // Sử dụng interceptor từ DI (class AuthInterceptor)
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }, // Sử dụng interceptor từ DI (class AuthInterceptor)
  ],
}).catch((err) => console.error(err));
