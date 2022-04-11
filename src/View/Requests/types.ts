export type apiSuggestionProps = {
  status: string,
  description: string,
  result: any;
}

export type suggestionResultProps = {
  users: { userId: string, username: string }[],
  templates: { templateId: string, templateName: string }[],
  status: ["REQUESTED", "SUBMITTED", "APPROVED"]
}

export type res = {
  status: string,
  description: string,
  result: requestsDataProps[];
}


export type requestsDataProps = {
  id: number
  title: string
  userId: number
}