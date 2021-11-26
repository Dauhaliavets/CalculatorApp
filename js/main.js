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

function addNumbInOutput(btn, output) {
	let value = btn.textContent;
	output.textContent += value;
	checkLengthOutputString(outputBlock);
}

function checkLengthOutputString(output) {
	let outputStr = output.textContent;
	let len = outputStr.length;

	if (len <= 5) {
		output.style.fontSize = '96px';
	} else if (len > 5 && len <= 11) {
		output.style.fontSize = '48px';
	} else if (len > 11) {
		output.style.fontSize = '29px';
	}
}

for (let i = 0; i < btnsAction.length - 1; i++) {
	btnsAction[i].addEventListener('click', () => {
		addOperationInOutput(i);
	});
}

function addOperationInOutput(i) {
	const isSingleOperation = !outputBlock.textContent.match(REGEXP_OPERATION);
	let operationValue = btnsAction[i].textContent;

	if (isSingleOperation) {
		outputBlock.textContent += operationValue;
		checkLengthOutputString(outputBlock);
	}
}

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

function calc(output) {
	const { operation, fNum, sNum } = parseOutputString(output);

    console.log('operation: ', !!operation)
    console.log('fNum: ', !!fNum)
    console.log('sNum: ', !!sNum)

    const isValidParam = !!operation && fNum !== NaN && sNum !== NaN && !!sNum;

    if(isValidParam) {
		const operations = {
			'−': fNum - sNum,
			'+': +fNum + +sNum,
			'×': fNum * sNum,
			'÷': sNum === 0 ? 'cannot divide by zero' : fNum / sNum,
		};

        console.log(operations[operation])

		outputBlock.innerHTML = operations[operation];

		checkLengthOutputString(outputBlock);
    }
}

function parseOutputString(output) {
	let outputStr = output.textContent;

	return {
		operation: outputStr.match(REGEXP_OPERATION),
		fNum: +outputStr.split(REGEXP_OPERATION)[0],
		sNum: +outputStr.split(REGEXP_OPERATION)[1],
	};
}
