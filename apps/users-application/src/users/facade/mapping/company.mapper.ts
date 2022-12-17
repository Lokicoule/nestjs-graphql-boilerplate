import { Company } from '../../domain/entities/company/company.entity';
import { CompanyDto } from '../dtos/company.dto';
import { CompanyInput } from '../dtos/inputs/company.input';

export class CompanyMapper {
  public static toDto(company: Company): CompanyDto {
    if (!Boolean(company)) return;

    return new CompanyDto({
      id: company._id?.toString(),
      name: company.name,
      rcsNumber: company.rcsNumber,
      vatNumber: company.vatNumber,
      sirenNumber: company.sirenNumber,
      siretNumber: company.siretNumber,
      createdAt: company?.createdAt,
      updatedAt: company?.updatedAt,
    });
  }

  public static toEntity(company: CompanyInput): Company {
    if (!Boolean(company)) return;

    return new Company({
      _id: company.id,
      name: company.name,
      rcsNumber: company.rcsNumber,
      vatNumber: company.vatNumber,
      sirenNumber: company.sirenNumber,
      siretNumber: company.siretNumber,
    });
  }
}
