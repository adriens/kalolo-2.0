import { IExpression } from 'app/shared/model/expression.model';

export interface ITag {
  id?: number;
  libelle?: string;
  definition?: string;
  exps?: IExpression[];
}

export class Tag implements ITag {
  constructor(public id?: number, public libelle?: string, public definition?: string, public exps?: IExpression[]) {}
}
