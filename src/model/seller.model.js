const pool = require("../config/db");

const sellerModel = {
  // store
  register: (data) => {
    return pool.query(
      `
            INSERT INTO seller (seller_id, name, email, phone, password)
            VALUES ($1, $2, $3, $4, $5)
            `,
      [data.id, data.name, data.email, data.phone, data.password]
    );
  },

  emailCheck: (email) => {
    return pool.query(`SELECT * FROM seller WHERE email = $1`, [email]);
  },

  // store
  getDetail: (id) => {
    return pool.query(`SELECT * FROM seller WHERE seller_id = $1`, [id]);
  },
};

module.exports = sellerModel;
