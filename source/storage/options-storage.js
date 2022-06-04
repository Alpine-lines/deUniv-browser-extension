import OptionsSync from 'webext-options-sync';

export default new OptionsSync({
	defaults: {
		asPdf: false,
		asPdfRemote: false
	},
	migrations: [
		OptionsSync.migrations.removeUnused,
	],
	logging: true,
});
