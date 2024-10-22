import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ProductImage } from './product-image.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '236d10de-c3ca-493f-ae16-6767fdd2f870',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product Title',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: 0,
    description: 'Product Price',
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    example:
      'Minim incididunt pariatur esse deserunt veniam officia excepteur ullamco aliquip.',
    description: 'Product description',
    default: null,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    example: 't-shirt-teslo',
    description: 'Product Slug',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Product Stock',
    default: 0,
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    example: ['S', 'M', 'L'],
    description: 'Product Sizes',
    isArray: true,
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: 'unisex',
    description: 'Product Gender',
  })
  @Column('text')
  gender: string;

  @ApiProperty({
    example: ['t-shirt'],
    description: 'Product Tags',
    isArray: true,
    default: [],
  })
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty({
    example: ['string'],
    description: 'Product Images',
    isArray: true,
  })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }
}
