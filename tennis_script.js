const set = [ 709.42,  717.5 ,  751.62,  780.98,  809.32,  820.72,  849.52,
        877.52,  922.34,  951.7 ,  978.12, 1012.54, 1022.46, 1053.98,
       1079.52, 1104.54, 1148.38, 1175.76, 1198.32, 1208.46, 1234.24,
       1254.12, 1278.7 , 1306.32, 1337.1 , 1464.4 , 1473.12, 1490.06,
       1508.08, 1518.4 , 1539.38, 1559.98, 1588.2 , 1628.52, 1640.86,
       1673.54, 1685.24, 1716.2 , 1744.34, 1777.1 , 1790.06, 1813.46,
       1843.94, 1964.34, 1987.22, 2008.9 , 2031.48, 2055.52, 2065.96,
       2097.88, 2140.64, 2164.14, 2190.58, 2207.12, 2234.9 , 2353.12,
       2372.16, 2391.84, 2416.82, 2436.8 , 2453.34, 2462.08, 2497.06,
       2509, 2539.94, 2566.16, 2594.02, 2629.98];


let aud = document.getElementsByTagName('stream')[0]
aud.currentTime = 0;


function closest(arr, closestTo){

var closest = Math.max.apply(null, arr);

for(var i = 0; i < arr.length; i++){
    if(arr[i] >= closestTo && arr[i] < closest) closest = arr[i];
}

return closest;
}

function closest_min(arr,val){
    return Math.max.apply(null, arr.filter(function(v){return v <= val}))
}



let next_point = document.getElementById('next_point');
let replay_point = document.getElementById('replay_point');
let prev_point = document.getElementById('prev_point');

next_point.addEventListener('click', nextPoint(set));
replay_point.addEventListener('click', replayPoint(set));
prev_point.addEventListener('click', prevPoint(set));

function nextPoint(set) {

	next_point.onclick = function() {
		
	let val = aud.currentTime;
	aud.currentTime = closest(set, val);
	aud.play();
	}
}

function replayPoint(set) {

	replay_point.onclick = function() {

	let val = aud.currentTime;
	aud.currentTime = closest_min(set,val);
	aud.play();
	}
}

function prevPoint(set) {

	prev_point.onclick = function() {

	let val = aud.currentTime;
	aud.currentTime = closest_min(set,closest_min(set,val)-1);
	aud.play();
	}
}



(function(d) {
   'use strict';
	
   var but = document.getElementById('myTable').getElementsByTagName('button');

   for ( var c = 0; c < but.length; c ++ ) {
      but[c].addEventListener('click',setCurTime(c), false);
      } 
     
 function setCurTime(c) {  
   but[c].onclick = function() { 
      aud.currentTime = set[c];
      aud.play();      
         }
      }
 }(document));


	
var filters = document.getElementsByClassName("filter");
//console.log(filters[0].value);


let queries = {
	server:"all",
	side:"all",
	serve_direction:"all",
	first_serve:"all",
	serve_formation:"all",
	shot_number:"",
	player:"",
	shot_type:"",
	shot_direction:"",
	winner:"all",
	num_shots:"all"
};


let resetBtn = document.getElementById("clear_filter");

resetBtn.addEventListener('click', resetQueries());

function resetQueries() {
	
	resetBtn.onclick = function() {
	queries.server="all";
	queries.side="all";
	queries.serve_direction="all";
	queries.first_serve="all";
	queries.serve_formation="all";
	queries.shot_number="";
	queries.player="";
	queries.shot_type="";
	queries.shot_direction="";
	queries.winner="all";
	queries.num_shots="all";	
	console.log(queries);
	filterTable(queries);
	let elements = document.getElementsByTagName('select');
	let inputs = document.getElementsByTagName('input');
	for(let i = 0; i < elements.length; i++) {
		inputs[i].value =  "";
	}
	for(let i = 0; i < elements.length; i++){
		elements[i].selectedIndex = 0;
	}
}
}
for ( let f of filters) {
	
	//console.log(f.id, f.value);
	f.addEventListener('change', updateQuery(f));
}
function updateQuery(f) {
		f.onchange = function() {
			
			queries[f.id] = f.value || f.data-name;
			console.log(queries);
			filterTable(queries);
			countRows();
	};
}

function countRows() {

	let table = document.getElementById("myTable");
    let rows = table.getElementsByTagName("tr");
	let output = document.getElementById("stats");
	let rowCount = 0;
	let serveWins = 0;
	let returnWins = 0;

	for (let i = 1; i < rows.length; i++ ) {
		//console.log(rows[i].getElementsByTagName("td")[5].textContent);
		if (rows[i].style.display == 'none') continue;
		if (rows[i].getElementsByTagName("td")[5].textContent == "Returner") {
			returnWins ++;
			rowCount++;
		}
		if (rows[i].getElementsByTagName("td")[5].textContent == "Server") {
			serveWins ++;
			rowCount ++;
		}
		}
		output.textContent = "Server wins: " + serveWins + "/" + rowCount;
}


function filterRow(element, property) {
	
		return (queries[property] === "all" || !element || queries[property] == element.textContent || element.textContent.includes(queries[property] || queries[property]) || queries[property].includes(element.textContent))
		}

function filterRow2(element, property) {
		
		return (queries[property] === "" || !element || queries[property] == element || element.includes(queries[property]))
		}

function filterRowShots(element, property) {
		
		return (queries[property] === "all" || !element || 
element.textContent >= queries[property][0] && element.textContent <= queries[property][2]) 
}


function filterShots(shot_list) {
		
		match = false;
		if (shot_list && shot_list.textContent.length > 1) {
			let shot_array = shot_list.textContent.split("_");//
			
			for (let shot of shot_array) {
				shot_list = shot.split(" ");
				//console.log(shot_list[1],shot_list[1].includes(queries["shot_type"]));
				if (filterRow2(shot_list[0], "shot_number") && filterRow2(shot_list[1],"shot_type") &&  filterRow2(shot_list[2],"player") && filterRow2(shot_list[3],"shot_direction")) {
					match = true;
				}
	
	}
	if (shot_list.textContent === "") {
		match = false;
	}
	
		return match
}
}


function filterTable(queries) {

	let table, rows, filter_columns, shots, i;

	table = document.getElementById("myTable");
    rows = table.getElementsByTagName("tr");
	

	for (let row of rows) {
		
		tds = row.getElementsByTagName("td");
		
		let match = filterShots(tds[8])
		if (queries.shot_number === "" && queries.player === "" && 
			queries.shot_type === "" && queries.shot_direction === "") {
		match = true;
		}
		if (filterRow(tds[1], "server")&&filterRow(tds[2],"side")&&filterRow(tds[3],"serve_direction") && filterRow(tds[4],"first_serve")&&filterRow(tds[7],"serve_formation")&&filterRow(tds[5],"winner")
&&filterRowShots(tds[6],"num_shots") && match==true){

			row.style.display = "";
		}
		else {
			row.style.display = "none";
		
		}

        
		if (row.rowIndex == 0) {
			row.style.display = "";
		}
	
}

}


