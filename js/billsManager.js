(function () {
  let sortDirection = true;
  const dataTableArray = [];
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
      for(let i in obj) {
        const td = document.createElement('td');
        td.innerText = obj[i];
        td.setAttribute('data-bill-type', i);
        tr.appendChild(td);
      }
      tableObj.divDataElem.appendChild(tr);
    });
  }
  function watchInputsValues() {
    for (const elem in formObj.input) {
      formObj.input[elem].className = '';
      if (!formObj.input[elem].value) {
        formObj.input[elem].className = 'unfilled';
      }0
    }
  }
  function sortArray(array) {
    function sortArrayUpByName() {
      array.sort((a, b) => b.name.localeCompare(a.name));
    }
    function sortArrayDownByName() {
      array.sort((a, b) => a.name.localeCompare(b.name));
    }
    function sortArrayUpByAmount() {
      array.sort((a, b) => Math.floor(a.amount) - Math.floor(b.amount));
    }
    function sortArrayDownByAmount() {
      array.sort((a, b) => Math.floor(b.amount) - Math.floor(a.amount));
    }
    function sortArrayUpByType() {
      array.sort((a, b) => a.type.localeCompare(b.type));
    }
    function sortArrayDownByType() {
      array.sort((a, b) => b.type.localeCompare(a.type));
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
        amount: Math.abs(formObj.input.AmountElem.value),
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
