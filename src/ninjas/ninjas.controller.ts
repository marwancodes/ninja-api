import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from '../belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}

  // GET /ninjas?weapon=bushido --> []
  @Get()
  getNinjas(@Query('weapon') weapon: 'shuriken' | 'katana') {
    // const service = new NinjasService();

    return this.ninjaService.getNinjas(weapon);
  }

  // GET /ninjas/:id --> {...}
  @Get(':id')
  getOneNinja(@Param('id') id: string) {
    try {
      return this.ninjaService.getNinja(id);
    } catch (err) {
      throw new NotFoundException();
      console.error(err);
    }
  }

  // POST /ninjas
  @Post()
  @UseGuards(BeltGuard)
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }

  // PUT /ninjas/:id --> {...}
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updtaeNinaDto: UpdateNinjaDto) {
    return this.ninjaService.updateNinja(id, updtaeNinaDto);
  }

  // DELETE /ninjas/:id
  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjaService.removeNinja(id);
  }
}
