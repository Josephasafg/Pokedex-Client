const FEMALE_CHAR = "♀";
const MALE_CHAR = "♂";
const SPACE = " ";
const FORME = "Forme";


export const createIconURL = (baseURL: string, name: string) => {
    let newName = name;

    if (name.includes(FEMALE_CHAR)) {
        newName = `${newName.replace(FEMALE_CHAR, "")} F`;
    }

    if (newName.includes(MALE_CHAR)) {
        newName = `${newName.replace(MALE_CHAR, "")} M`;
    }

    if (newName.includes(".")) {
        newName = newName.replace(".", "");
    }

    let currentName = parseMegaPokemon(newName);

    if (currentName.includes(FORME)) {
        currentName = currentName.replace(FORME, "")

        if (currentName.includes("%")) {
            // @ts-ignore
            currentName = currentName.replace("%", "");
        }
    }

    if (currentName.includes("Size")) {
        currentName = currentName.replace("Size", "");
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