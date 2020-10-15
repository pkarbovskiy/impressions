export type CsvData = {
    Date: string,
    'Advertiser ID': number,
    'Advertiser Name': string,
    'Campaign ID': number,
    'Campaign Name': string,
    'Order ID': number,
    'Order Name': string,
    'Creative ID': number,
    'Creative Name': string,
    'Creative Preview URL': string,
    Impressions: number,
    Clicks: number,
    '25% Viewed': number,
    '50% Viewed': number,
    '75% Viewed': number,
    '100% Viewed': number,
    'Media Cost': number,
    'Data Cost': number,
    'Client Cost': number
}

export type DataDictionary = {
    compaign: {
        [id: number]: {
            compaign_id: number;
            compaign_name: string;
        }
    },
    creatives: {
        [id: number]: {
            creative_id: number;
            creative_name: string;
            creative_preview_url: string;
        }
    },
    compaignByDateImpressions: {
        [compaign_id: number]: {
            [date: string]: number
        }
    },
    creativesCompaignByDateImpressions: {
        [creative_id: number]: {
            compaign_id: number,
            dates: {
                [date: string]: number
            }
        }
    }
}

export type CsvAdvData = {
    'Advertiser ID',
    'Advertiser Name'
}

export type AdvDictionary = {
    [id: number]: string
}