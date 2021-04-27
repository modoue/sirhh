import { ISyndicat } from 'app/entities/administration/syndicat/syndicat.model';

export interface ICentraleSyndicale {
  id?: number;
  version?: number | null;
  codeCentrale?: string | null;
  libelleCentrale?: string | null;
  syndicats?: ISyndicat[] | null;
}

export class CentraleSyndicale implements ICentraleSyndicale {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeCentrale?: string | null,
    public libelleCentrale?: string | null,
    public syndicats?: ISyndicat[] | null
  ) {}
}

export function getCentraleSyndicaleIdentifier(centraleSyndicale: ICentraleSyndicale): number | undefined {
  return centraleSyndicale.id;
}
