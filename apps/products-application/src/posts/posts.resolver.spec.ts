import { Test, TestingModule } from '@nestjs/testing';
import { PostDto } from './facade/dtos/post.dto';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

const mockPost: PostDto = {
  authorId: 1,
  id: 1,
  title: 'Mock Post',
};

const postsServiceMock = {
  findOne: jest.fn((id: number): PostDto => mockPost),
  findAll: jest.fn((): PostDto[] => [mockPost]),
};

describe('PostsResolver', () => {
  let resolver: PostsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsResolver,
        { provide: PostsService, useValue: postsServiceMock },
      ],
    }).compile();

    resolver = module.get<PostsResolver>(PostsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query for a single post', () => {
    const result = resolver.post(1);
    expect(result.id).toEqual(1);
  });

  it('should query all posts', () => {
    const result = resolver.posts();
    expect(Array.isArray(result)).toEqual(true);
  });

  it('should resolve the user of a post', () => {
    const result = resolver.user(mockPost);
    expect(result).toEqual(
      expect.objectContaining({
        __typename: 'User',
        id: mockPost.authorId,
      }),
    );
  });
});
