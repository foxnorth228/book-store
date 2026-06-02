export enum Region {
  EUW = "EUW",
  EUNE = "EUNE",
  NA = "NA",
  KR = "KR",
}

export enum Provider {
  GOOGLE = "google",
  DISCORD = "discord",
  RIOT = "riot",
}

export type ConnectedAccount = {
  provider: Provider;
  providerId: string;
};

export type RiotAccount = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export interface Profile {
  id: string;
  email: string;
  passwordHash: string;
  connections?: ConnectedAccount[];
  riotAccount?: RiotAccount;
  region: Region;
  createdAt: string;
  updatedAt: string;
}
