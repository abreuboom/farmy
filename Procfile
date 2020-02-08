release: knex migrate:latest --knexfile ./backend/knexfile.js 
release: knex seed:all
web: node ./backend/build/main.js