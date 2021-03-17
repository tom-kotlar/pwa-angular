
import * as _ from 'lodash';
import {FILMS} from "./database-data";


class InMemoryDatabase {

    readAllFilms() {
        return _.values(FILMS);
    }

}




export const db = new InMemoryDatabase();


