/* let dropbox;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

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

	const dt = e.dataTransfer;
	const files = dt.files;

	handleFiles(files);
}

const handleFiles = files => {

	console.log(files);
} */

const uploader = document.getElementById('dropbox');
uploader.addEventListener('change', handleFiles, false);

// const uploadedFile = document.getElementById('dropbox').files[0];

function handleFiles() {
	const fileList = this.files;
	console.log(fileList);
}