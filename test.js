рекурсия

let i = 3
function test(i) {
    i = i - 1;
    console.log(i);
    if (i === 0) return i; // Базовый случай 
    return test(i);
}


test(i);

function factorial(n) {
    // Базовый случай
    if (n === 0 || n === 1) {
        return 2;
    }
    // Рекурсивный случай
    return n * factorial(n - 1);
 }
//  console.log(factorial(5)); // Результат: 120

function factorial(n) {
    
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1
    const arr = [0, 1];
    for(let i = 2; i <= n; i += 1) {
        result *= i;
    }
    return result;

}

console.log(factorial(5))

function fibCycle(n) {
    
    if (n === 0) return 0
    if (n === 1) return 1;

    const arr = [0, 1, 1];
    // ind 0 1 2 3 4 5 6 7  8  9  10
    // fib 0 1 1 2 3 5 8 13 21 34 55

    for(let i = 3; i <= n; i += 1) {

        arr[i] = arr[i - 1] + arr[i - 2];

    }

    return arr[n];
}

function fibReg(n) {

    if (n === 0) return 0
    if (n === 1) return 1;

    return fibReg(n - 1) + fibReg(n - 2); // бинарного дерева

}];
O(n2)



console.log(fibReg(10))


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
