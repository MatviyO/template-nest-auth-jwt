import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { Transform, TransformFnParams } from '@nestjs/class-transformer';
import { IPost, IPostCreationAttr } from '@/modules/posts/IPost';


@Table({tableName: 'Posts'})
export class Post extends Model<IPost, IPostCreationAttr>{
  @ApiProperty()
  @Column( {
    type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Column( {
    type: DataType.STRING, unique: true, allowNull: false
  })
  name: string;
}
