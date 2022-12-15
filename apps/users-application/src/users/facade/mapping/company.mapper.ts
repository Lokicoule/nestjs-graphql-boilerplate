import {
  Company,
  ICompany,
} from '../../domain/entities/company/company.entity';
import { CompanyDto, ICompanyDto } from '../dtos/company.dto';
import { CompanyInput } from '../dtos/inputs/company.input';

export class CompanyMapper {
  public static toDto(company: Company): CompanyDto {
    const { _id, ...companyWithoutId } = company;

    const companyDto: ICompanyDto = Object.assign({} as ICompanyDto, {
      ...companyWithoutId,
      id: _id?.toString(),
    });

    return new CompanyDto(companyDto);
  }

  public static toEntity(company: CompanyInput): Company {
    const { id, ...companyWithoutId } = company;

    const companyEntity: ICompany = Object.assign({} as ICompany, {
      ...companyWithoutId,
      _id: id,
    });

    return new Company(companyEntity);
  }
}
