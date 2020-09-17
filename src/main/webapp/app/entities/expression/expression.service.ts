import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExpression } from 'app/shared/model/expression.model';

type EntityResponseType = HttpResponse<IExpression>;
type EntityArrayResponseType = HttpResponse<IExpression[]>;

@Injectable({ providedIn: 'root' })
export class ExpressionService {
  public resourceUrl = SERVER_API_URL + 'api/expressions';

  constructor(protected http: HttpClient) {}

  create(expression: IExpression): Observable<EntityResponseType> {
    return this.http.post<IExpression>(this.resourceUrl, expression, { observe: 'response' });
  }

  update(expression: IExpression): Observable<EntityResponseType> {
    return this.http.put<IExpression>(this.resourceUrl, expression, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExpression>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExpression[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
