
// Range generator
const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);



// List of provinces in Canada
export const PROVINCES = [
    "Yukon",
    "Quebec",
    "Alberta",
    "Ontario",
    "Nunavut",
    "Manitoba",
    "Nova Scotia",
    "Saskatchewan",
    "New Brunswick",
    "British Columbia",
    "Prince Edward Island",
    "Northwest Territories",
    "Newfoundland and Labrador"
];

// Map of province name to tax rate
export const TAXES_BY_PROVINCE = {
    "Yukon": 5,
    "Quebec": 14.975,
    "Alberta": 5,
    "Ontario": 13,
    "Nunavut": 5,
    "Manitoba": 12,
    "Nova Scotia": 15,
    "Saskatchewan": 11,
    "New Brunswick": 15,
    "British Columbia": 12,
    "Prince Edward Island": 15,
    "Northwest Territories": 5,
    "Newfoundland and Labrador": 15
};

// List of month names in short format of MMM
export const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// List of years starting from current year + 9 into future
const currentYear = new Date().getFullYear();
const endYear = currentYear + 9;
export const YEARS = range(currentYear, endYear);
export const toShort = (dateString = "") => dateString.split("T")[0]; 
