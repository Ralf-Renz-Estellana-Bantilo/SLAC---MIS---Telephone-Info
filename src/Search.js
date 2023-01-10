import React, { useState, useEffect } from "react";
import SEARCHICON from "./assets/searchIcon.png";
import useData from "./useData";

const Search = () => {
	const [text, setText] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const data = useData.getData();
	useEffect(() => {
		if (text === "") {
			setSearchResult(data);
		} else {
			setSearchResult([]);
			let holdResult = [];
			for (let a = 0; a < data.length; a++) {
				const { information } = data[a];
				let holdInformation = [];
				let hasFound = false;
				for (let b = 0; b < information.length; b++) {
					const {id, phoneAssignment, department, phoneNumber, name } =
						information[b];
					if (
						`${phoneAssignment}`
							.toLowerCase()
							.includes(`${text}`.toLowerCase()) ||
						`${department}`
							.toLowerCase()
							.includes(`${text}`.toLowerCase()) ||
						`${phoneNumber}`
							.toLowerCase()
							.includes(`${text}`.toLowerCase()) ||
						`${name}`
							.toLowerCase()
							.includes(`${text}`.toLowerCase())
					) {
						const info = {
							id,
							phoneAssignment,
							department,
							phoneNumber,
							name,
						};
						holdInformation.push(info);
						hasFound = true;
					}
				}
				const result = {
					id: data[a].id,
					title: data[a].title,
					information: holdInformation,
				};

				if (hasFound) {
					holdResult.push(result);
					setSearchResult(holdResult);
				}
			}
		}
	}, [text]);

	return (
		<div className='search-container'>
			<div className='search-bar'>
				<div className='search-input'>
					<input
						autoFocus
						type='text'
						placeholder='Search here...'
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<img src={SEARCHICON} alt='searchIcon' />
				</div>
			</div>
			<div className='search-results'>
				{searchResult.map((data, index) => {
					const { information } = data;
					return (
						<div className='search-result' key={index}>
							<table>
								<caption className='text-white bg-primary-200'>
									{data.title}
								</caption>
								<tr>
									<th style={{ width: "50px" }}>#</th>
									<th style={{ width: "150px" }}>Phone Assignment</th>
									<th>Name</th>
									<th style={{ width: "150px" }}>Department</th>
									<th style={{ width: "100px" }}>Local Phone No</th>
								</tr>
								{information.map((info) => {
									return (
										<tr key={info.id}>
											<td>{info.id}</td>
											<td>{info.phoneAssignment}</td>
											<td>{info.name}</td>
											<td>{info.department}</td>
											<td>{info.phoneNumber}</td>
										</tr>
									);
								})}
							</table>
						</div>
					);
				})}

				{searchResult.length < 1 && (
					<h4 style={{ textAlign: "center" }}>No Results Found</h4>
				)}
			</div>
		</div>
	);
};

export default Search;
