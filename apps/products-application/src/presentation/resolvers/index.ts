import { productsResolvers } from './products';
import { productSettingsResolvers } from './product-settings';
import { settingsResolvers } from './settings';
import { usersResolvers } from './users';

export const resolvers = [
  ...productsResolvers,
  ...productSettingsResolvers,
  ...settingsResolvers,
  ...usersResolvers,
];
