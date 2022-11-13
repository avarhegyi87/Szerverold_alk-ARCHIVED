import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, dematerialize, materialize, mergeMap, Observable, of, throwError } from 'rxjs';

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    firstName: 'System',
    lastName: 'Admin',
  },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
        switch (true) {
            case url.endsWith('/users/authenticate') && method == 'POST':
                return authenticate();

            case url.endsWith('/users') && method === 'GET':
                return getUsers();
        
            default:
                return next.handle(request);
        }
    }

    function authenticate() {
        const {username, password} = body;
        const user = users.find(x => x.username === username && x.password === password);
        if (!user) return error('Username or password is incorrect');
        return ok({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: 'fake-jwt-token'
        })
    }

    function getUsers() {
        if (!isLoggedIn()) return unauthorized();
        return ok(users);
    }

    // helper functions

    function ok(body?: any) {
        return of(new HttpResponse({status: 200, body}))
    }

    function error(message: string | undefined) {
        return throwError(() => new Error(message));
    }

    function unauthorized() {
        return throwError(() => new Error('Unauthorized'));
    }

    function isLoggedIn() {
        return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}

export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
}