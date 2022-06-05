// import './options.css';
// import 'webext-base-css';
// import "browser-polyfill.js";
import getOptions from '../storage/options-storage';

const asPdfDefault = document.querySelector('#as-pdf-default');
const defaultSubmit = document.querySelector('#default-submit');

const init = async () => {
	const options = await getOptions();
	asPdfDefault.value = options.asPdfDefault;
	defaultSubmit.addEventListener('click', handleSubmit);
};

const handleSubmit = async () => {
	await window.optionStorage.set({
		asPdfDefault: asPdfDefault.value,
	});
};

init();
