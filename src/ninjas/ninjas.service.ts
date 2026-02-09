import { CreateNinjaDto } from './dto/create-ninja.dto';
import { Injectable } from '@nestjs/common';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: '1', name: 'Marwan', weapon: 'shuriken' },
    { id: '2', name: 'Zayn', weapon: 'katana' },
    { id: '3', name: 'Adam', weapon: 'shuriken' },
    { id: '4', name: 'Roman', weapon: 'katana' },
  ];

  getNinjas(weapon?: 'shuriken' | 'katana') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }

    return this.ninjas;
  }

  getNinja(id: string) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);

    if (!ninja) {
      throw new Error('Ninja not found');
    }

    return ninja;
  }

  createNinja(createNinja: CreateNinjaDto) {
    const newNinja = {
      id: uuid(),
      ...createNinja,
    };

    this.ninjas.push(newNinja);

    return newNinja;
  }

  updateNinja(id: string, updateNinja: UpdateNinjaDto) {
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

  removeNinja(id: string) {
    const toBeRemoved = this.getNinja(id);

    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);

    return toBeRemoved;
  }
}
