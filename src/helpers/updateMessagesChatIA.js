

export const updateMessagesChatIA = ({prevMessages, delta}) => {
    const lastMessageIndex = prevMessages.length - 1;
    const lastMessage = prevMessages[lastMessageIndex];
    if (lastMessage.role === "assistant") {
        const updatedMessage = {
        ...lastMessage,
        content: lastMessage.content + (delta.content || '')
        };
        return [
            ...prevMessages.slice(0, lastMessageIndex),
            updatedMessage
        ];
    } else {
        return [
            ...prevMessages,
            { role: "assistant", content: delta.content || '' }
        ];
    }
}