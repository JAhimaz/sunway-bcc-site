import { AnimalNames, Colours } from "./GenerativeData"

export const GenerateUsername = () => {
    const randomAnimalIndex = Math.floor(Math.random() * AnimalNames.length)
    const randomColourIndex = Math.floor(Math.random() * Colours.length)
    const name = Colours[randomColourIndex] + AnimalNames[randomAnimalIndex] + Math.floor(Math.random() * 100)
    
    return name;
}

export default GenerateUsername;