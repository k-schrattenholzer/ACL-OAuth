const pool = require("../utils/pool.js");

module.exports = class Post {
  id;
  user_id;
  content;

  constructor (row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.content = row.content;
  }

  static async insert({ user_id, content }) {
    const { rows } = await pool.query(
      `
      WITH new_post AS (
        INSERT INTO posts (user_id, content)
      VALUES ($1, $2)
      RETURNING *
      )
      
      SELECT
        new_post.*,
        github_users.email
      FROM
        new_post
      LEFT JOIN
        github_users
      ON
        github_users.id = new_post.user_id
      `
      ,[user_id, content]
      )
      return new Post(rows[0])
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM POSTS')
  }
}