
export type requestDetailsDataProps = {
  status: 'Success' | 'Failed' | string,
  stagingPath: string,
  prodPath: string;
  message?: string
}

export type requestHeadInfoProps = {
  lastUpdatedby: string,
  fileName: string,
  createdby: string,
  requestId: string,
  lastUpdateDate: number,
  creatorId: string,
  successCount: number,
  templateId: string,
  creationDate: number,
  message: string,
  failureCount: number,
  status: "SUBMITTED" | "REQUESTED" | "APPROVED"
}

type resultProps = {
  header: requestHeadInfoProps[],
  lines: requestDetailsDataProps[]
}

export type responseProps = {
  status: string,
  description: string,
  result: resultProps
}