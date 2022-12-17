import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SettingsService } from '../settings/business/services/settings.service';
import { SettingDto } from '../settings/facade/dtos/setting.dto';
import { PostDto } from './facade/dtos/product.dto';
import { UserDto } from './facade/dtos/user.dto';
import { PostsService } from './posts.service';

@Resolver((of) => UserDto)
export class UsersResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly settingsService: SettingsService,
  ) {}

  @ResolveField((of) => [PostDto])
  public posts(@Parent() user: UserDto): PostDto[] {
    return this.postsService.findAllByAuthorId(user.id);
  }

  @ResolveField((of) => [SettingDto])
  public settings(@Parent() user: UserDto): PostDto[] {
    return this.postsService.findAllByAuthorId(user.id);
  }
}
