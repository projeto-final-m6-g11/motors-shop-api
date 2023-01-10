export interface IAnnouncement {
  announcementType: string;
  title: string;
  year: number;
  km: number;
  price: number;
  description: string;
  vehicleType: string;
  published: boolean;
  images: string[];
}

export interface IAnnouncementWithUser extends IAnnouncement {
  userId: string;
}
export interface IannoumentsRequest{
  announcementType: string   | undefined;
  title           : string   | undefined;
  year            : number   | undefined;
  km              : number   | undefined;
  price           : number   | undefined;
  description     : string   | undefined;
  vehicleType     : string   | undefined;
  published       : boolean  | undefined;
  images          : string[] | undefined;
}
