import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

class AuthorizationDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    request.http.headers.set('authorization', context.authorization);
  }
}

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        server: {
          context: ({ req }) => {
            return {
              authorization: req.headers.authorization,
            };
          },
        },
        gateway: {
          buildService: ({ name, url }) => {
            return new AuthorizationDataSource({ url });
          },
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'users',
                url: configService.get('USERS_APPLICATION_HTTP_URL'),
              },
              /* {
                name: 'customers',
                url: configService.get('CUSTOMERS_APPLICATION_HTTP_URL'),
              }, */
              /*   {
                name: 'orders',
                url: configService.get('ORDERS_APPLICATION_HTTP_URL'),
              }, */
              {
                name: 'products',
                url: configService.get('PRODUCTS_APPLICATION_HTTP_URL'),
              },
            ],
          }),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ApolloGraphQLProviderModule {}
