import db from '../config/db.connection.js';
import toSQLDate from 'js-date-to-sql-datetime';

export default class ProjectService {
    async selectAll() {
        let sql = "SELECT * FROM `projects`";
        const [row] = await db.execute(sql);
        return row;
    }

    async selectById(id) {
        let sql = `SELECT * FROM projects WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async selectByUserId(id) {
        let sql = `SELECT projects.id, projects.title, projects.description, projects.json_file, projects.date_upd FROM projects INNER JOIN project_user ON project_user.user_id = ${id} AND projects.id = project_user.project_id`;
        const [row] = await db.execute(sql);
        return row;
    }

    async create(body, user_id) {
        let sql = `INSERT INTO projects (title, description, json_file, date_upd) VALUES ('${body.title}', '${body.description}', ' ', '${toSQLDate(Date.now())}')`;
        const [row] = await db.execute(sql);
        sql  = `INSERT INTO project_user (project_id, user_id, role_id) VALUES (${row.insertId}, ${user_id}, 3)`;
        const [row1] = await db.execute(sql);
        return row.insertId;
    }

    async update(body, id) {
        if(Object.entries(body).length !== 0){
            await Object.entries(body).filter(([key, value]) => value).map(([key, value]) => db.execute(`UPDATE projects SET ${key} = '${value}' WHERE id = ${id}`))
        }
	}

    async update_path(value, id) {
        let sql = `UPDATE projects SET json_file = '${value}' WHERE id = ${id}`;
        const [row] = await db.execute(sql);

        sql = `UPDATE projects SET date_upd = '${toSQLDate(Date.now())}' WHERE id = ${id}`;
        const [row1] = await db.execute(sql);

        return row;
	}

    async deleteById(id) {
        var sql = `DELETE FROM projects WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
	}

    async isExist(field, value) {
        var sql = `SELECT * FROM projects WHERE ${field} = '${value}'`;
        const [row] = await db.execute(sql);
        return row.length !== 0;
    }
}