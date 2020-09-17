export interface IAuteur {
  id?: number;
  nom?: string;
  cleAuteur?: string;
  urlWeb?: string;
  urlFb?: string;
  urlInsta?: string;
  urlYt?: string;
  urlTwit?: string;
}

export class Auteur implements IAuteur {
  constructor(
    public id?: number,
    public nom?: string,
    public cleAuteur?: string,
    public urlWeb?: string,
    public urlFb?: string,
    public urlInsta?: string,
    public urlYt?: string,
    public urlTwit?: string
  ) {}
}
