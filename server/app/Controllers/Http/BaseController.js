'use strict'
const Base = use('App/Models/Base');
class BaseController {

  async index ({ auth }) {
  }

  async create ({ auth, request }) {
  }

  async show ({ request }) {
    const bases = await Base.all();

    return bases;
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = BaseController
