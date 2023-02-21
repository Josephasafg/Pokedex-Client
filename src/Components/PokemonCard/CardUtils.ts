const FEMALE_CHAR = "♀";
const MALE_CHAR = "♂";
const FORME = "Forme";


export const createIconURL = (baseURL: string, name: string): string => {
    const parsedName = parseName(name);

    return `${baseURL}/${parsedName.replace(/ /g, "-")}.png`
}

export const parseName = (pokemonName: string): string => {
    let newNameArr: string[] = [];

    pokemonName.split(/[\s-\\.]+/).forEach(word => {
        if (word.includes(FEMALE_CHAR)) {
            newNameArr = newNameArr.concat(word.replace(FEMALE_CHAR, " F").split(" "));
        } else if (word.includes(MALE_CHAR)) {
            newNameArr = newNameArr.concat(word.replace(MALE_CHAR, " M").split(" "));
        } else if (newNameArr.includes(word)) {
            return;
        } else if (word.endsWith("Mega")) {
            newNameArr = newNameArr.concat(word.split(/(?=[A-Z])/));
        } else if (word.includes(FORME) || word.includes("Mode") || word === "Cloak" || word.includes("Size")) {
            return;
        } else if (word.includes("%")) {
            let currentName = word.replace("%", "");
            newNameArr = newNameArr.concat(currentName.split(/([0-9]+)/).filter(Boolean))
        } else if (word.includes("'")) {
            newNameArr.push(word.replace("'", ""));
        } else if (word.split(/(?=[A-Z])/).length > 1) {
            newNameArr = newNameArr.concat(word.split(/(?=[A-Z])/))
        } else {
            newNameArr.push(word);
        }
    })

    return newNameArr.join(" ").trim();
}