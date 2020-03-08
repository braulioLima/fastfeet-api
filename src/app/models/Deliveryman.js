import { Model, DataTypes } from 'sequelize';

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        avatar_id: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Deliveryman;
