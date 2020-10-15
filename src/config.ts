import * as path from 'path'

// data directory
export const dataDirectory = path.join(__dirname, '../data/')
// main directory
export const directoryOfProject = path.join(__dirname, '../')
// compaign file to write to
export const compaignFile = 'compaign.csv'
// compaign file to write to
export const creativeFile = 'creative.csv'
// reg exp to get right files 
// as only only may 05,06 is required 
export const dataFileRegExp = /^Yashi_(2016-05-05|2016-05-06).csv$/
// advertiser data file
export const advFileRegExp = /^Yashi_Advertisers.csv$/

// due to limitations of csv parser all the values will be converted to string
// so we need header which are string as there is a least amount of the them
export const stringHeaders =
{
    dataFile: [
        'Date',
        'Advertiser Name',
        'Campaign Name',
        'Order Name',
        'Creative Name',
        'Creative Preview URL'
    ],
    advFile: [
        'Advertiser Name'
    ]
}

