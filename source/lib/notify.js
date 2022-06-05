// import "browser-polyfill.js";

export const notify = notification => {
    if (!notification) {
		return;
	}

	if (notification.status === 'success') {
		chrome.notifications.create(
			'Success!',
			{
				type: 'basic',
				icon: 'icon.png',
				title: 'SUCCESS!',
				message: 'DeUniv successfully cached ' + notification.title + ' ("' + notification.type + '")!',
                buttons: [ 
					// TODO: refer to docs -- implement with notification.url
                ],
			},
			notificationId => console.log(notificationId),
		);
	} else {
		chrome.notifications.create(
			'Error!',
			{
				type: 'basic',
				icon: 'icon.png',
				title: 'ERROR!',
				message: 'DeUniv failed to cache ' + notification.title + ' {"' + notification.type + '")!',
                buttons: [
					// TODO: refer to docs -- implement with notification.url
                ],
			},
			notificationId => {console.log(notificationId)},
		);
	}
};

export default notify;
