import { XMLTransDataModel } from "@/model/models";

enum BankOrg {
    CAPONE,
    UNKNOWN,
}

/*
    Extracts transactions from XML QFX files
*/
export function extractBankTransactions(data: string): XMLTransDataModel[] {
    const bankOrg: BankOrg = determineBankOrg(data);
    var transList: string = ""
    switch (bankOrg) {
        case BankOrg.CAPONE:
            transList = extractBankTransactionListCAPONE(data)
            return parseBankTransactionsCAPONE(transList)
        default:
            throw new Error("Error extracting bank")
    }
}

/*
    Determines the bank organization based on the XML QFX file content.
*/
function determineBankOrg(data: string): BankOrg {
    const orgString = extractOrgContent(data)
    switch (orgString) {
        case "Capital One Bank":
            return BankOrg.CAPONE
        default:
            return BankOrg.UNKNOWN
    }
}

/*
    Extracts only the org string from the XML QFX file content.
    This is used to determine the bank organization.
*/
function extractOrgContent(data: string) {
    // Remove newlines and carriage returns from the input string
    const sanitizedString = data.replace(/[\r\n]/g, '');
    // Find the first occurrence of <ORG> and extract the content until the next <
    const startIndex = sanitizedString.indexOf('<ORG>');
    if (startIndex !== -1) {
        const endIndex = sanitizedString.indexOf('<', startIndex + 5); // Start searching after "<ORG>"
        if (endIndex !== -1) {
            return sanitizedString.substring(startIndex + 5, endIndex).trim(); // Extract content and trim spaces
        }
    }
    return 'UNKNOWN';
}

/*
    Extracts only the bank transactions list from the XML QFX file content.
    Extracts based on the content type in Capital One files specifically.
    This is used to parse individual transactions.
*/
function extractBankTransactionListCAPONE(ofxString: string): string {
    // Remove XML and OFX processing instructions
    const cleanedXml = ofxString
        .replace(/<\?xml.*?\?>/g, '')
        .replace(/<\?OFX.*?\?>/g, '')
        .trim();
    // Extract BANKTRANLIST content using regex
    const bankTransListMatch = cleanedXml.match(/<BANKTRANLIST>([\s\S]*?)<\/BANKTRANLIST>/);
    if (!bankTransListMatch) {
        throw new Error('No BANKTRANLIST found in the XML');
    }
    // Remove DTSTART and DTEND elements from the extracted content
    const cleanedBankTransList = bankTransListMatch[1]
        .replace(/<DTSTART>.*?<\/DTSTART>/g, '')
        .replace(/<DTEND>.*?<\/DTEND>/g, '')
        .trim();
    // Reconstruct the BANKTRANLIST with cleaned content
    return `<BANKTRANLIST>${cleanedBankTransList}</BANKTRANLIST>`;
}

/*
    Parses QFX XML bank transactions from Capital One file and returns XML Transaction model list.
*/
function parseBankTransactionsCAPONE(xmlString: string): XMLTransDataModel[] {
    //  Regex to extract individual transaction blocks, 
    // /g for global search, exec will advance past previous match on subsequent calls.
    const transactionRegex = /<STMTTRN>([\s\S]*?)<\/STMTTRN>/g;
    // Find all transactions
    const transactions: string[] = [];
    let match;
    while ((match = transactionRegex.exec(xmlString)) !== null) {
        transactions.push(match[1]);
    }
    // Parse each transaction
    try {
        return transactions.map(transaction => {
            // Parse date string
            const dateString = extractTagContent(transaction, 'DTPOSTED');
            const date = dateString
                ? new Date(
                    parseInt(dateString.slice(0, 4)),   // year
                    parseInt(dateString.slice(4, 6)) - 1,  // month (0-indexed)
                    parseInt(dateString.slice(6, 8))    // day
                )
                : null;
            return {
                type: extractTagContent(transaction, 'TRNTYPE')!,
                date: date?.toISOString()!,
                amount: parseFloat(extractTagContent(transaction, 'TRNAMT') || '0')!,
                id: extractTagContent(transaction, 'FITID')!,
                memo: extractTagContent(transaction, 'MEMO')!,
                bankOrg: BankOrg[BankOrg.CAPONE],
            };
        });
    } catch (error) {
        throw new Error('Problem parsing transactions.')
    }
}

// Function to extract a specific tag's content in XML QFX Transaction string
const extractTagContent = (content: string, tagName: string): string => {
    const match = content.match(new RegExp(`<${tagName}>(.*?)</${tagName}>`));
    if (match)
        return match[1].trim()
    else
        throw new Error(`Failed to extract tag ${tagName}`);
};