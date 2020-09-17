import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMedia } from 'app/shared/model/media.model';

type EntityResponseType = HttpResponse<IMedia>;
type EntityArrayResponseType = HttpResponse<IMedia[]>;

@Injectable({ providedIn: 'root' })
export class MediaService {
  public resourceUrl = SERVER_API_URL + 'api/media';

  constructor(protected http: HttpClient) {}

  create(media: IMedia): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(media);
    return this.http
      .post<IMedia>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(media: IMedia): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(media);
    return this.http
      .put<IMedia>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMedia>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMedia[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(media: IMedia): IMedia {
    const copy: IMedia = Object.assign({}, media, {
      date: media.date && media.date.isValid() ? media.date.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((media: IMedia) => {
        media.date = media.date ? moment(media.date) : undefined;
      });
    }
    return res;
  }
}
