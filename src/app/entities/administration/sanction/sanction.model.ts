import { ISanctionAgent } from 'app/entities/administration/sanction-agent/sanction-agent.model';

export interface ISanction {
  id?: number;
  version?: number | null;
  codeSanction?: string | null;
  libelleSanction?: string | null;
  sanctionAgents?: ISanctionAgent[] | null;
}

export class Sanction implements ISanction {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeSanction?: string | null,
    public libelleSanction?: string | null,
    public sanctionAgents?: ISanctionAgent[] | null
  ) {}
}

export function getSanctionIdentifier(sanction: ISanction): number | undefined {
  return sanction.id;
}
