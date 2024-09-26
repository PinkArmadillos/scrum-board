import React, { useState, useEffect, createContext,useContext } from 'react';
import Scrumboard from './Scrumboard';
import Forms from './Forms';
import {userContext,teamContext} from '../context'



export const dragContext = createContext();

export default function MainContainer() {
	const [stories, setStories] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [dragid, setDragId] = useState(0);
	const {team} = useContext(teamContext);

	useEffect(() => {
		getData();
		console.log('use effect')
	}, []);

	function newDragStatus(newStatus) {
		fetch('/api/task', {
			method: 'PATCH',
			body: JSON.stringify({
				status: newStatus,
				task_id: dragid,
			}),
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then(() => {
				getData();
			})
			.catch((err) => {
				console.log({ err: `Error updating task status: ${err}` });
			});
	}

	function handleOnDrag(e) {
		setDragId(e.target.id);
	}

	function handleDrop(e) {
		const id = !e.target.id ? e.currentTarget.id : e.target.id;
		if (id === 'stories') {
			return;
		}
		newDragStatus(id);
	}

	function getData() {
		fetch('/api/',{
			method:'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({team_id: team})
		} )
			.then((data) => data.json())
			.then((data) => {
				console.log(data, 'this is the response from server');
				setStories(data.stories);
				console.log(data.stories);
				setTasks(data.tasks);
			})
			.catch((err) => {
				console.log({ err: `Error fetching task and story data: ${err}` });
			});
	}

	// RENDER MAINCONTAINER
	return (
		<dragContext.Provider
			value={{
				handleOnDrag,
				handleDrop,
				getData,
			}}>
			<div className='mainContainer'>
				<Forms storyList={stories} />
				<Scrumboard storyList={stories} taskList={tasks} />
			</div>
		</dragContext.Provider>
	);
}
