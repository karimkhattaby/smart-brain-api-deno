// Importing Dependencies
import { Client } from "../deps.ts";

// Get Profile Handler
export function handleProfileGet(id : number, db: Client) {
    // query the database for the user object
    return db.query({
        text: "SELECT * FROM users WHERE id = $1",
        args: [id]
    })
    .then(result => {
        // if the query result has data
        if (result.rows.length > 0){
            // return the user object
            const user = {
                id: result.rows[0][0],
                name: result.rows[0][1],
                email: result.rows[0][2],
                entries: result.rows[0][3],
                joined: result.rows[0][4]
            };
            return user;
        } else {
            // if the query result is empty, throw an error
            throw Error("User Not Found");
        }
    })
    .catch(err => err.message);
}