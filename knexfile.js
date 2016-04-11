module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/maps',
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: './seeds/'
    }
  }

};
