let dropbox = document.getElementById('dropbox');
// dropbox.addEventListener('change', handleFiles, false);

dropbox.addEventListener('dragenter', dragenter, false);
dropbox.addEventListener('dragover', dragover, false);
dropbox.addEventListener('drop', drop, false);
// const uploadedFile = document.getElementById('dropbox').files[0];
function dragenter(e) {
	e.stopPropagation();
	e.preventDefault();
}

function dragover(e) {
	e.stopPropagation();
	e.preventDefault();
}

function drop(e) {
	e.stopPropagation();
	e.preventDefault();

	// const dt = e.dataTransfer;
	// const file = dt.files;

	const filieInput = document.getElementById('dropbox')
	const file = filieInput.files[0];

	handleFiles(file);
}


function handleFiles(file) {
	const month = $('#monthSelect').val();
	const year = $('#yearSelect').val();

	const formData = new FormData();

	formData.append('file', file);
	formData.append('month', month);
	formData.append('year', year);

	fetch('backend/import.php', {
		method: 'POST',
		body: formData
	})
	.then(response => response.json())
	.then(success => {
		console.log(success);
		if (success.status === 'success') {
			$('#dropbox').val('');
			alert('success!');
		}
	})
	.catch(e => console.log(e));
}