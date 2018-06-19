function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	if (!ev.target.getAttribute("ondrop"))
		return false;
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
}

function handleDrop(event) {
	// ERRO FIREFOX - DROP
	if(event.preventDefault) { event.preventDefault(); }
	if(event.stopPropagation) { event.stopPropagation(); }
	// ERRO FIREFOX - DROP

	// return when dropping non-vis items
	try {
		var itemData = JSON.parse(event.dataTransfer.getData("text"))
		if (!itemData.content) return
	} catch (err) {
		return false;
	}
	itemAddedToTimeline = false;
	event.center = {
		x: event.clientX,
		y: event.clientY
	}
	me.itemSet._onAddItem(event);
	return false;
}
