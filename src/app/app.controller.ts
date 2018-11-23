import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { App } from './app.entity';
import { NewApp } from './newApp.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';

@ApiUseTags('apps')
@Controller('apps')
@ApiBearerAuth()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.User, UserRole.Admin)
    @ApiResponse({
        status: 200,
        description: 'The list of all the apps.',
        type: App,
        isArray: true,
    })
    findAll(): Promise<App[]> {
        return this.appService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.User, UserRole.Admin)
    @ApiResponse({
        status: 200,
        description: 'Return one app',
        type: App,
        isArray: true,
    })
    @ApiResponse({
        status: 404,
        description: 'Not found.',
    })
    findById(@Param('id') id: number) {
        return this.appService.findById(id);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.Admin)
    @ApiResponse({
        status: 200,
        description: 'Delete the app',
    })
    deleteByName(@Param('id') id: number) {
        return this.appService.deleteApp (id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.Admin)
    @ApiResponse({
        status: 201,
        description: 'The app has been created.',
        type: App,
    })
    saveNew(@Body() newApp: NewApp): Promise<App> {
        return this.appService.createApp(newApp);
    }
}
