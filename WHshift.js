function convert() {
  const value = parseFloat(document.getElementById('inputValue').value);
  const min = parseFloat(document.getElementById('minVal').value);
  const max = parseFloat(document.getElementById('maxVal').value);
  const signalType = document.querySelector('input[name="signalType"]:checked').value;
  const direction = document.querySelector('input[name="direction"]:checked').value;
  const resultEl = document.getElementById('result');

  if (isNaN(value) || isNaN(min) || isNaN(max)) {
    resultEl.innerText = 'Converted Value: —';
    return;
  }

  let result;

  if (direction === 'signalToEng') {
    if (signalType === 'ma') {
      if (value < 4 || value > 20) {
        resultEl.innerText = 'Input must be between 4 and 20 mA.';
        return;
      }
      result = ((value - 4) / 16) * (max - min) + min;
    } else {
      if (value < 0 || value > 10) {
        resultEl.innerText = 'Input must be between 0 and 10 V.';
        return;
      }
      result = (value / 10) * (max - min) + min;
    }
  } else if (direction === 'engToSignal') {
    if (value < min || value > max) {
      resultEl.innerText = `Value must be between ${min} and ${max}.`;
      return;
    }
    if (signalType === 'ma') {
      result = ((value - min) / (max - min)) * 16 + 4;
    } else {
      result = ((value - min) / (max - min)) * 10;
    }
  }

  const unit = direction === 'signalToEng' ? 'units' : (signalType === 'ma' ? 'mA' : 'V');
  resultEl.innerText = `Converted Value: ${result.toFixed(2)} ${unit}`;
}

// Update input label depending on mode
function updateInputLabel() {
  const direction = document.querySelector('input[name="direction"]:checked').value;
  const label = document.getElementById('inputLabel');
  label.innerText = direction === 'signalToEng' ? 'Input Signal:' : 'Engineering Value:';
}

// Add listeners
document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      updateInputLabel();
      convert();
    });
    input.addEventListener('change', () => {
      updateInputLabel();
      convert();
    });
  });

  updateInputLabel();
});
