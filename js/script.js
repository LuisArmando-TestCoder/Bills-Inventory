(function () {
  let sortDirection = true;
  let dataTableArray = []; // eslint-disable-line
  // wanna keep it non const
  // to say be an empty [] if necessary
  const formObj = {
    input: {
      NameElem: document.getElementById('billForm__name'),
      AmountElem: document.getElementById('billForm__amount'),
      DateElem: document.getElementById('billForm__date'),
      TypeElem: document.getElementById('billForm__type'),
    },
    buttonResetElem: document.getElementById('billForm__reset'),
    buttonSaveElem: document.getElementById('billForm__save'),
  };
  const tableObj = {
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
    for (const option of formObj.input.TypeElem.children) {
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
    tableObj.divDataElem.innerHTML = '';
    array.forEach((obj) => {
      const tr = document.createElement('tr');
      for(let i in obj) { // eslint-disable-line
        const td = document.createElement('td');
        td.innerText = obj[i];
        td.setAttribute('data-bill-type', i);
        tr.appendChild(td);
      }
      tableObj.divDataElem.appendChild(tr);
    });
  }
  function watchInputsValues() {
    for (const elem in formObj.input) { // eslint-disable-line
      formObj.input[elem].className = '';
      if (!formObj.input[elem].value) {
        formObj.input[elem].className = 'unfilled';
      }
    }
  }
  function sortArray(array) {
    function strAddition(str) {
      let strCharSummationValue = str[0].charCodeAt();
      for (let char = 1; char < str.length; char += 1) {
        strCharSummationValue += str[char].charCodeAt() / 100;
      }
      return strCharSummationValue;
    }
    function sortArrayUpByName() {
      array.sort((a, b) => strAddition(a.name) - strAddition(b.name));
    }
    function sortArrayDownByName() {
      array.sort((a, b) => strAddition(b.name) - strAddition(a.name));
    }
    function sortArrayUpByAmount() {
      array.sort((a, b) => Math.floor(a.amount) - Math.floor(b.amount));
    }
    function sortArrayDownByAmount() {
      array.sort((a, b) => Math.floor(b.amount) - Math.floor(a.amount));
    }
    function sortArrayUpByType() {
      array.sort((a, b) => a.name.charCodeAt() - b.name.charCodeAt());
    }
    function sortArrayDownByType() {
      array.sort((a, b) => b.name.charCodeAt() - a.name.charCodeAt());
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
  function sortTable(str) {
    function sortBy() {
      sortDirection = !sortDirection;
      if (sortDirection) {
        sortArray(dataTableArray)[`up${str}`]();
      } else {
        sortArray(dataTableArray)[`down${str}`]();
      }
      createNewTr(dataTableArray);
    }
    return {
      by: sortBy,
    };
  }
  function resetForm() {
    formObj.input.NameElem.value = '';
    formObj.input.AmountElem.value = '';
    formObj.input.DateElem.value = '';
    formObj.input.TypeElem.value = '';
  }
  function saveFormToObj(e) {
    e.preventDefault();
    if (!(formObj.input.AmountElem.value
      && formObj.input.NameElem.value
      && formObj.input.TypeElem.value
      && formObj.input.DateElem.value)) {
      // change class to unfilled if necessary
      watchInputsValues();
    } else {
      watchInputsValues();
      dataTableArray.push({
        name: formObj.input.NameElem.value,
        type: formObj.input.TypeElem.value,
        date: formObj.input.DateElem.value,
        amount: formObj.input.AmountElem.value,
      });
      resetForm();
      // sort array first
      sortArray(dataTableArray).upByName();
      createNewTr(dataTableArray);
      updateSummation();
    }
  }
  formObj.buttonSaveElem.addEventListener('click', saveFormToObj);
  formObj.buttonResetElem.addEventListener('click', resetForm);
  tableObj.buttonNameElem.addEventListener('click', sortTable('ByName').by);
  tableObj.buttonTypeElem.addEventListener('click', sortTable('ByType').by);
  tableObj.buttonAmountElem.addEventListener('click', sortTable('ByAmount').by);
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
  -- The sort is reversed for each sortable field
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
