const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const resolvers = {
  Query: {
    employees: async (_, __, { db, user }) => {
      if (!user) {
        throw new Error('Authentication required');
      }
      const result = await db.query('SELECT * FROM employees');
      return result.rows;
    },

    employee: async (_, { id }, { db, user }) => {
      if (!user) {
        throw new Error('Authentication required');
      }
      const result = await db.query('SELECT * FROM employees WHERE id = $1', [id]);
      return result.rows[0];
    },

    me: (_, __, { user }) => {
      if (!user) {
        throw new Error('Authentication required');
      }
      return user;
    },
  },

  Mutation: {
    addEmployee: async (_, { name, email, position }, { db, user }) => {
      if (!user) {
        throw new Error('Authentication required');
      }
      const result = await db.query(
        'INSERT INTO employees (name, email, position) VALUES ($1, $2, $3) RETURNING *',
        [name, email, position]
      );
      return result.rows[0];
    },

    updateEmployee: async (_, { id, name, email, position }, { db, user }) => {
      if (!user) {
        throw new Error('Authentication required');
      }
      const result = await db.query(
        'UPDATE employees SET name = COALESCE($1, name), email = COALESCE($2, email), position = COALESCE($3, position) WHERE id = $4 RETURNING *',
        [name, email, position, id]
      );
      return result.rows[0];
    },

    deleteEmployee: async (_, { id }, { db, user }) => {
      if (!user) {
        throw new Error('Authentication required');
      }
      const result = await db.query('DELETE FROM employees WHERE id = $1', [id]);
      return result.rowCount > 0;
    },

    login: async (_, { username, password }, { db }) => {
      const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = result.rows[0];

      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, user: { id: user.id, username: user.username } };
    },

    register: async (_, { username, password }, { db }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.query(
        'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *',
        [username, hashedPassword]
      );

      const user = result.rows[0];
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, user: { id: user.id, username: user.username } };
    },
  },
};

module.exports = resolvers;