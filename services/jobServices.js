const pool = require("../config/db");

class JobService {
  async getAllJobs() {
    const query = `SELECT * FROM job`;
    const { rows: jobs } = await pool.query(query);
    return jobs;
  }

  async createJob(title) {
    const query = `INSERT INTO job (title) VALUES($1) RETURNING *`;
    const params = [title];
    const { rows: newJobArr } = await pool.query(query, params);
    return newJobArr[0];
  }

  async deleteJob(jobId) {
    await pool.query(`DELETE FROM employer WHERE job_id = $1`, [jobId]);
    await pool.query(`DELETE FROM job WHERE id = $1`, [jobId]);
  }
}

module.exports = new JobService();
