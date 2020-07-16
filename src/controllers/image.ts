// Importing Dependencies
import { Client } from "../deps.ts";

// image handler
export function handleImage(id : number, db: Client) {
    // query the database for the user object
    return db.query({
        text: "UPDATE users SET entries = entries + 1 WHERE id = $1;",
        args: [id]
    })
    .then(result => {
        // if the query result has data
        if (result.rowCount){
            // return the # of entries
            return db.query({
                text: "SELECT entries FROM users WHERE id = $1;",
                args: [id]
            })
            .then(result => {
                if (result.rows.length > 0) {
                    return Number(result.rows[0][0])
                } else {
                    throw Error("User Not Found")
                }
            })
            .catch(err => err.message);
        } else {
            // if the query result is empty, throw an error
            throw Error("User Not Found");
        }
    })
    .catch(err => err.message);
}