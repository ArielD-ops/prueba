// Note Entity: Represents a note with title, content, file status, and related tags.
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
// Marks the class as an entity for TypeORM, generating a “note” table.
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  isArchived: boolean;

  @ManyToMany(() => Tag, { cascade: true })
  // Many-to-many relationship with Tag; “cascade: true” creates/updates tags next to the note.
  @JoinTable()
  // Generates the intermediate table to link notes and tags.
  tags: Tag[];
}