module.exports = {
    development: {
    url: 'postgres://macbook@localhost:5432/note_app',
    dialect: 'postgres'
  },
    production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
    staging: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
    test: {
    url: process.env.DATABASE_URL || 'postgres://macbook@localhost:5432/note_app',
    dialect: 'postgres'
  }
};