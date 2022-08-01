export const grpahCMSImageLoader = ({ src }) => src;


export const convertFirstCharacterToUppercase = (stringToConvert) => {
    var firstCharacter = stringToConvert.substring(0, 1);
    var restString = stringToConvert.substring(1);
  
    return firstCharacter.toUpperCase() + restString;
}
