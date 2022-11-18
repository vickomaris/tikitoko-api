const pool = require("../config/db");

const buyerModel = {
  register: (data) => {
    return pool.query(
      `
        INSERT INTO buyer (buyer_id, name, email, password)
        VALUES ($1, $2, $3, $4)
        `,
      [data.id, data.name, data.email, data.password]
    );
  },

  emailCheck: (email) => {
    return pool.query(`SELECT * FROM buyer WHERE email = $1`, [email]);
  },
};

module.exports = buyerModel;
