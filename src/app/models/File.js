import { DataTypes, Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        path: DataTypes.STRING,
        name: DataTypes.STRING,
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
