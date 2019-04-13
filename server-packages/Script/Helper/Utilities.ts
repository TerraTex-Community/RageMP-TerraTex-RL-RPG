export async function wait(timeInMs) {
    await new Promise((resolve => setTimeout(resolve, timeInMs)));
}
