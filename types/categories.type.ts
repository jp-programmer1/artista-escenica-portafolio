export type Items = {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink: string
} & Category;

export type Category = {
  id: string;
  name: string;
  mimeType: string;
  items: Items[]
};

export type MediaType = {
  id: string;
  name: string;
  mimeType: string;
};
