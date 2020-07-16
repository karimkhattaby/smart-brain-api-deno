// Importing Dependencies
import { Client, bcrypt } from "../deps.ts";

// Object Declaration
interface RegisterDetails {
    email: string,
    password: string,
    name: string
};

// Registration Handler
export function handleRegister(data : RegisterDetails, db : Client) {
    // Hash the Password
    const hashedPassword = bcrypt.hashSync(data.password);
    // Insert the User Details Into the Database
    return db.query({
        text: "INSERT INTO login (email, hash) VALUES ($1, $2);",
        args: [data.email, hashedPassword]
    })
    .then(() => db.query({
            text: "INSERT INTO users (name, email, joined) VALUES ($1, $2, $3);",
            args: [data.name, data.email, new Date()]
        })
        .catch(() => "Unable to Register")
    )
    .catch(() => "Unable to Register");
}