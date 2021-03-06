import { IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class NewApp {
  @ApiModelProperty({ required: true })
  @IsString()
  @MinLength(1)
  @Type(() => String)
  name: string;

  @ApiModelProperty({ required: true })
  @IsString()
  @MinLength(1)
  @Type(() => String)
  description: string;

  @ApiModelProperty({ required: true })
  @IsString()
  @MinLength(1)
  @Type(() => String)
  technologies: string;

  @ApiModelProperty({ required: true })
  @IsString()
  @MinLength(1)
  @Type(() => String)
  team: string;
}
