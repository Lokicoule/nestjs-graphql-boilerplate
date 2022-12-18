/* import { Injectable } from '@nestjs/common';
import { PostDto } from './facade/dtos/product.dto';

@Injectable()
export class PostsService {
  private posts: PostDto[] = [
    {
      authorId: '4273b4f9-29e2-4acc-91f4-8ca51bdf0fe5',
      id: 1,
      title: 'Lorem Ipsum',
    },
    { authorId: '4273b4f9-29e2-4acc-91f4-8ca51bdf0fe5', id: 2, title: 'Foo' },
    { authorId: 'id_1', id: 3, title: 'Bar' },
    { authorId: 'id_2', id: 4, title: 'Hello World' },
  ];

  findAllByAuthorId(authorId: string): PostDto[] {
    return this.posts.filter((post) => post.authorId === authorId);
  }

  findOne(postId: number): PostDto {
    return this.posts.find((post) => post.id === postId);
  }

  findAll(): PostDto[] {
    return this.posts;
  }
}
 */
