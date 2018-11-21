import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
    @ApiModelPropertyOptional({ example: 'John' })
    firstName?: string;

    @ApiModelPropertyOptional({ example: 'Doe' })
    lastName?: string;
}