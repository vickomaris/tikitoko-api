const pool = require("../config/db")

const sellerModel = {
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
}

module.exports = sellerModel;
