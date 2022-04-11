export type historyDataProps = {
  requesID: string;
  templateName: string;
  userName: string;
  createdAt: string;
  status: string;
  updatedURLs: string;
  failedURLs: string;
  approvedBy?:string;
  index?:number;
  lastIndexValue?:number;
}
export type res = {
  status: string;
  data: historyDataProps[];
}


