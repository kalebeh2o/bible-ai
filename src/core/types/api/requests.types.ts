export interface RequestOptions extends RequestInit {
  needAuth?: boolean;
}

export interface GetVersiclesParams {
  version: string;
  chapter: string;
  book: string;
}

export interface GetExplanationParams {
  verseText: string;
}
