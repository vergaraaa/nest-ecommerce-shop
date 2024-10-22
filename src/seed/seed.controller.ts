import { ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';
import { Controller, Get } from '@nestjs/common';
// import { Auth } from 'src/auth/decorators/auth.decorator';
// import { ValidRoles } from 'src/auth/interfaces/valid-roles.enum';

@Controller('seed')
@ApiTags('Seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  // @Auth(ValidRoles.admin)
  executeSeed() {
    return this.seedService.runSeed();
  }
}
