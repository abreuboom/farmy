release: knex migrate:latest --knexfile ./backend/knexfile.js && knex seed:all
web: node ./backend/build/main.js