export type ScriptData = {
  _id: string;
  title: string;
  content: string;
  description: string;
  type: string;
  imageUrl: string;
  createdAt: string;
};
export type ScriptList = {
  data: ScriptData[];
  page: number;
  totalPages: number;
  totalCount: number;
};
