export async function wait(timeInMs: number): Promise<void> {
    await new Promise((resolve => setTimeout(resolve, timeInMs)));
}
