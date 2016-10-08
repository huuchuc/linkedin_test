// Database url
// var connectString = process.env.DATABASE_URL || 'postgres://macbook@localhost:5432/note_app';

module.exports = {
	connString : process.env.DATABASE_URL || 'postgres://macbook@localhost:5432/note_app'
}