import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3)
  name!: string;

  @IsEnum(['shuriken', 'katana'], { message: 'Use correct weapon' })
  weapon!: 'shuriken' | 'katana';
}
