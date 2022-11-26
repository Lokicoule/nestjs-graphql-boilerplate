import { Company } from './company.entity';

describe('CompanyBuilder', () => {
  it('successfully set own fields', () => {
    const company: Company = new Company.Builder()
      .setName('name')
      .setVatNumber('vatNumber')
      .setRcsNumber('rcsNumber')
      .setSiret('siret')
      .setSiren('siren')
      .build();
    expect(company.name).toEqual('name');
    expect(company.vatNumber).toEqual('vatNumber');
    expect(company.rcsNumber).toEqual('rcsNumber');
    expect(company.siret).toEqual('siret');
    expect(company.siren).toEqual('siren');
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const company: Company = new Company.Builder()
      .setId(1)
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(company._id).toBeDefined();
    expect(company.createdAt).toEqual(sharedDate);
    expect(company.updatedAt).toEqual(sharedDate);
  });
});
