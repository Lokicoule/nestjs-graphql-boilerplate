import { CompanyDto } from './company.dto';
import { CompanyDtoBuilder } from './company.dto.builder';

describe('CompanyOutputBuilder', () => {
  it('successfully set own fields', () => {
    const address: CompanyDto = new CompanyDtoBuilder()
      .setName('Company')
      .setVatNumber('vatnumber')
      .setRcsNumber('rcsnumber')
      .setSiret('siret')
      .setSiren('siren')
      .build();

    expect(address.name).toEqual('Company');
    expect(address.vatNumber).toEqual('vatnumber');
    expect(address.rcsNumber).toEqual('rcsnumber');
    expect(address.siret).toEqual('siret');
    expect(address.siren).toEqual('siren');
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const address: CompanyDto = new CompanyDtoBuilder()
      .setId('id')
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(address.id).toEqual('id');
    expect(address.createdAt).toEqual(sharedDate);
    expect(address.updatedAt).toEqual(sharedDate);
  });
});
