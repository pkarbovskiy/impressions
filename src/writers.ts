import { createObjectCsvWriter } from 'csv-writer'
import { DataDictionary } from './interfaces'
import { compaignFile, creativeFile } from './config'

/**
 * method to write to csv file compaigns
 * @param data data to write in a shape of DataDictionary
 */
export const writeCompaigns = (data: DataDictionary): void => {
    const compaignDatesImpressions = []
    // get through all the compaigns
    Object.keys(data.compaignByDateImpressions).forEach((compaignId: string) => {
        // compaign for the row
        const compaign = {
            compaignId,
            compaignName: data.compaign[compaignId].compaign_name
        }
        // get every date for each compaign
        Object.keys(data.compaignByDateImpressions[compaignId]).forEach((date: string) => {
            compaignDatesImpressions.push(
                Object.assign({}, compaign, {
                    date,
                    impressions: data.compaignByDateImpressions[compaignId][date]
                })
            )
        })
    })

    const csvWriter = createObjectCsvWriter({
        path: compaignFile,
        header: [
            { id: "compaignId", title: "Campaign ID" },
            { id: "compaignName", title: "Campaign Name" },
            { id: "date", title: "Date" },
            { id: "impressions", title: "Impressions" },
        ]
    })

    csvWriter
        .writeRecords(compaignDatesImpressions)
        .then(() => console.log(`The ${compaignFile} was written successfully`))
}

/**
 * method to write to csv file creatives
 * @param data data to write in a shape of DataDictionary
 */
export const writeCreatives = (data: DataDictionary): void => {
    const creativeCompaignDatesImpressions = []
    // get through all the creatives
    Object.keys(data.creativesCompaignByDateImpressions).forEach((creativeId: string) => {
        // creative for the row
        const creative = {
            creativeId,
            creativeName: data.creatives[creativeId].creative_name,
            compaignId: data.creativesCompaignByDateImpressions[creativeId].compaign_id,

        }
        Object.keys(data.creativesCompaignByDateImpressions[creativeId].dates).forEach((date: string) => {

            creativeCompaignDatesImpressions.push(
                Object.assign({}, creative, {
                    date,
                    impressions: data.creativesCompaignByDateImpressions[creativeId].dates[date]
                })
            )
        })
    })

    const csvWriter = createObjectCsvWriter({
        path: creativeFile,
        header: [
            { id: "creativeId", title: "Creative ID" },
            { id: "creativeName", title: "Creative Name" },
            { id: "compaignId", title: "Campaign ID" },
            { id: "date", title: "Date" },
            { id: "impressions", title: "Impressions" },
        ]
    })

    csvWriter
        .writeRecords(creativeCompaignDatesImpressions)
        .then(() => console.log(`The ${creativeFile} was written successfully`))
}