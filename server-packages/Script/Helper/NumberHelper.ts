export function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randomNumbers(min: number, max: number, count: number): number[] {
    const numbers: number[] = [];
    for (let i = 0; i < count; i++) {
        numbers.push(randomNumber(min, max));
    }

    return numbers;
}
