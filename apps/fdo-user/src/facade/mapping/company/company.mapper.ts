import { Company } from '../../../domain/entities/company/company.entity';
import { CompanyInput } from '../../dtos/company/company.input';
import { CompanyDto } from '../../dtos/company/company.dto';
import { CompanyDtoBuilder } from '../../dtos/company/company.dto.builder';

/**
 * @class CompanyMapper
 * @description Mapper for Company
 */
export class CompanyMapper {
  /**
   * @method toDto
   * @description Maps Company to CompanyDto
   * @param {Company} company - The Company to map
   * @returns {CompanyDto} - The mapped CompanyDto
   */
  public static mapToDto(company: Company): CompanyDto {
    const companyDto = new CompanyDtoBuilder()
      .setId(company._id?.toString())
      .setCreatedAt(company.createdAt)
      .setUpdatedAt(company.updatedAt)
      .setName(company.name)
      .setVatNumber(company.vatNumber)
      .setRcsNumber(company.rcsNumber)
      .setSiret(company.siret)
      .setSiren(company.siren)
      .build();
    return companyDto;
  }

  /**
   * @method mapToEntity
   * @description Maps CompanyInput or CompanyDto to Company
   * @param {CompanyInput | CompanyDto} companyDto - The CompanyInput or the CompanyDto to map
   * @returns {Company} - The mapped Company
   */
  public static mapToEntity(companyDto: CompanyInput | CompanyDto): Company {
    const company = new Company.Builder()
      .setName(companyDto?.name)
      .setVatNumber(companyDto?.vatNumber)
      .setRcsNumber(companyDto?.rcsNumber)
      .setSiret(companyDto?.siret)
      .setSiren(companyDto?.siren)
      .build();
    return company;
  }
}
