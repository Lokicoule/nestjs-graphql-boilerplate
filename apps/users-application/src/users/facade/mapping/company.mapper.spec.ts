import { Company } from '../../domain/entities/company/company.entity';
import { CompanyDto } from '../dtos/company.dto';
import { CompanyInput } from '../dtos/inputs/company.input';
import { CompanyMapper } from './company.mapper';

describe('CompanyMapper', () => {
  describe('toEntity', () => {
    it('should return company', () => {
      const companyInput: CompanyInput = {
        id: 'id',
        name: 'name',
        rcsNumber: 'rcsNumber',
        vatNumber: 'vatNumber',
        sirenNumber: 'sirenNumber',
        siretNumber: 'siretNumber',
      };

      const company: Company = CompanyMapper.toEntity(companyInput);

      expect(company).toEqual({
        _id: 'id',
        name: 'name',
        rcsNumber: 'rcsNumber',
        vatNumber: 'vatNumber',
        sirenNumber: 'sirenNumber',
        siretNumber: 'siretNumber',
      });
    });
  });

  describe('toDto', () => {
    it('should return companyDto', () => {
      const company: Company = new Company({
        _id: 'id',
        name: 'name',
        rcsNumber: 'rcsNumber',
        vatNumber: 'vatNumber',
        sirenNumber: 'sirenNumber',
        siretNumber: 'siretNumber',
      });

      const companyDto: CompanyDto = CompanyMapper.toDto(company);

      expect(companyDto).toEqual({
        id: 'id',
        name: 'name',
        rcsNumber: 'rcsNumber',
        vatNumber: 'vatNumber',
        sirenNumber: 'sirenNumber',
        siretNumber: 'siretNumber',
      });
    });
  });
});
