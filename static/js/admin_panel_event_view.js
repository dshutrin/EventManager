function update_event_status(eid) {
	let val = document.getElementById('started').checked

	let xhr = new XMLHttpRequest();

    xhr.open("POST", "/update_event_status", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.responseType = "json"

    xhr.onload = () => {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

		}
	};

    xhr.send(`eid=${eid}&val=${val}`);

}

function update_mark(team_id, step_id) {
	let val = document.getElementById(`score-${team_id}-${step_id}`).value

	let xhr = new XMLHttpRequest();

    xhr.open("POST", "/set_mark", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.responseType = "json"

    xhr.onload = () => {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

		} else {
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 500) {
				document.getElementById(`score-${team_id}-${step_id}`).value = xhr.response['value']
			}
		}
	};

    xhr.send(`team_id=${team_id}&step_id=${step_id}&val=${val}`);
}
