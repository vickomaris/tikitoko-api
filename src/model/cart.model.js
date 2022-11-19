const pool = require("../config/db");

const cartModel = {
  insertCart: (data) => {
    return pool.query(
      `
        INSERT INTO cart (cart_id, buyer_id, product_id, qty)
        VALUES ($1, $2, $3, $4)
        `,
      [data.id, data.bid, data.pid, data.qty]
    );
  },

  getCart: (id) => {
    return pool.query(`SELECT * FROM cart WHERE buyer_id = $1`, [id]);
  },

  getCartDetail: (id) => {
    return pool.query(`SELECT * FROM cart WHERE cart_id = $1`, [id]);
  },

  updateCart: (data) => {
    return pool.query(
      `
    UPDATE cart SET
    qty = COALESCE($1, qty),
    status = COALESCE($2, status),
    updated_at = COALESCE($3, updated_at)
    WHERE cart_id = $4
    `,
      [data.qty, data.status, data.date, data.id]
    );
  },

  deleteCart: (id) => {
    return pool.query(`DELETE FROM cart WHERE cart_id = $1`, [id]);
  },
};

module.exports = cartModel;
