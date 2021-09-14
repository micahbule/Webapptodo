const Fastify = require("fastify");
const fastifyCors= require ("fastify-cors");
const fastifyPlugin = require('fastify-plugin')
const pg = require("./db");

const fastify = require('fastify')({ logger: true })

const DATABASE_USER = 'postgres'
const DATABASE_PASSWORD = 'root'
const DATABASE_HOST = 'localhost'
const DATABASE_NAME = 'webapptodo'

/** Complete DB connection string */
const dbConnectionString = `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}`

fastify.log.info(`Connecting to DB ${dbConnectionString}`)

/** Connect to the database */
fastify.register(require('fastify-postgres'), {
  connectionString: dbConnectionString,
})

//ROUTES//

//create todo
  fastify.post('/todos', async (request, reply) => {
      const { description } = request.body;
      const newTodo = await pg.query(
        "INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
      );
      client.release()
      return newTodo.rows[0];
  });

//get all todos
  fastify.get('/todos', async (request, reply) => {
    const client = await fastify.pg.connect()
      const allTodos = await client.query("SELECT * FROM todo");
      client.release()
      return allTodos.rows;
  });

//get a todo
  fastify.get('/todos/:id', async (request, reply) => {
    const client = await fastify.pg.connect()
      const { id } = request.params;
      const todo = await client.query("SELECT * FROM todo WHERE todo_id = $1", [
        id
      ]);
      client.release()
      return todo.rows[0];
  });

//update a todo

fastify.put("/todos/:id", async (request, reply) => {
  const client = await fastify.pg.connect()
    const { id } = request.params;
    const { description } = request.body;
    const updateTodo = await client.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    client.release()
    return "Todo was updated!";
});

//delete a todo

fastify.delete("/todos/:id", async (request, reply) => {
  const client = await fastify.pg.connect()
    const { id } = request.params;
    const deleteTodo = await client.query("DELETE FROM todo WHERE todo_id = $1", [
      id
    ]);
    client.release()
    return "Todo was deleted!";
});

const start = async () => {
  try {
      await fastify.listen(5000)
  } catch (err) {
      fastify.log.error(err)
      process.exit(1)
  }
}
start()
