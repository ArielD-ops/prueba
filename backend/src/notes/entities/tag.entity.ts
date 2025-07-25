// Tag Entity: defines each tag assignable to a note, with its identifier and name.
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
// Marks the class as an entity for TypeORM, generating a “tag” table.
export class Tag {
  @PrimaryGeneratedColumn()
  // Unique identifier for each tag.
  id: number;

  @Column()
  // Name of the tag, which can be used to categorize notes.
  name: string;
}