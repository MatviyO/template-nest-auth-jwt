import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IPost, IPostCreationAttr } from '@/modules/posts/IPost';
import { User } from '@/modules/users/user.model';


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
  @Column( {
    type: DataType.STRING, allowNull: false
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Column( {
    type: DataType.STRING,
  })
  content: string;

  @Column( {
    type: DataType.STRING,
  })
  image: string;

  @ForeignKey(() => User)
  @Column( {
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
