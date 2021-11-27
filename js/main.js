'use strict';

const outputBlock = document.querySelector('.output__block');
const btnClear = document.querySelector('.btn__clear');
const btnBackspace = document.querySelector('.btn__backspace');
const btnsNumb = document.querySelectorAll('.btn__numb');
const btnsAction = document.querySelectorAll('.btn__action');
const btnActionEquals = document.querySelector('.btn__action-equals');

const REGEXP_OPERATION = /÷|×|\+|−/gm;

btnsNumb.forEach((btn) => {
	btn.addEventListener('click', () => {
		addNumbInOutput(btn, outputBlock);
	});
});

btnsAction.forEach((btn) => {
	btn.addEventListener('click', () => {
		addOperationInOutput(btn, outputBlock);
	});
});

btnClear.addEventListener('click', () => {
	outputBlock.textContent = '';
	checkLengthOutputString(outputBlock);
});

btnBackspace.addEventListener('click', () => {
	let value = outputBlock.textContent;

	if (!!value) {
		outputBlock.textContent = value.slice(0, -1);
	} else {
		checkLengthOutputString(outputBlock);
	}
});

btnActionEquals.addEventListener('click', () => {
	calc(outputBlock);
});

function addNumbInOutput(btn, output) {
	let valueBtn = btn.textContent;

	output.textContent += valueBtn;
	checkLengthOutputString(output);
}

function addOperationInOutput(btn, output) {
	let operationValue = btn.textContent;
	let outputValue = output.textContent;
	let isSingleOperation = !outputValue.match(REGEXP_OPERATION);

	if (isSingleOperation) {
		output.textContent += operationValue;
		checkLengthOutputString(output);
	}
}

function checkLengthOutputString(output) {
	let outputValue = output.textContent;
	let len = outputValue.length;

	if (len > 11) {
		output.style.fontSize = '29px';
	} else if (len > 5 && len <= 11) {
		output.style.fontSize = '48px';
	} else {
		output.style.fontSize = '96px';
	}
}

function calc(output) {
	const { operation, fNum, sNum } = parseOutputString(output);
	const isValidParam = !!operation && fNum !== NaN && fNum !== undefined && sNum !== NaN && sNum !== undefined;

	if (isValidParam) {
		const operations = {
			'−': fNum - sNum,
			'+': +fNum + +sNum,
			'×': fNum * sNum,
			'÷': +sNum === 0 ? 'cannot divide by zero' : fNum / sNum,
		};

		outputBlock.textContent = operations[operation];

		checkLengthOutputString(outputBlock);
	}
}

function parseOutputString(output) {
	let outputStr = output.textContent;

	return {
		operation: outputStr.match(REGEXP_OPERATION),
		fNum: outputStr.split(REGEXP_OPERATION)[0],
		sNum: outputStr.split(REGEXP_OPERATION)[1],
	};
}
