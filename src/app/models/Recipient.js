import { DataTypes, Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.STRING,
        complement: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip_code: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recipient;
