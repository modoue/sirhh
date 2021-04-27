export interface IRappelConges {
  id?: number;
  version?: number | null;
}

export class RappelConges implements IRappelConges {
  constructor(public id?: number, public version?: number | null) {}
}

export function getRappelCongesIdentifier(rappelConges: IRappelConges): number | undefined {
  return rappelConges.id;
}
