import { UserBuilder } from '@nestjs-cognito/auth';
import { Test, TestingModule } from '@nestjs/testing';
import { TestScheduler } from 'rxjs/testing';
import { UserDto } from '../../../users/facade/dtos/user.dto';
import { SettingsService } from '../../business/services/settings.service';
import { SettingCriteriaInput } from '../dtos/inputs/setting-criteria.input';
import { SettingInput } from '../dtos/inputs/setting.input';
import { SettingsManagementFacade } from './settings-management.facade';

describe('SettingsManagementFacade', () => {
  let facade: SettingsManagementFacade;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SettingsService,
          useValue: {
            findSettings: jest.fn(),
            findSetting: jest.fn(),
            updateSetting: jest.fn(),
          },
        },
        SettingsManagementFacade,
      ],
    }).compile();

    facade = module.get<SettingsManagementFacade>(SettingsManagementFacade);
  });

  it('should be defined', () => {
    expect(facade).toBeDefined();
  });

  describe('getAuthorId', () => {
    it('should return username when user is User', () => {
      const user = new UserBuilder().setUsername('username').build();
      expect(facade['getAuthorId'](user)).toEqual(user.username);
    });

    it('should return id when user is UserDto', () => {
      const user = new UserDto({
        id: 'id',
      });
      expect(facade['getAuthorId'](user)).toEqual(user.id);
    });
  });
});
