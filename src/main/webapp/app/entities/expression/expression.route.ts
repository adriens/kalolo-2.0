import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IExpression, Expression } from 'app/shared/model/expression.model';
import { ExpressionService } from './expression.service';
import { ExpressionComponent } from './expression.component';
import { ExpressionDetailComponent } from './expression-detail.component';
import { ExpressionUpdateComponent } from './expression-update.component';

@Injectable({ providedIn: 'root' })
export class ExpressionResolve implements Resolve<IExpression> {
  constructor(private service: ExpressionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExpression> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((expression: HttpResponse<Expression>) => {
          if (expression.body) {
            return of(expression.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Expression());
  }
}

export const expressionRoute: Routes = [
  {
    path: '',
    component: ExpressionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kaloloApp.expression.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ExpressionDetailComponent,
    resolve: {
      expression: ExpressionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kaloloApp.expression.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ExpressionUpdateComponent,
    resolve: {
      expression: ExpressionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kaloloApp.expression.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ExpressionUpdateComponent,
    resolve: {
      expression: ExpressionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kaloloApp.expression.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
