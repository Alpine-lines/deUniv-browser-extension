import OptionsSync from 'webext-options-sync';

/* Global OptionsSync */

export const initOptionStorage = () => {
	if (!window) {
		return;
	}

	window.optionStorage = new OptionsSync({
		defaults: {
			asPdf: false,
		},
		migrations: [
			OptionsSync.migrations.removeUnused,
		],
		logging: true,
	});
};

export const refreshOptions = async () => 	optionsStorage.syncForm('#options-form');

export default getOptions = async () => await window.optionStorage.getOptions();

// export const optionsStorage = {
	// initOptionStorage,
	// refreshOptions,
	// getOptions,
// };
