import { customersResolvers } from './customers';
import { customerSettingsResolvers } from './customer-settings';
import { settingsResolvers } from './settings';
import { usersResolvers } from './users';

export const resolvers = [
  ...customersResolvers,
  ...customerSettingsResolvers,
  ...settingsResolvers,
  ...usersResolvers,
];
