(function () {
  let dataTableArray = []; // eslint-disable-line
  // wanna keep it non const
  // to say be an empty [] if necessary
  const formElem = {
    input: {
      NameElem: document.getElementById('billForm__name'),
      AmountElem: document.getElementById('billForm__amount'),
      DateElem: document.getElementById('billForm__date'),
      TypeElem: document.getElementById('billForm__type'),
    },
    buttonResetElem: document.getElementById('billForm__reset'),
    buttonSaveElem: document.getElementById('billForm__save'),
  };
  const tableElem = {
    buttonNameElem: document.getElementById('billTable_name'),
    buttonTypeElem: document.getElementById('billTable_type'),
    buttonAmountElem: document.getElementById('billTable_amount'),
    divDataElem: document.getElementById('billTable__data'),
  };
  const summationElem = {
    sectionParent: document.getElementById('billSummation'),
  };
  function updateSummation() {
    summationElem.sectionParent.innerHTML = '';
    for (const option of formElem.input.TypeElem.children) {
      const h4 = document.createElement('h4');
      const span = document.createElement('span');
      let summation = 0;
      h4.innerText = `${option.innerText}: `;
      for (const i of dataTableArray) {
        if (i.type === option.innerText) {
          summation += Math.floor(i.amount);
        }
      }
      span.innerText = summation;
      h4.appendChild(span);
      summationElem.sectionParent.appendChild(h4);
    }
  }
  function createNewTr(array) {
    tableElem.divDataElem.innerHTML = '';
    array.forEach((obj) => {
      const tr = document.createElement('tr');
      for(let i in obj) { // eslint-disable-line
        const td = document.createElement('td');
        td.innerText = obj[i];
        td.setAttribute('data-bill-type', i);
        tr.appendChild(td);
      }
      tableElem.divDataElem.appendChild(tr);
    });
  }
  function watchInputsValues() {
    for (const elem in formElem.input) { // eslint-disable-line
      formElem.input[elem].className = '';
      if (!formElem.input[elem].value) {
        formElem.input[elem].className = 'unfilled';
      }
    }
  }
  function sortArray(arr) {
    function strAddition(str) {
      let strCharSummationValue = str[0].charCodeAt();
      for (let char = 1; char < str.length; char += 1) {
        strCharSummationValue += str[char].charCodeAt() / 100;
      }
      return strCharSummationValue;
    }
    function sortArrayUpByName() {
      arr.sort((a, b) => strAddition(a.name) - strAddition(b.name));
    }
    function sortArrayDownByName() {
      arr.sort((a, b) => strAddition(b.name) - strAddition(a.name));
    }
    function sortArrayUpByAmount() {
      arr.sort((a, b) => a.amount - b.amount);
    }
    function sortArrayDownByAmount() {
      arr.sort((a, b) => b.amount - b.amount);
    }
    function sortArrayUpByType() {
      arr.sort((a, b) => a.name.charCodeAt() - b.name.charCodeAt());
    }
    function sortArrayDownByType() {
      arr.sort((a, b) => b.name.charCodeAt() - a.name.charCodeAt());
    }
    return {
      upByName: sortArrayUpByName,
      downByName: sortArrayDownByName,
      upByAmount: sortArrayUpByAmount,
      downByAmount: sortArrayDownByAmount,
      upByType: sortArrayUpByType,
      downByType: sortArrayDownByType,
    };
  }
  function resetForm() {
    formElem.input.NameElem.value = '';
    formElem.input.AmountElem.value = '';
    formElem.input.DateElem.value = '';
    formElem.input.TypeElem.value = '';
  }
  function saveFormToObj(e) {
    e.preventDefault();
    if (!(formElem.input.AmountElem.value
      && formElem.input.NameElem.value
      && formElem.input.TypeElem.value
      && formElem.input.DateElem.value)) {
      // change class to unfilled if necessary
      watchInputsValues();
    } else {
      watchInputsValues();
      dataTableArray.push({
        name: formElem.input.NameElem.value,
        type: formElem.input.TypeElem.value,
        date: formElem.input.DateElem.value,
        amount: formElem.input.AmountElem.value,
      });
      resetForm();
      // sort array first
      sortArray(dataTableArray).upByName();
      createNewTr(dataTableArray);
      updateSummation();
    }
  }
  formElem.buttonSaveElem.addEventListener('click', saveFormToObj);
  formElem.buttonResetElem.addEventListener('click', resetForm);
}());

/**
 *
  -----Evaluations
  -- The programs includes the 3 sections; form, table and total
  -- The form validates the required inputs
  -- The form submits and adds a new bill item
  -- The form reset button works
  -- The form automatically resets itself after submitting
  -- The table display correctly all the bills
  -- The table sort by name, type and amount
  The sort is reversed for each sortable field
  -- The total is correctly calculated and update when new bills are added
  -----Technical Requirements:
  -- IIFE (Immediately Invoked Function Expression) is used
  -- Named functions are used on event handler
  -- DOM is created programmatically for the table and total sections
  -- Event listeners are added programmatically using JavaScript DOM API
  -- Data is saved on an Array and manipulated using Array methods
  -- Each bill is saved as an Object
 * ...
*/
