import { Company } from '../../../domain/entities/company/company.entity';
import { CompanyDto } from '../../dtos/company/company.dto';
import { CompanyDtoBuilder } from '../../dtos/company/company.dto.builder';
import { CompanyInput } from '../../dtos/company/company.input';
import { CompanyMapper } from './company.mapper';

describe('CompanyMapper', () => {
  describe('mapToDto', () => {
    it('successfully maps an entity to a DTO', () => {
      const companyEntity = new Company.Builder()
        .setName('Company')
        .setVatNumber('vatnumber')
        .setRcsNumber('rcsnumber')
        .setSiret('siret')
        .setSiren('siren')
        .build();

      const companyDto = CompanyMapper.mapToDto(companyEntity);

      expect(companyDto).toBeInstanceOf(CompanyDto);
      expect(companyDto.name).toEqual('Company');
      expect(companyDto.vatNumber).toEqual('vatnumber');
      expect(companyDto.rcsNumber).toEqual('rcsnumber');
      expect(companyDto.siret).toEqual('siret');
      expect(companyDto.siren).toEqual('siren');
    });

    it('successfully maps an entity to a DTO with inherited fields and invalid id', () => {
      const sharedDate = new Date();
      const companyEntity = new Company.Builder()
        .setId('id')
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const companyDto = CompanyMapper.mapToDto(companyEntity);
      expect(companyDto.id).toEqual(companyEntity._id);
      expect(companyDto.id).toBeUndefined();
      expect(companyDto.createdAt).toEqual(companyEntity.createdAt);
      expect(companyDto.updatedAt).toEqual(companyEntity.updatedAt);
    });

    it('successfully maps an entity to a DTO with inherited fields and valid id', () => {
      const sharedDate = new Date();
      const companyEntity = new Company.Builder()
        .setId(1)
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const companyDto = CompanyMapper.mapToDto(companyEntity);
      expect(JSON.stringify(companyDto.id)).toEqual(
        JSON.stringify(companyEntity._id),
      );
      expect(companyDto.createdAt).toEqual(companyEntity.createdAt);
      expect(companyDto.updatedAt).toEqual(companyEntity.updatedAt);
    });
  });

  describe('mapToEntity', () => {
    it('successfully maps a DTO to an entity', () => {
      const companyDto: CompanyDto = new CompanyDtoBuilder()
        .setName('Company')
        .setVatNumber('vatnumber')
        .setRcsNumber('rcsnumber')
        .setSiret('siret')
        .setSiren('siren')
        .build();

      const companyEntity = CompanyMapper.mapToEntity(companyDto);

      expect(companyEntity).toBeInstanceOf(Company);
      expect(companyEntity.name).toEqual('Company');
      expect(companyEntity.vatNumber).toEqual('vatnumber');
      expect(companyEntity.rcsNumber).toEqual('rcsnumber');
      expect(companyEntity.siret).toEqual('siret');
      expect(companyEntity.siren).toEqual('siren');
    });

    it('successfully maps an Input to an entity', () => {
      const companyInput: CompanyInput = {
        name: 'Company',
        vatNumber: 'vatnumber',
        rcsNumber: 'rcsnumber',
        siret: 'siret',
        siren: 'siren',
      } as CompanyInput;

      const companyEntity = CompanyMapper.mapToEntity(companyInput);

      expect(companyEntity).toBeInstanceOf(Company);
      expect(companyEntity.name).toEqual('Company');
      expect(companyEntity.vatNumber).toEqual('vatnumber');
      expect(companyEntity.rcsNumber).toEqual('rcsnumber');
      expect(companyEntity.siret).toEqual('siret');
      expect(companyEntity.siren).toEqual('siren');
    });
  });
});
