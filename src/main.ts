import { CsvData, CsvAdvData, DataDictionary, AdvDictionary } from './interfaces'
import { writeCompaigns, writeCreatives } from './writers'
import { getFiles, processCsvFile } from './readers'
import { extractReaquiredDataFromDataFile, extractReaquiredDataFromAdvFile } from './extractor'

import { dataDirectory, dataFileRegExp, advFileRegExp, stringHeaders } from './config'



async function getAdvertisers() {
    try {
        const avertiserFile: string[] = await getFiles(dataDirectory, advFileRegExp)
        const fileContentsPromise = avertiserFile.map((file: string) => processCsvFile(file, dataDirectory, stringHeaders['advFile']))
        return Promise.all(fileContentsPromise).then((contents: CsvAdvData[][]) => {
            if (contents.length === 0) {
                throw 'No data is available. Check if the data files were provided'
            }
            return contents.reduce((acc: AdvDictionary, val: CsvAdvData[]) => extractReaquiredDataFromAdvFile(val, acc), {})
        })
    } catch (err) {
        console.error(err)
    }
}


getFiles(dataDirectory, dataFileRegExp).then(async (files: string[]) => {
    const advertisers = await getAdvertisers()

    // get all the promises for the files
    const fileContentsPromise = files.map(
        (file: string) =>
            processCsvFile(
                file,
                dataDirectory,
                stringHeaders['dataFile'],
                { field: 'Advertiser ID', dictionary: advertisers }
            )
    )
    Promise.all(fileContentsPromise).then((contents: CsvData[][]) => {
        if (contents.length === 0) {
            throw 'No data is available. Check if the data files were provided'
        }
        return contents.reduce((acc: DataDictionary, val: CsvData[]) => extractReaquiredDataFromDataFile(val, acc), {
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



