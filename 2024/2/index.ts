import { readFileForDay } from '../fileHelper.js';

export async function main2() {
    const fileData = await readFileForDay(2);

    const reports: number[][] = fileData
        .map(l => l
            .split(' ')
            .map(v => parseInt(v)));

    const numSafe1 = reports.filter(input => isGraduallyChanging(input)).length;
    const numSafe2 = reports.filter(input => isGraduallyChangingWithDampening(input)).length;

    console.log('2A', numSafe1);
    console.log('2B', numSafe2);
    console.log('--------')
}

function isGraduallyChangingWithDampening(input: number[]) {
    if (isGraduallyChanging(input)) {
        // Does not need dampening
        return true;
    }

    for (let i = 0; i < input.length; i++) {
        const newInput = [...input];
        newInput.splice(i, 1);
        if (isGraduallyChanging(newInput)) {
            return true;
        }
    }

    return false;
}

function isGraduallyChanging(input: number[]) {
    const isUp = input.every((v, i, a) => i === 0 || (v - a[i - 1] >= 1 && v - a[i - 1] <= 3));
    const isDown = input.every((v, i, a) => i === 0 || (a[i - 1] - v >= 1 && a[i - 1] - v <= 3));

    return isUp || isDown;
}
