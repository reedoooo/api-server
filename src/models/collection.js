"use strict";

class Collection {
  constructor(dbModel) {
    // dbModel is a reference to a database model that has been instantiated with sequelize
    this.dbModel = dbModel;
  }

  create = async (modelData) => {
    try {
      // .create() is a method of sequelize that combines the methods .build() and .save() into one
      return await this.dbModel.create(modelData);
    } catch (error) {
      console.error("COLLECTION ERROR > Cannot Create DB Entry", error);
    }
  };

  read = async (id, findOptions) => {
    try {
      if (id) {
        console.log(findOptions);
        return await this.dbModel.findOne({ where: { id }, ...findOptions });
      } else {
        return await this.dbModel.findAll(findOptions);
      }
    } catch (error) {
      console.error("COLLECTION ERROR > Cannot Read DB Entry", error);
    }
  };

  update = async (id, modelData) => {
    try {
      await this.dbModel.update(modelData, { where: { id } });
      return await this.dbModel.findOne({ where: { id } });
    } catch (error) {
      console.error("COLLECTION ERROR > Cannot Update DB Entry", error);
    }
  };

  delete = async (id) => {
    try {
      await this.dbModel.destroy({
        where: { id },
      });
      return "Entry successfully deleted";
    } catch (error) {
      console.error("COLLECTION ERROR > Cannot Delete DB Entry", error);
    }
  };
}

module.exports = Collection;
