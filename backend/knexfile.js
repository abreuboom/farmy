// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      user: "root",
      password: "mysecretpassword",

      host: "192.168.99.100",
      port: 5432,
      database: "root"
    },
    useNullAsDefault: true
  },

  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
