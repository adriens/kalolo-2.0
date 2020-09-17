import { ITag } from 'app/shared/model/tag.model';

export interface IExpression {
  id?: number;
  text?: string;
  points?: number;
  tags?: ITag[];
}

export class Expression implements IExpression {
  constructor(public id?: number, public text?: string, public points?: number, public tags?: ITag[]) {}
}
