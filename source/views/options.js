import 'webext-base-css';
import '../styles/styles.css';
import '../styles/options.css';
import '../storage/options-storage.js';

const asPdfDefault = document.querySelector('#as-pdf-default');
const defaultSubmit = document.querySelector('#default-submit');

const init = async () => {
	const options = await optionsStorage.getAll();

	asPdfDefault.value = options.asPdfDefault;
	defaultSubmit.addEventListener('click', handleSubmit);
};

export const refreshOptions = async () => 	optionsStorage.syncForm('#options-form');

init(
);
