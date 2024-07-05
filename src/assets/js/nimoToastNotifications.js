let ToastID = 0;

function minimalizeToast(evt) {
	if (!evt.currentTarget.classList.contains('closing') && evt.currentTarget != undefined) {
		evt.currentTarget.classList.toggle("minimalized");
		evt.currentTarget.classList.toggle("maximalized");
	}
}
function closeToastEvt(evt)
{
	closeToast(evt.currentTarget.parentNode.parentNode);
}
function closeToast(task) {
	task.classList.add("closing");
	task.classList.remove("maximalized");
	task.classList.remove("minimalized");
	task.classList.add("closed");
	setTimeout( () => { task.remove();}, 501);
}
function waittodelete(task, time)
{
	setTimeout( () => closeToast(task), time);
}

/* eslint-disable no-unused-vars */
export function toast_notification(params) {
    let devmodeaccess = 0;
	if (localStorage.getItem("nimodevmode") == null || localStorage.getItem("nimodevmode") == undefined) 
        devmodeaccess = 0; 
    else 
    devmodeaccess = localStorage.getItem("nimodevmode");
    
	if (params.dev == undefined) params.dev = 0;
	if (devmodeaccess >= params.dev && params.dev >= 2 )
		{ console.log(params); }
	else if (devmodeaccess >= params.dev && params.dev >= 0 )
	{
		let notifications_div = document.getElementById("toast_notifications");
		if (notifications_div == undefined) {
			notifications_div = document.createElement("Div");
			notifications_div.id = "toast_notifications";
			document.body.appendChild(notifications_div);
		}

        let iconsvg = "";
        let classname = "";

		switch (params.type) {
			case "information":
			case "info":
			case "i":
				iconsvg = "info.svg";
				classname = "information";
				break;
			case "success":
			case "good":
			case "s":
				iconsvg = "success.svg";
				classname = "success";
				break;
			case "alert":
			case "a":
				iconsvg = "alert.svg";
				classname = "alert";
				break;
			case "error":
			case "bad":
			case "e":
				iconsvg = "error.svg";
				classname = "error";
				break;
			case "nimo":
			case "n":
				iconsvg = "nimo.svg";
				classname = "nimo";
				break;
			default:
				iconsvg = "notification.svg";
				classname = "notification";
				break;
		}

        let labeltext = "";

		if (params.label != undefined && params.label != null && params.label != "")
			labeltext = params.label;
		else if (params.type != undefined && params.type != null && params.type != "")
			labeltext = classname;
		else labeltext = "notification";

		let notification = document.createElement("div");
            notification.className = classname;
            if (params.minimalized == 1) notification.className += " minimalized"; else notification.className += " maximalized";
            notification.id = "notification " + ToastID;
            notification.addEventListener('click', (evt) => minimalizeToast(evt));
            notification.params1 = "ToastNotification-"+ToastID;

		let header = document.createElement("div");
            header.className = "header";

            let icon = document.createElement("div");
                icon.className = "icon";
                icon.innerHTML = "<img src=\"https://nimoweb.ddns.net/elements/toastnotifications/img/" + iconsvg + "\" alt=\"" + iconsvg + "\"> </img>";
            header.appendChild(icon);

            let label = document.createElement("div");
                label.className = "label";
                label.innerHTML = labeltext;
            header.appendChild(label);

            let close = document.createElement("div");
                close.className = "button close";
                close.innerHTML = "<img src=\"https://nimoweb.ddns.net/elements/toastnotifications/img/close.svg\" alt=\"close\"> </img>";
                close.addEventListener('click', (evt) => { closeToastEvt(evt); evt.stopPropagation();}); close.params1 = ToastID;
            header.appendChild(close);

		notification.appendChild(header);

        let timeline = "";
        let left = "";
        
		if (params.time != undefined && params.time != null && params.time != "") {

			timeline = document.createElement("div");
			timeline.className = "timeline";
			timeline.style.animationDuration = params.time+"s";
				left = document.createElement("div");
				left.className = "left";
				left.style.animationDuration = params.time+"s";
				timeline.appendChild(left);
			notification.appendChild(timeline);
			waittodelete(notification, params.time*1000);
		}

        let text = "";

		if (params.content != undefined && params.content != null && params.content != "") {
			text = document.createElement("div");
			text.className = "content";
			text.innerHTML = params.content;
			notification.appendChild(text);
		}

		notifications_div.appendChild(notification);

		ToastID++;
	}
}