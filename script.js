
    const answerBox = document.getElementById('answerBox');
    const calcButtons = document.querySelectorAll('.calcButton');
    
    // Initialize the current expression
    let currentExpression = '';

    // Update display helper function
    function updateDisplay(value) {
      answerBox.textContent = value;
    }

    calcButtons.forEach(button => {
      button.addEventListener('click', function() {
        const value = this.textContent;
        
        // Clear entry
        if (value === 'CE') {
          currentExpression = '';
          updateDisplay('0');
        
        // Evaluate the expression using math.js
        } else if (value === '=') {
          try {
            // compute the expression
            const result = math.evaluate(currentExpression);
            currentExpression = result.toString();
            updateDisplay(currentExpression);
          } catch (error) {
            updateDisplay('Error');
            currentExpression = '';
          }
        
        // Handle percent button
        } else if (value === '%') {
          try {
            // Evaluate the current expression first
            const num = math.evaluate(currentExpression);
            if (!isNaN(num)) {
              const percentValue = num * 0.01;
              currentExpression = percentValue.toString();
              updateDisplay(currentExpression);
            } else {
              updateDisplay('Error');
              currentExpression = '';
            }
          } catch (error) {
            updateDisplay('Error');
            currentExpression = '';
          }
        
        // For all other button inputs
        } else {
          // If initial state is 0, replace it; otherwise append the input
          if (currentExpression === '0') {
            currentExpression = value;
          } else {
            currentExpression += value;
          }
          updateDisplay(currentExpression);
        }
      });
    });
