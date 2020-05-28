import $ from 'jquery';

const CoopForm = () => {
  const form = document.getElementById('coopForm');
  const coopModal = document.getElementById('coopModal');

  const coopModalSubmit = document.getElementById('coopModalSubmit');
  const coopFormOrgName = document.getElementById('coopFormOrgName');
  
  const coopFormINN = document.getElementById('coopFormINN');
  const coopFormName = document.getElementById('coopFormName');
  const coopFormEmail = document.getElementById('coopFormEmail');
  const coopFormPhone = document.getElementById('coopFormPhone');
  const coopFormVolume = document.getElementById('coopFormVolume');
  const coopFormTerm = document.getElementById('coopFormTerm');
  const coopFormComments = document.getElementById('coopFormComments');
  const coopFormMailOnly = document.getElementById('coopFormMailOnly');
  const coopFormOrgOnly = document.getElementById('coopFormOrgOnly');

  const allFormElements = [
    coopFormOrgName,
    coopFormINN,
    coopFormName,
    coopFormEmail,
    coopFormPhone,
    coopFormVolume,
    coopFormTerm,
  ];

  allFormElements.forEach(elem => {
    elem.addEventListener('change', function() {
      this.classList.add('dirty');
    })
    elem.addEventListener('keydown', function() {
      this.classList.remove('dirty');
    });
  });

  const today = new Date().toISOString().split('T')[0];
  coopFormTerm.setAttribute('min', today);

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
    checkVolume();
    checkDate();
  }

  function checkOrgName() {
    const dirty = coopFormOrgName.classList.contains('dirty');
    const value = coopFormOrgName.value;
    const fio = coopFormName.value;
    const method = dirty && !value && !fio ? 'add' : 'remove';
    coopFormOrgName.classList[method]('error');
  }

  function checkINN() {
    const dirty = coopFormINN.classList.contains('dirty');
    const value = coopFormINN.value;
    const valid = value ? value.match(/^\d+$/i) : true;
    const method = dirty && !valid ? 'add' : 'remove';
    coopFormINN.classList[method]('error');
  }

  function checkFIO() {
    const dirty = coopFormName.classList.contains('dirty');
    const value = coopFormName.value;
    const orgname = coopFormOrgName.value;
    const valid = value ? value.match(/^[А-Яа-яЁёa-zA-z\s-\(\)]+$/i) : false;
    const method = dirty && !valid && !orgname ? 'add' : 'remove';
    coopFormName.classList[method]('error');
  }

  function checkEmail() {
    const dirty = coopFormEmail.classList.contains('dirty');
    const value = coopFormEmail.value;
    const valid = value ? validateEmail(value) : false;
    const method = dirty && !valid ? 'add' : 'remove';
    coopFormEmail.classList[method]('error');
  }
  
  function checkPhone() {
    const dirty = coopFormPhone.classList.contains('dirty');
    const value = coopFormPhone.value;
    const valid = value ? value.match(/^[\d\s\+\-\(\)]+$/i) : false;
    const method = dirty && !valid ? 'add' : 'remove';
    coopFormPhone.classList[method]('error');
  }

  function checkVolume() {
    const dirty = coopFormVolume.classList.contains('dirty');
    const value = coopFormVolume.value;
    const valid = value ? value.match(/^\d+$/i) : false;
    const method = dirty && !valid ? 'add' : 'remove';
    coopFormVolume.classList[method]('error');
  }

  function checkDate() {
    const dirty = coopFormTerm.classList.contains('dirty');
    const value = coopFormTerm.value;
    const method = dirty && !value ? 'add' : 'remove';
    coopFormTerm.classList[method]('error');
  }

  function sanitize(value) {
    if (!value) return '';
    return value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  coopModalSubmit.addEventListener('click', function() {
    allFormElements.forEach(elem => {
      elem.classList.add('dirty');
    });
    checkAllFields();
    const errors = form.getElementsByClassName('error');

    const data = {
      bocoArticle: form.dataset.article,
      orgName: sanitize(coopFormOrgName.value),
      inn: coopFormINN.value,
      fizName: coopFormName.value,
      email: coopFormEmail.value.toLowerCase(),
      phone: coopFormPhone.value,
      amount: coopFormVolume.value,
      dateTo: getExpiresDate(coopFormTerm.value),
      comments: sanitize(coopFormComments.value),
      mailOnly: coopFormMailOnly.checked,
      orgOnly: coopFormOrgOnly.checked,
    }

    if (!errors.length) submitForm(data);
  });

  async function submitForm(data) {
    coopModalSubmit.setAttribute('disabled', 'disabled');

    const SUBMIT_URL = '/api/cooperations';
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
      coopModal.classList.add('success');
    } catch (err) {
      console.log('SAVE SUPPLY ERROR: ', err);
      coopModal.classList.add('failed');
    }
  }

  $('#coopModal').on('hidden.bs.modal', function () {
    coopModalSubmit.removeAttribute('disabled');
    coopModal.classList.remove('success', 'failed');
    form.reset();
    allFormElements.forEach(elem => {
      elem.classList.remove('error', 'dirty');
    });
  })

  function getExpiresDate(date) {
    var newdate = new Date(date);
    newdate.setDate(newdate.getDate() + 1);
    let dd = newdate.getDate(); 
    let mm = newdate.getMonth() + 1; 
    let yyyy = newdate.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return `${yyyy}-${mm}-${dd}`;
  }
};

export default CoopForm;