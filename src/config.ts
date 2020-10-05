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
export const fileRegExp = /^Yashi_\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01]).csv$/