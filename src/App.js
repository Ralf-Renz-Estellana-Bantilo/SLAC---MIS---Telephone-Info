import "./App.css";
import React, { Component } from "react";
import Search from "./Search";

export class App extends Component {
	render() {
		return (
			<div className='app'>
					<Search />
			</div>
		);
	}
}

export default App;
