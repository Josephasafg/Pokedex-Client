const FEMALE_CHAR = "♀";
const MALE_CHAR = "♂";
const SPACE = " ";
const FORME = "Forme";


export const createIconURL = (baseURL: string, name: string) => {
    let newName = name;

    if (name.includes(FEMALE_CHAR)) {
        newName = `${newName.replace(FEMALE_CHAR, "")} f`;
    }

    if (newName.includes(MALE_CHAR)) {
        newName = `${newName.replace(MALE_CHAR, "")} m`;
    }

    if (newName.includes(".")) {
        newName = newName.replace(".", "");
    }

    const currentName = parseMegaPokemon(newName);

    if (currentName.includes(FORME)) {
        let newName = currentName.replace("Forme", "").replace(" ", "");

        if (newName.includes("%")) {
            let splitName = newName.replace("%", "").match(/[a-zA-Z]+/g);
            // @ts-ignore
            newName = splitName.join("-");
        }

        return `${baseURL}/${newName.split(/(?=[A-Z])/).join("-")}.png`;
    }

    if (currentName.includes("Size")) {
        let newName = currentName.replace("Size", "").replace(" ", "").split(/(?=[A-Z])/);

        return `${baseURL}/${newName.join('-')}.png`
    }

    return `${baseURL}/${currentName.replace("'", '').replace("-", "").replace(/ /g, "").split(/(?=[A-Z])/).join("-")}.png`
}

export const parseMegaPokemon = (pokemonName: string): string => {
    if (pokemonName.includes(" ") && pokemonName.includes("Mega")) {
        const names = pokemonName.split(" ");

        const newName = names[0].split(/(?=[A-Z])/);

        if (names.length > 2) {
            return newName.join(" ") + ` ${names[names.length - 1]}`;
        }

        return newName.join(' ');
    }

    return pokemonName;
}

export const parseName = (pokemonName: string): string => {
    const parsedMegaName = parseMegaPokemon(pokemonName);


    return parsedMegaName;
}