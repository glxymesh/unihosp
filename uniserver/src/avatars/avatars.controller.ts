import { Body, Controller, Get, Headers, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/guards/accesstoken.guard';
import { AvatarsService } from './avatars.service';

@Controller('avatars')
export class AvatarsController {

  constructor(private avatarService: AvatarsService) { }


  @UseGuards(AccessTokenGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatars(@Headers('user') user: User, @Body() data, @UploadedFile() file: { fieldname: string, originalname: string, encoding: string, mimetype: string, buffer: Buffer }) {
    console.log(data);
    const response = await this.avatarService.uploadAvatar(file.originalname, user.id, file.buffer, file.mimetype);
    return response;
  }

  @Get(":id/:name")
  async getAvatar(@Param('id') id: string, @Param('name') name: string, @Res() response: Response) {
    const resp = await this.avatarService.getAvatarObject(id);
    if (name !== resp.name) return {
      statusCode: 404,
      message: 'Not Found'
    }
    response.setHeader('type', resp.type);
    response.write(resp.data);
    response.end();
  }

}
