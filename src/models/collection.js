'use strict';

class Collection {
  constructor(dbModel) {
    this.dbModel = dbModel;
  }

  async create(modelData) {
    try {
      return await this.dbModel.create(modelData);
    } catch (error) {
      console.error('COLLECTION ERROR > Cannot Create DB Entry', error);
    }
  }

  async read(id, findOptions) {
    try {
      if (id) {
        console.log(findOptions);
        return await this.dbModel.findOne({ where: { id }, ...findOptions });
      } else {
        return await this.dbModel.findAll(findOptions);
      }
    } catch (error) {
      console.error('COLLECTION ERROR > Cannot Read DB Entry', error);
    }
  }

  async update(id, modelData) {
    try {
      await this.dbModel.update(modelData, { where: { id } });
      return await this.dbModel.findOne({ where: { id } });
    } catch (error) {
      console.error('COLLECTION ERROR > Cannot Update DB Entry', error);
    }
  }

  async delete(id) {
    try {
      await this.dbModel.destroy({ where: { id } });
      return 'Entry successfully deleted';
    } catch (error) {
      console.error('COLLECTION ERROR > Cannot Delete DB Entry', error);
    }
  }
}

module.exports = Collection;
