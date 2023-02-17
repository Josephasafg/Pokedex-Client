const FEMALE_CHAR = "♀";
const MALE_CHAR = "♂";
const SPACE = " ";
const FORME = "Forme";


export const createIconURL = (baseURL: string, name: string) => {
    if (name.includes(FEMALE_CHAR)) {
        return `${baseURL}/${name.replace(FEMALE_CHAR, '')}-f.png`
    }

    if (name.includes(MALE_CHAR)) {
        return `${baseURL}/${name.replace(MALE_CHAR, '')}-m.png`
    }

    if (name.includes(FORME)) {
        let newName = name.replace("Forme", "").replace(" ", "");

        if (newName.includes("%")) {
            let splitName = newName.replace("%", "").match(/[a-zA-Z]+/g);
            // @ts-ignore
            newName = splitName.join("-");
        }

        return `${baseURL}/${newName.split(/(?=[A-Z])/).join("-")}.png`;
    }

    if (name.includes("Size")) {
        let newName = name.replace("Size", "").replace(" ", "").split(/(?=[A-Z])/);

        return `${baseURL}/${newName.join('-')}.png`
    }

    if (name.includes(SPACE)) {
        return `${baseURL}/${name.replace(SPACE, '-')}.png`
    }

    return `${baseURL}/${name.replace("'", '').split(/(?=[A-Z])/).join("-")}.png`
}