// Importing Dependencies
import { Client, bcrypt} from "../deps.ts";

// Object Declaration
interface loginDetails {
    email: string,
    password: string
};

// SignIn Handler, returns the result of querying the database for given email and password
export function handleSignin(data : loginDetails, db : Client) {
    return db.query({
        text: "SELECT email, hash FROM login WHERE email = $1",
        args: [data.email]
    })
    .then(result => {
        // if the query result has data && the hashes are equal
        if (result.rows.length > 0 && bcrypt.compareSync(data.password, result.rows[0][1])) {
            // query the database for the user object
            return db.query({
                    text: "SELECT * FROM users WHERE email = $1",
                    args: [data.email]
                })
                .then(result2 => {
                    // if the query result has data
                    if (result.rows.length > 0){
                        // return the user object
                        const user = {
                            id: result2.rows[0][0],
                            name: result2.rows[0][1],
                            email: result2.rows[0][2],
                            entries: result2.rows[0][3],
                            joined: result2.rows[0][4]
                        };
                        return user;
                    } else {
                        // if the query result is empty, throw an error
                        throw Error("Unable to Get User");
                    }
                })
                .catch(err => err.message)
        } else {
            // if email or password are wrong, throw an error
            throw Error("Wrong Credentials");
        }
    })
    .catch(err => err.message);
}