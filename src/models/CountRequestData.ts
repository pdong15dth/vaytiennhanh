
export class CountRequest {
  ipAddress: string;
  time: string;

  constructor(data: any) {
    if (data) {
      this.ipAddress = data?.ipAddress;
      this.time = data?.time;
    }
  }
}
