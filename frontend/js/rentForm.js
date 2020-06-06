import $ from 'jquery';

const RentForm = () => {
  const form = document.getElementById('rentForm');
  const rentModal = document.getElementById('rentModal');

  const rentModalSubmit = document.getElementById('rentModalSubmit');
  
  const rentFormOrgName = document.getElementById('rentFormOrgName');
  const rentFormINN = document.getElementById('rentFormINN');
  const rentFormName = document.getElementById('rentFormName');
  const rentFormEmail = document.getElementById('rentFormEmail');
  const rentFormPhone = document.getElementById('rentFormPhone');
  const rentFormComments = document.getElementById('rentFormComments');
  const rentFormMailOnly = document.getElementById('rentFormMailOnly');

  const allFormElements = [
    rentFormOrgName,
    rentFormINN,
    rentFormName,
    rentFormEmail,
    rentFormPhone,
  ];

  allFormElements.forEach(elem => {
    elem.addEventListener('change', function() {
      this.classList.add('dirty');
    })
    elem.addEventListener('keydown', function() {
      this.classList.remove('dirty');
    });
  });


  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  form.addEventListener('change', checkAllFields);

  function checkAllFields() {
    checkOrgName();
    checkINN();
    checkFIO();
    checkEmail();
    checkPhone();
  }

  function checkOrgName() {
    const dirty = rentFormOrgName.classList.contains('dirty');
    const value = rentFormOrgName.value;
    const fio = rentFormName.value;
    const method = dirty && !value && !fio ? 'add' : 'remove';
    rentFormOrgName.classList[method]('error');
  }

  function checkINN() {
    const dirty = rentFormINN.classList.contains('dirty');
    const value = rentFormINN.value;
    const valid = value ? value.match(/^\d+$/i) : true;
    const method = dirty && !valid ? 'add' : 'remove';
    rentFormINN.classList[method]('error');
  }

  function checkFIO() {
    const dirty = rentFormName.classList.contains('dirty');
    const value = rentFormName.value;
    const orgname = rentFormOrgName.value;
    const valid = value ? value.match(/^[А-Яа-яЁёa-zA-z\s-\(\)]+$/i) : false;
    const method = dirty && !valid && !orgname ? 'add' : 'remove';
    rentFormName.classList[method]('error');
  }

  function checkEmail() {
    const dirty = rentFormEmail.classList.contains('dirty');
    const value = rentFormEmail.value;
    const valid = value ? validateEmail(value) : false;
    const method = dirty && !valid ? 'add' : 'remove';
    rentFormEmail.classList[method]('error');
  }
  
  function checkPhone() {
    const dirty = rentFormPhone.classList.contains('dirty');
    const value = rentFormPhone.value;
    const valid = value ? value.match(/^[\d\s\+\-\(\)]+$/i) : false;
    const method = dirty && !valid ? 'add' : 'remove';
    rentFormPhone.classList[method]('error');
  }


  function sanitize(value) {
    if (!value) return '';
    return value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  rentModalSubmit.addEventListener('click', function() {
    allFormElements.forEach(elem => {
      elem.classList.add('dirty');
    });
    checkAllFields();
    const errors = form.getElementsByClassName('error');

    const data = {
      orgName: sanitize(rentFormOrgName.value),
      inn: rentFormINN.value,
      fizName: rentFormName.value,
      email: rentFormEmail.value.toLowerCase(),
      phone: rentFormPhone.value,
      comments: sanitize(rentFormComments.value),
      mailOnly: rentFormMailOnly.checked,
    }

    if (!errors.length) submitForm(data);
  });

  async function submitForm(data) {
    rentModalSubmit.setAttribute('disabled', 'disabled');

    const SUBMIT_URL = '/api/rent';
    const myHeaders = new Headers();
    const fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: myHeaders,
    };

    myHeaders.append('Content-Type', 'application/json');

    try {
      const response = await fetch(SUBMIT_URL, fetchData);
      if (response.status !== 200) throw new Error();
      rentModal.classList.add('success');
    } catch (err) {
      console.log('SAVE RENT ERROR: ', err);
      rentModal.classList.add('failed');
    }
  }

  $('#rentModal').on('hidden.bs.modal', function () {
    rentModalSubmit.removeAttribute('disabled');
    rentModal.classList.remove('success', 'failed');
    form.reset();
    allFormElements.forEach(elem => {
      elem.classList.remove('error', 'dirty');
    });
  })

};

export default RentForm;