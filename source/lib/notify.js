function notify(options) {
    if (!options) return;
	
	if (options.status === 'success') {
		chrome.notifications.create(
			'Success!',
			{
				type: 'basic',
				icon: 'icon.png',
				title: "SUCCESS!",
				message: 'DeUniv successfully cached ' + options.name + ' "' + options.type + '" @ `' + options.path + '`',
                buttons: [ // TODO: refer to docs -- implement with options.url

                ]
			},
			(notificationId) => console.log(notificationId)
		);
	} else {
		chrome.notifications.create(
			'Error!',
			{
				type: 'basic',
				icon: 'icon.png',
				title: 'ERROR!',
				message: 'DeUniv failed to cache ' + options.name + ' "' + options.type + '" @ `' + options.path + '`',
                buttons: [ // TODO: refer to docs -- implement with options.url

                ]
			},
			(notificationId) => console.log(notificationId)
		);
	}
}

export default {
    notify
};