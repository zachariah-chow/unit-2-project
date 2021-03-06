const db = require('../db.js');

module.exports = class User {

    constructor(email, password, img, name) {
        this.email = email;
        this.password = password;
        this.img = img;
        this.name = name;
    }

    static async getAll() {
        const query = `SELECT * FROM users`
        const { rows } = await db.query(query);

        return rows;
    }

    static async getByEmail(email) {
        const query = `SELECT * FROM users WHERE email ='${email}'`
        const { rows } = await db.query(query);

        return rows;
    }

    static async getById(id) {
        const query = `SELECT * FROM users WHERE id=${id}`;
        const { rows } = await db.query(query);

        return rows;
    }

    static async register(user) {
        const queryT = `INSERT INTO users (email, password) VALUES($1, $2) RETURNING *`;
        const queryV = [user.email, user.password];
        const { rows } = await db.query(queryT, queryV);

        return rows;
    }

    static async updateFieldById(id, field, fieldValue) {
        const query = `UPDATE users SET ${field} = '${fieldValue}' WHERE id=${id} RETURNING *`
        const { rows } = await db.query(query);

        return rows;
    }
}