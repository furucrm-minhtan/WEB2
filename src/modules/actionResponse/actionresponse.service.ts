import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionResponseService {
  isSuccess: boolean;
  message: string;
  data: any;

  responseApi(success: boolean, data: any, message: string) {
    this.isSuccess = success;
    this.message = message;
    this.data = data;

    return this;
  }
}
