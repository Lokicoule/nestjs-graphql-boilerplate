import { Test, TestingModule } from '@nestjs/testing';
import { PostDto } from './facade/dtos/post.dto';
import { PostsService } from './posts.service';
import { UsersResolver } from './users.resolver';

const postsServiceMock = {
  findAllByAuthorId: jest.fn((authorId: number): PostDto[] => {
    return [{ authorId, id: 1, title: 'Post Mock' }];
  }),
};

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        { provide: PostsService, useValue: postsServiceMock },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should resolve posts of a user', () => {
    const result = resolver.posts({ id: 1 });
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          authorId: 1,
        }),
      ]),
    );
  });
});
