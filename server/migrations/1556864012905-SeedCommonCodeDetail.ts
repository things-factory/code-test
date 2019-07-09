import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { CommonCode, CommonCodeDetail } from '@things-factory/code-base'
import { COMMON_CODE_DETAILS as SEED_COMMON_CODE_DETAILS } from '../seed-data/common-code-details'

export class SeedCommonCodeDetail1556864012905 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({ name: 'SYSTEM' })
    const codeRepository = getRepository(CommonCode)
    const repository = getRepository(CommonCodeDetail)

    try {
      SEED_COMMON_CODE_DETAILS.forEach(async codeDetail => {
        const parent = await codeRepository.findOne({
          domain,
          name: codeDetail.parentName
        })

        await repository.save({
          ...codeDetail,
          domain,
          parent
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // TODO
  }
}
