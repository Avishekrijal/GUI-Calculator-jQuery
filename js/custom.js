jQuery(document).ready(function(){
	
	var firstOperands = 0, secondOperands = 0, result = 0, operatorHold = 0, singleDigit = 0;
// operatorHold is the numeric representation of operators
// singleDigit is the raw input which consists of operators[string] or numbers[number]

	$('#one').click(function(){
		calculation(1);
	});
	$('#two').click(function(){
		calculation(2);
	});
	$('#three').click(function(){
		calculation(3);
	});
	$('#four').click(function(){
		calculation(4);
	});
	$('#five').click(function(){
		calculation(5);
	});
	$('#six').click(function(){
		calculation(6);
	});
	$('#seven').click(function(){
		calculation(7);
	});
	$('#eight').click(function(){
		calculation(8);
	});
	$('#nine').click(function(){
		calculation(9);
	});
	$('#zero').click(function(){
		calculation(0);
	});
	$('#plus').click(function() {
		if (result === 0) {
			operatorHold = 1;
			$('#operator').text(' + ');
		}
	});
	$('#minus').click(function() {
		if (result === 0 && firstOperands != 0) {
			operatorHold = 2;
			$('#operator').html(' &minus; ');
		}else {
			operatorHold = -1;
		}
	});
	$('#multiply').click(function() {
		if (result === 0) {
			operatorHold = 3;
			$('#operator').text(' x ');
		}
	});
	$('#divide').click(function() {
		if (result === 0) {
			operatorHold = 4;
			$('#operator').html(' &div; ');
		}
	});
	$('#equals').click(function() {
		if (result != 0) {
			$('#operands1').text(result);
			firstOperands = result;
			secondOperands = 0;
			operatorHold = 0;
			result = 0;
			$('#operator,#operands2').text(' ');
		}else if (result == 0 && firstOperands != 0 && operatorHold == 0) {
			secondOperands = 0;
			operatorHold = 0;
		}else if (result == 0 && firstOperands == secondOperands && operatorHold == 2) {
			firstOperands = 0;
			secondOperands = 0;
			operatorHold = 0;
		}else if (result === 0 && firstOperands != 0 && operatorHold > 0) {
			secondOperands = 0;
			result = 0;
		}else {
			$('#answer').text(' ');
			firstOperands = 0;
			secondOperands = 0;
			operatorHold = 0;
			result = 0;
			$('#operands1,#operands2,#operator').hide();
			$('#dummyText').show();
		}
	});
	$('#answer').dblclick(function() {
		firstOperands = 0;
		secondOperands = 0;
		$('#operands1,#operands2,#operator').hide();
		$('#dummyText').show();
		result = 0;
		$('#answer').text('00');
		operatorHold = 0;
	});

// this function guides through operands collection
	function calculation(singleDigit){

		if (firstOperands == 0 || firstOperands > 0  && operatorHold === 0) {
			positiveFirstNumerical(singleDigit);
		}else if(operatorHold == -1){
			negativeFirstNumerical(singleDigit);
		}else if (secondOperands === 0 || secondOperands > 0 && firstOperands != 0 && operatorHold > 0) {
			secondNumerical(singleDigit);
		}
		else {
			console.log('ERROR: Invalid integer type !!!');
		}
	}

// this function collects positive singleDigit and creates first operands 
	function positiveFirstNumerical(singleDigit){

		firstOperands = firstOperands * 10 + singleDigit;
		$('#dummyText').hide();
		$('#operands1,#operands2,#operator').show();
		$('#operands2,#operator').text(' ');
		$('#operands1').text(firstOperands);
	}

// this function collects negative singleDigit and creates first operands	
	function negativeFirstNumerical(singleDigit){

		firstOperands = -(Math.abs(firstOperands) * 10 + singleDigit);
		$('#dummyText').hide();
		$('#operands1,#operands2,#operator').show();
		$('#operands2,#operator').text(' ');
		$('#operands1').text(firstOperands);
	}

// this function collects singleDigit and creates second operands
// mathematical operations are also done in here
	function secondNumerical(singleDigit){

		secondOperands = secondOperands * 10 + singleDigit;
		$('#operands2').text(secondOperands);

		switch (operatorHold) {
			case 1:
				result = firstOperands + secondOperands;
				$('#answer').text(result);
				break;
			case 2:
				result = firstOperands - secondOperands;
				$('#answer').text(result);
				break;
			case 3:
				result = firstOperands * secondOperands;
				$('#answer').text(result);
				break;
			case 4:
				result = firstOperands / secondOperands;
				$('#answer').text(result);
				break;
			default:
				console.log('ERROR: Invalid operator type !!!');
		}
	}
});