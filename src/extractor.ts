import { CsvData, CsvAdvData, DataDictionary, AdvDictionary } from './interfaces'
/**
 * method to reshape and extract data from Data csv file
 * @param content data from csv file
 * @return reshaped data
 */
export const extractReaquiredDataFromDataFile = (content: CsvData[], enrichExisitingData?: DataDictionary): DataDictionary => {
    let result: DataDictionary = {
        compaign: {},
        creatives: {},
        compaignByDateImpressions: {},
        creativesCompaignByDateImpressions: {}
    }

    if (enrichExisitingData != null) {
        result = enrichExisitingData;
    }

    return content.reduce((acc, val: CsvData) => {
        // collect data to dictionary to decrease size of the other objects
        // and do not duplicate data    
        if (acc.compaign[val["Campaign ID"]] == null) {
            acc.compaign[val["Campaign ID"]] = {
                compaign_id: val["Campaign ID"],
                compaign_name: val["Campaign Name"]
            }
        }
        if (acc.creatives[val["Creative ID"]] == null) {
            acc.creatives[val["Creative ID"]] = {
                creative_id: val["Creative ID"],
                creative_name: val["Creative Name"],
                creative_preview_url: val["Creative Preview URL"]
            }
        }
        // initialize date compaign impressions
        if (acc.compaignByDateImpressions[val['Campaign ID']] == null) {
            acc.compaignByDateImpressions[val['Campaign ID']] = {}
        }
        if (acc.compaignByDateImpressions[val['Campaign ID']][val["Date"]] == null) {
            acc.compaignByDateImpressions[val['Campaign ID']][val["Date"]] = 0
        }
        // adding impressions for the compaign
        acc.compaignByDateImpressions[val['Campaign ID']][val["Date"]] += val["Impressions"]

        // initialize date creative impressions per compaign per day
        if (acc.creativesCompaignByDateImpressions[val["Creative ID"]] == null) {
            acc.creativesCompaignByDateImpressions[val["Creative ID"]] = {
                dates: {},
                compaign_id: val["Campaign ID"]
            }
        }

        if (acc.creativesCompaignByDateImpressions[val["Creative ID"]].dates[val["Date"]] == null) {
            acc.creativesCompaignByDateImpressions[val["Creative ID"]].dates[val["Date"]] = 0
        }
        // adding impressions for the creative
        acc.creativesCompaignByDateImpressions[val["Creative ID"]].dates[val["Date"]] += val["Impressions"]

        return acc
    }, result)
}
/**
 * method to reshape and extract data from Adveritsers csv file
 * @param content data from csv file
 * @return reshaped data
 */
export const extractReaquiredDataFromAdvFile = (content: CsvAdvData[], enrichExisitingData?: AdvDictionary): AdvDictionary => {
    let result = {}

    if (enrichExisitingData != null) {
        result = enrichExisitingData;
    }

    return content.reduce((acc, val: CsvAdvData) => {
        acc[val['Advertiser ID']] = val['Advertiser Name']
        return acc
    }, result)
}