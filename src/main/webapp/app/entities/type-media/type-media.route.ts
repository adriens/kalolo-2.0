import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITypeMedia, TypeMedia } from 'app/shared/model/type-media.model';
import { TypeMediaService } from './type-media.service';
import { TypeMediaComponent } from './type-media.component';
import { TypeMediaDetailComponent } from './type-media-detail.component';
import { TypeMediaUpdateComponent } from './type-media-update.component';

@Injectable({ providedIn: 'root' })
export class TypeMediaResolve implements Resolve<ITypeMedia> {
  constructor(private service: TypeMediaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeMedia> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((typeMedia: HttpResponse<TypeMedia>) => {
          if (typeMedia.body) {
            return of(typeMedia.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TypeMedia());
  }
}

export const typeMediaRoute: Routes = [
  {
    path: '',
    component: TypeMediaComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'kaloloApp.typeMedia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TypeMediaDetailComponent,
    resolve: {
      typeMedia: TypeMediaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kaloloApp.typeMedia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TypeMediaUpdateComponent,
    resolve: {
      typeMedia: TypeMediaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kaloloApp.typeMedia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TypeMediaUpdateComponent,
    resolve: {
      typeMedia: TypeMediaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kaloloApp.typeMedia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
