import { CsvData } from './interfaces'
import { readdir, createReadStream } from 'fs'
import * as csv from 'csv-parser'

/**
 * method to get files based on pattern from directory
 * @param directory directory to get files from
 * @return {Promise} returns a promise that resolves to array of files
 */
export const getFiles = (directory: string, re?: RegExp): Promise<string[]> => {


    // convert async function to promise to streamline the process
    return new Promise((resolve, reject) => {
        const filesMatchingPattern: string[] = []
        readdir(directory, (err, filesInFolder: string[]) => {
            // reject if we get an error
            if (err) {
                reject(err)
            }

            filesInFolder.forEach(file => {
                // get only files which match the pattern
                // if no pattern was provided get all files
                if (re && re.test(file) || !re) {
                    filesMatchingPattern.push(file)
                }
            })
            resolve(filesMatchingPattern)
        })

    })
}

/**
 * method to process csv file
 * @param fileName name of the file to load
 * @param dataDirectory path to data directory
 * @return {Promise} 
 */
export const processCsvFile = (fileName: string, dataDirectory: string, stringHeaders: string[], include?: { field: string, dictionary: { [key: string]: any } }): Promise<CsvData[]> => {
    // data collector
    const content: CsvData[] = []
    // file to load
    const csvFile = `${dataDirectory}${fileName}`

    console.log(`Processing: ${csvFile}`)
    return new Promise((resolve, reject) => {
        // if directory or file is not specified
        if (dataDirectory == null || fileName == null) {
            return reject(new Error("both file and directory are required"))
        }
        createReadStream(csvFile)
            .on('error', (err) => reject(err))
            .pipe(csv(
                {
                    mapValues: ({ header, index, value }) => {
                        if (!stringHeaders.includes(header)) {
                            // the easiest way to convert string to number 
                            // without a need to identify if it's an int or a float
                            return +value
                        }
                        return value
                    }
                }
            ))
            .on('data', (row: CsvData) => {
                // only include based on allowed values
                if (include != null) {
                    if (include['dictionary'][row[include['field']]] != null) {
                        content.push(row)
                    }
                } else {
                    content.push(row)
                }
            })
            .on('end', () => {
                console.log(`${fileName} successfully processed. ${content.length} rows were extracted.`)
                resolve(content)
            })
    })
}