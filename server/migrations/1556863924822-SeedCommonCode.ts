import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { CommonCode } from '@things-factory/code-base'

import { COMMON_CODES as SEED_COMMON_CODES } from '../seed-data/common-codes'

export class SeedCommonCode1556863924822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(CommonCode)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({ name: 'SYSTEM' })

    try {
      SEED_COMMON_CODES.forEach(async commonCode => {
        await repository.save({
          ...commonCode,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(CommonCode)
    SEED_COMMON_CODES.reverse().forEach(async commonCode => {
      let record = await repository.findOne({ name: commonCode.name })
      await repository.remove(record)
    })
  }
}
