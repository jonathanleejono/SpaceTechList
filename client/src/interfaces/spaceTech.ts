interface SpaceTechPublicApiResponse {
  idCode: string;
  title: string;
  description: string;
  topic: string;
  mediaUrl: string;
}

type SpaceTechRequest = SpaceTechPublicApiResponse;

interface SpaceTechSavedResponse extends SpaceTechPublicApiResponse {
  id: number;
  userId: string;
  createdDate: string;
  updatedDate: string;
}

export type {
  SpaceTechPublicApiResponse,
  SpaceTechRequest,
  SpaceTechSavedResponse,
};
