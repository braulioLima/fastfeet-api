import database from '../../src/database';

function truncate() {
  // const { models } = database.connection;
  return Promise.all(
    Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        truncate: true,
        force: true,
        cascade: false,
      });
    })
  );
}

export default truncate;
