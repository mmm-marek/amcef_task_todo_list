export function isOverdue(date: Date) {
    const todoItemTime = date.getTime();
    const currentTime = new Date().getTime();
    if (todoItemTime >= currentTime) {
        return false;
    }
    return true;
}
