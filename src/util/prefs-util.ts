import fs from 'fs';

const prefsFilePath = './cache/prefs/gen-prefs.json';

/*
  Function to read and return preferences from the JSON file.
*/
export const getPrefs = (): any => {
  try {
    const data = fs.readFileSync(prefsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading preferences file:', error);
    return {};
  }
};

/*
  Function to update preferences and write them back to the JSON file.
*/
export const setPrefs = (newPrefs: object): void => {
  try {
    const currentPrefs = getPrefs();
    // Merge newPrefs with currentPrefs, overriding the existing fields with new values
    const updatedPrefs = { ...currentPrefs, ...newPrefs };
    fs.writeFileSync(prefsFilePath, JSON.stringify(updatedPrefs, null, 2), 'utf8');
  } catch (error) {
    console.error('Error updating preferences file:', error);
  }
};