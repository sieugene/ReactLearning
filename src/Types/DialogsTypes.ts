export type InitialStateType = {
    listDialogs: [];
    messagesWithFriend: {
        items: [],
        totalCount: number | null
    };
    countNesMessages: number | null;
    currentUserInChat: [];
    loading: boolean;
}