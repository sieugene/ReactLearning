import React from 'react';

const Dialogs = (props) => {
    return(
        <div>
            Dialogs
            <div><button onClick={()=> {props.startChattingThunk(2)}}>StartChatting</button></div>
            with user with id 2
            <hr/>
            <div>
                <button onClick={()=>{props.getAllDialogsThunk()}}>
                    Get all Dialogs
                </button>
                <div>
                    <h3>All dialogs list</h3>
                    {props.listDialogs.map(dialog =>
                        <div key={dialog.id}>
                            <div>
                                Id user: {dialog.id}
                            </div>
                            <div>
                                UserName: {dialog.userName}
                            </div>
                            <div>
                                Has New Message: {dialog.hasNewMessages ? 'Yes' : 'No'}
                            </div>
                            <div>
                                Last Dialog Activity Data: {dialog.lastDialogActivityDate}
                            </div>
                            <div>
                                last User Activity Date: {dialog.lastUserActivityDate}
                            </div>
                            <div>
                                new Messages Count: {dialog.newMessagesCount}
                            </div>
                            <div>
                                {!dialog.photos.small || !dialog.photos.large ? 'no img' :
                                <img src={dialog.photos.small} alt=''/> || <img src={dialog.photos.large} alt=''/>
                                }
                            </div>
                        </div>)}
                </div>
            </div>
           <hr/>
            <div>
                <h3>get List message with Friends[params userId 2]</h3>
                <button onClick={()=> {props.getListMessagesWithFriendThunk(2)}}>get</button>
                {props.messagesWithFriends.items.length === 0 ? 'no messages friends' :
                    props.messagesWithFriends.items.map(m => <div key={m.id}>
                        <div>Id: {m.id}</div>
                        <div>Body: {m.body}</div>
                        <div>AddedAt: {m.addedAt}</div>
                        <div>SenderId: {m.senderId}</div>
                        <div>SenderName: {m.senderName}</div>
                        <div>recipientId: {m.recipientId}</div>
                    </div>)
                }
            </div>
            <hr/>
            <div>
                <h3>Send message to Friend</h3>
                <h5>To userId 2 and message: test</h5>
                <button onClick={() => {props.sendMessageToFriendThunk(2,'test2')}}>Send</button>
            </div>
            <hr/>
            {props.messages.length === 0 ?
                <div>No messages</div>
                :
                props.messages
            }
        </div>
    )
}

export default Dialogs;