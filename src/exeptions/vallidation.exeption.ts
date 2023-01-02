import { HttpException, HttpStatus } from '@nestjs/common';

export class VallidationExeption extends HttpException {
  messages = [];

  constructor(response: string[]) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
