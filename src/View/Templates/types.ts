export type templateListProps = {
  albumId: number
  id: number
  thumbnailUrl: string
  title: string
  url: string
}

export type templateResponse = {
  status: string;
  description: string;
  result: {
    ampPagesTemplates: templateListProps[];
  }
}
