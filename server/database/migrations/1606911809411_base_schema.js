'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BaseSchema extends Schema {
  up () {
    this.create('bases', (table) => {
      table.string('DATA').notNullable()
      table.integer('HORA').notNullable()
      table.integer('DIA').notNullable()
      table.integer('MES').notNullable()
      table.string('UF', 2).notNullable()
      table.string('ESTADO', 30).notNullable()
      table.integer('ALO').notNullable()
      table.integer('CPC').notNullable()
      table.integer('CPCA').notNullable()
      table.integer('PP').notNullable()
      table.integer('CLIENTE_NAO_ESTA').notNullable()
      table.integer('CLIENTE_NAO_VALIDOU').notNullable()
      table.integer('DESCONHECE').notNullable()
      table.integer('DESCONHECE_DIVIDA').notNullable()
      table.integer('FALECIDO').notNullable()
      table.integer('FONE_MUDO').notNullable()
      table.integer('LIG_PERDIDA').notNullable()
      table.integer('PREVENTIVO').notNullable()
      table.integer('RECADO').notNullable()
      table.integer('ALEGA').notNullable()
      table.integer('RETORNO_AGENDADO').notNullable()
      table.integer('DADOS_INVALIDOS').notNullable()
      table.integer('SEM_INTERESSE').notNullable()
      table.integer('NAO_TABULADA').notNullable()
      table.integer('RETORNO_INDIRETO').notNullable()
      table.integer('FRAUDE').notNullable()
      table.integer('OCUPADO').notNullable()
      table.integer('RECEPT').notNullable()
      table.integer('PROCESSO_JURIDICO').notNullable()
      table.integer('CONTESTACAO').notNullable()
      table.decimal('VALOR').notNullable()
      table.string('TIPO', 7).notNullable()
      table.string('PRODUTO', 8).notNullable()
    })
  }

  down () {
    this.drop('bases')
  }
}

module.exports = BaseSchema
