import { CsvData, DataDictionary } from './interfaces'
import { writeCompaigns, writeCreatives } from './writers'
import { getFiles, processCsvFile } from './readers'
import { extractReaquiredData } from './extractor'

import { dataDirectory, fileRegExp } from './config'


getFiles(dataDirectory, fileRegExp).then((files: string[]) => {
    // get all the promises for the files
    const fileContentsPromise = files.map((file: string) => processCsvFile(file, dataDirectory))
    Promise.all(fileContentsPromise).then((contents: CsvData[][]) => {
        if (contents.length === 0) {
            throw 'No data is available. Check if the data files were provided'
        }
        return contents.reduce((acc: DataDictionary, val: CsvData[]) => extractReaquiredData(val, acc), {
            compaign: {},
            creatives: {},
            compaignByDateImpressions: {},
            creativesCompaignByDateImpressions: {}
        })

    }).then((data: DataDictionary) => {
        writeCompaigns(data)
        writeCreatives(data)
    }).catch(err => console.error(err))
}).catch(err => console.error(err))
