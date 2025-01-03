// Search result object
interface Result {
	y: number;
	x: number;
	direction: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | '';
	len: number;
}

// Basic utility function to return the indexes of ALL possible results:
// .indexOf() on steroids
const findAll = (list: unknown[], searchTerm): number[] => {
	const hits: number[] = [];
	let ans: number = list.indexOf(searchTerm, 0);
	while (ans !== -1) {
		hits.push(ans);
		ans = list.indexOf(searchTerm, ans + 1);
	}
	return hits;
};

// Searching function to "seed" the search with results for the first value only
// Does not fully seed because does not contain direction
const searchFirst = (
	grid: string[][],
	firstChar: string,
): Result[] => {
	const matches: Result[] = [];

	for (const row of grid.entries()) {
		const currMatches = findAll(row[1], firstChar);
		for (const hit of currMatches.entries()) matches.push(
			{ 'y': row[0], 'x': hit[1], 'direction': '', 'len': 1 },
		);
	}
	return matches;
};

// Searching functions produces actual "seed" results for the second value
// Necessary because this will include a direction as well
const searchSecond = (
	grid: string[][],
	secondChar: string,
	lastResults: Result[],
): Result[] => {
	const matches: Result[] = [];
	for (const hit of lastResults) {
		const y = hit.y;
		const x = hit.x;
		const yMax = y < grid.length - 1;
		const yMin = y >= 0; // There might be an off-by-one error due to this. Try it without the `=` if something doesn't work
		const xMax = x < grid[y].length - 1;
		const xMin = x >= 0; // There might be an off-by-one error due to this. Try it without the `=` if something doesn't work

		if (yMax) {
			if (grid[y + 1][x] === secondChar) {
				matches.push({ 'y': y, 'x': x, 'direction': 'N', 'len': 2 });
			}
		} if (yMax && xMax) {
			if (grid[y + 1][x + 1] === secondChar) {
				matches.push({ 'y': y, 'x': x, 'direction': 'NE', 'len': 2 });
			}
		} if (xMax) {
			if (grid[y][x + 1] === secondChar) {
				matches.push({ 'y': y, 'x': x, 'direction': 'E', 'len': 2 });
			}
		} if (yMin && xMax) {
			if (grid[y - 1][x + 1] === secondChar) {
				matches.push({ 'y': y, 'x': x, 'direction': 'SE', 'len': 2 });
			}
		} if (yMin) {
			if (grid[y - 1][x] === secondChar) {
				matches.push({ 'y': y, 'x': x, 'direction': 'S', 'len': 2 });
			}
		} if (yMin && xMin) {
			if (grid[y - 1][x - 1] === secondChar) {
				matches.push({ 'y': y, 'x': x, 'direction': 'SW', 'len': 2 });
			}
		}
		if (xMin) {
			if (grid[y][x - 1] === secondChar) {
				matches.push({ 'y': y, 'x': x, 'direction': 'W', 'len': 2 });
			}
		}
		if (yMax && xMin) {
			if (grid[y + 1][x - 1] === secondChar) {
				matches.push({ 'y': y, 'x': x, 'direction': 'NW', 'len': 2 });
			}
		}
	}
	return matches;
};

// Search function for when "seeds" are available
const searchCont = (
	grid: string[][],
	word: string[],
	lastResults: Result[],
): Result[] => {
	let matches = lastResults;
	while (word.length && matches.length) {
		lastResults = matches;
		matches = [];
		const searchTerm = word.shift();
		for (const hit of lastResults) {
			const y = hit.y;
			const x = hit.x;
			const yMax = y < grid.length - hit.len;
			const yMin = y >= hit.len;
			const xMax = x < grid[y].length - hit.len;
			const xMin = x >= hit.len;

			switch (hit.direction) {
			case 'N':
				if (yMax) {
					if (grid[y + hit.len][x] === searchTerm) {
						matches.push({
							'y': y,
							'x': x,
							'direction': 'N',
							'len': hit.len + 1,
						});
					}
				}
				break;
			case 'NE':
				if (yMax && xMax) {
					if (grid[y + hit.len][x + hit.len] === searchTerm) {
						matches.push({
							'y': y,
							'x': x,
							'direction': 'NE',
							'len': hit.len + 1,
						});
					}
				}
				break;
			case 'E':
				if (xMax) {
					if (grid[y][x + hit.len] === searchTerm) {
						matches.push({
							'y': y,
							'x': x,
							'direction': 'E',
							'len': hit.len + 1,
						});
					}
				}
				break;
			case 'SE':
				if (yMin && xMax) {
					if (grid[y - hit.len][x + hit.len] === searchTerm) {
						matches.push({
							'y': y,
							'x': x,
							'direction': 'SE',
							'len': hit.len + 1,
						});
					}
				}
				break;
			case 'S':
				if (yMin) {
					if (grid[y - hit.len][x] === searchTerm) {
						matches.push({
							'y': y,
							'x': x,
							'direction': 'S',
							'len': hit.len + 1,
						});
					}
				}
				break;
			case 'SW':
				if (yMin && xMin) {
					if (grid[y - hit.len][x - hit.len] === searchTerm) {
						matches.push({
							'y': y,
							'x': x,
							'direction':
							'SW', 'len': hit.len + 1,
						});
					}
				}
				break;
			case 'W':
				if (xMin) {
					if (grid[y][x - hit.len] === searchTerm) {
						matches.push({
							'y': y,
							'x': x,
							'direction': 'W',
							'len': hit.len + 1,
						});
					}
				}
				break;
			case 'NW':
				if (yMax && xMin) {
					if (grid[y][x - hit.len] === searchTerm) {
						matches.push({
							'y': y,
							'x': x,
							'direction': 'NW',
							'len': hit.len + 1,
						});
					}
				}
				break;
			}
		}
	}
	return matches;
};

/*
Only exported function: combines searchFirst(), searchSecond(), and searchCont()
Serves as one function to manage them all!
Arguments (in order):
 - the grid of letters (mandatory)
 - the word to be searched (mandatory)
 - the last word that has been searched (opt)
 - the result from the last word searched (opt)
*/
const search = (
	grid: string[][],
	word: string,
	lastWord: string,
	lastResults: Result[],
): Result[] => {
	if (!word) throw 'No word provided.';
	const searchChars = word.split('');
	let results = [];

	if (!(lastWord && lastResults && !word.indexOf(lastWord))) {
		results = searchFirst(grid, searchChars.shift());
		if (!results.length) return [];
		if (!searchChars.length) return results;
	} else {
		searchChars.splice(0, lastWord.length);
		results = lastResults;
	}

	if (results[0].len === 1) {
		results = searchSecond(grid, searchChars.shift(), results);
		if (!results.length) return [];
		if (!searchChars.length) return results;
	}
	results = searchCont(grid, searchChars, results);
	if (!results.length) return [];
	return results;
};

export default search;