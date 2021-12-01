'use strict';

const outputBlock = document.querySelector('.output__block');
const btnClear = document.querySelector('.btn__clear');
const btnBackspace = document.querySelector('.btn__backspace');
const btnsNumb = document.querySelectorAll('.btn__numb');
const btnsAction = document.querySelectorAll('.btn__action');
const btnEquals = document.querySelector('.btn__equals');

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
	clickClear(outputBlock);
});

btnBackspace.addEventListener('click', () => {
	clickBackspace(outputBlock);
});

btnEquals.addEventListener('click', () => {
	calculate(outputBlock);
});

function clickClear(output){
	output.textContent = '';
	checkLengthOutputString(output);
}

function clickBackspace(output){
	let outputValue = output.textContent;

	if (!!outputValue) {
		output.textContent = outputValue.slice(0, -1);
	}

	checkLengthOutputString(output);
}

function addNumbInOutput(btn, output) {
	let valueBtn = btn.textContent;
	let outputStr = output.textContent;
	let secondPartOutputStr;

	if (outputStr.match(REGEXP_OPERATION) === null) {
		if (outputStr === '0') {
			output.textContent = '' + valueBtn;
		} else {
			output.textContent += valueBtn;
		}
	} else {
		secondPartOutputStr = outputStr.split(REGEXP_OPERATION)[1];
		if (secondPartOutputStr === '') {
			output.textContent += valueBtn;
		} else if (secondPartOutputStr === '0') {
			output.textContent = outputStr.slice(0, -1) + valueBtn;
		} else {
			output.textContent += valueBtn;
		}
	}
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

function parseOutputString(output) {
	let outputValue = output.textContent;

	return {
		operation: outputValue.match(REGEXP_OPERATION),
		fNum: outputValue.split(REGEXP_OPERATION)[0],
		sNum: outputValue.split(REGEXP_OPERATION)[1],
	};
}

function calculate(output) {
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
	} else {
		outputBlock.textContent = '0';
	}
	checkLengthOutputString(outputBlock);
}