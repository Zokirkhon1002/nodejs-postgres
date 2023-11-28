const pool = require("../config/db");

class EmployerService {
  async getAllEmployers() {
    const query = `SELECT * FROM employer`;
    const { rows: employers } = await pool.query(query);
    return employers;
  }

  async getEmployerById(id) {
    const query = `
      SELECT * 
      FROM employer 
      LEFT JOIN job ON job.id = employer.job_id 
      WHERE employer.id = $1
    `;
    const { rows: employer } = await pool.query(query, [id]);
    return employer[0];
  }

  async createEmployer(name, salary, degree, job_id) {
    const query = `
      INSERT INTO employer (name, degree, salary, job_id) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const params = [name, degree, salary, job_id];
    const { rows: newEmployerArr } = await pool.query(query, params);
    return newEmployerArr[0];
  }

  async updateEmployer(id, name, salary, degree, job_id) {
    const { rows: oldEmployerArr } = await pool.query(`SELECT * FROM employer WHERE id = $1`, [id]);

    const query = `
      UPDATE employer 
      SET name = $1, degree = $2, salary = $3, job_id = $4 
      WHERE id = $5 
      RETURNING *
    `;
    const params = [
      name ? name : oldEmployerArr[0].name,
      degree ? degree : oldEmployerArr[0].degree,
      salary ? salary : oldEmployerArr[0].salary,
      job_id ? job_id : oldEmployerArr[0].job_id,
      id,
    ];
    const { rows: updatedEmployer } = await pool.query(query, params);
    return updatedEmployer[0];
  }

  async deleteEmployer(id) {
    await pool.query(`DELETE FROM employer WHERE id = $1`, [id]);
  }
}

module.exports = new EmployerService();
