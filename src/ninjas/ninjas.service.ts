import { CreateNinjaDto } from './dto/create-ninja.dto';
import { Injectable } from '@nestjs/common';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 1, name: 'Marwan', weapon: 'shuriken' },
    { id: 2, name: 'Zayn', weapon: 'katana' },
    { id: 3, name: 'Adam', weapon: 'sai' },
    { id: 3, name: 'Roman', weapon: 'nunchucks' },
  ];

  getNinjas(weapon?: 'shuriken' | 'katana' | 'sai' | 'nunchucks') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }

    return this.ninjas;
  }

  getNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);

    if (!ninja) {
      throw new Error('Ninja not found');
    }

    return ninja;
  }

  createNinja(createNinja: CreateNinjaDto) {
    const newNinja = {
      ...createNinja,
      id: this.ninjas.length + 1,
    };

    this.ninjas.push(newNinja);

    return newNinja;
  }

  updateNinja(id: number, updateNinja: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        return {
          ...ninja,
          ...updateNinja,
        };
      }

      return ninja;
    });

    return this.getNinja(id);
  }

  removeNinja(id: number) {
    const toBeRemoved = this.getNinja(id);

    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);

    return toBeRemoved;
  }
}
