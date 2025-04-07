import { Transaction } from "@/model/models";
import fs from "fs"

// Used for Personal data
// const MAIN_DATASTORE_PATH = "./cache/data/main-datastore-2.json"

// Used for Testing data
const MAIN_DATASTORE_PATH = "./cache/data/main-datastore-test.json"

/*
    Read the datastore from file.
*/
export function readDatastore(): Transaction[] {
    var contents = fs.readFileSync(MAIN_DATASTORE_PATH, 'utf8');
    return JSON.parse(contents);
}

/*
    Write the updated datastore to file.
*/
function writeDatastore(datastore: Transaction[]) {
    try {
        fs.writeFileSync(MAIN_DATASTORE_PATH, JSON.stringify(datastore, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing to datastore:', error);
    }
}

/*
    Create a new item in the datastore.
*/
export function createDatastoreItem(trans: Transaction) {
    const datastore: Transaction[] = readDatastore();
    const index = datastore.findIndex((item: Transaction) => item.id === trans.id);
    if (index != -1) {
        console.error(`Item already added. Skipped`);
        return;
    }
    datastore.push(trans)
    writeDatastore(datastore)
}

/*
    Update an item in the datastore.
*/
export function updateDatastoreItem(trans: Partial<Transaction>) {
    const datastore: Transaction[] = readDatastore();
    if (!trans.id) {
        console.error('ID is required to update a transaction.');
        return;
    }
    const index = datastore.findIndex((item: Transaction) => item.id === trans.id);
    if (index === -1) {
        console.error(`Item with ID ${trans.id} not found in datastore.`);
        return;
    }
    datastore[index] = {
        ...datastore[index], // Retain existing fields
        ...trans, // Update with any new values provided
    };
    writeDatastore(datastore)
}

/*
    Update multiple items in the datastore.
*/
export function updateDatastoreItems(items: Partial<Transaction>[]) {
    items.forEach((obj) => {
        updateDatastoreItem({
            id: obj.id,
            category: obj.category,
        })
    })
}

/*
    Updates the category of all transactions with a given memo to a new category.
*/
export function updateTransCategoriesByMemoBulk(memoString: string, categoryString: string) {
    const datastore: Transaction[] = readDatastore();
    if (!memoString || !categoryString) {
        console.error('memo and category required to update transactions.');
        return;
    }
    const newDatastore = datastore.map((trans) => {
        if (trans.memo === memoString) {
            return {
                ...trans,
                category: categoryString
            }
        }
        return trans;
    })
    writeDatastore(newDatastore)
}