
import {db} from "./database";


export function readAllFilms(req, res) {

    res.status(200).json({lessons:db.readAllFilms()});

}