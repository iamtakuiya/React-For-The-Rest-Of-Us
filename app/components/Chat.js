import React, { useEffect, useContext, useRef } from 'react';
import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';
import { useImmer } from 'use-immer';
useImmer;

function Chat() {
	const chatField = useRef(null);
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);
	const [state, setState] = useImmer({
		fieldValue: '',
		chatMessages: []
	});

	useEffect(() => {
		if (appState.isChatOpen) {
			chatField.current.focus();
		}
	}, [appState.isChatOpen]);

	function handleFieldChange(e) {
		const value = e.target.value;
		setState((draft) => {
			draft.fieldValue = value;
		});
	}

	function handleSubmit(e) {
		e.preventDefault();

		// Send message to chat server

		// alert(state.fieldValue);
		setState((draft) => {
			// Add message to state collection of messages
			draft.chatMessages.push({
				message: draft.fieldValue,
				username: appState.user.username,
				avatar: appState.user.avatar
			});
			draft.fieldValue = '';
		});
	}

	return (
		<div
			id="chat-wrapper"
			className={
				'chat-wrapper shadow border-top border-left border-right ' +
				(appState.isChatOpen ? 'chat-wrapper--is-visible' : '')
			}
		>
			<div className="chat-title-bar bg-primary">
				Chat
				<span
					onClick={() => appDispatch({ type: 'closeChat' })}
					className="chat-title-bar-close"
				>
					<i className="fas fa-times-circle"></i>
				</span>
			</div>
			<div id="chat" className="chat-log">
				{state.chatMessages.map((message, index) => {
					if (message.username == appState.user.username) {
						return (
							<div className="chat-self">
								<div className="chat-message">
									<div className="chat-message-inner">{message.message}</div>
								</div>
								<img className="chat-avatar avatar-tiny" src={message.avatar} />
							</div>
						);
					}

					return (
						<div className="chat-other">
							<a href="#">
								<img
									className="avatar-tiny"
									src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"
								/>
							</a>
							<div className="chat-message">
								<div className="chat-message-inner">
									<a href="#">
										<strong>barksalot:</strong>
									</a>
									Hey, I am good, how about you?
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<form
				onSubmit={handleSubmit}
				id="chatForm"
				className="chat-form border-top"
			>
				<input
					value={state.fieldValue}
					onChange={handleFieldChange}
					ref={chatField}
					type="text"
					className="chat-field"
					id="chatField"
					placeholder="Type a message…"
					autoComplete="off"
				/>
			</form>
		</div>
	);
}

export default Chat;
