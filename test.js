const { myForm } = document.forms;

myForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('.email');
    const phone = document.querySelector('.phone');

    const regExpEmail = /^[^@]+@[^.]+\.[a-zA-z]+$/g
    const regExpPhone = /^\+?[7,8]\([1-9]{3}\) [1-9]{3} [1-9]{2}-[1-9]{2}$/g;

    const isValidEmail = regExpEmail.test(email.value);
    const isValidPhone = regExpPhone.test(phone.value);

    if (!isValidEmail) {
        myForm.append('Неправильно введен email');
    }

    if (!isValidPhone) {
        myForm.append('Неправильно введен номер телефона');
    }
})
