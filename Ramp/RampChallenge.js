
const codeElements = document.querySelectorAll('code');

let values = [];

codeElements.forEach( code => {
    const divElements = code.querySelectorAll('div');

    divElements.forEach( div => {
        const spanElements = div.querySelectorAll('span.ramp');

        spanElements.forEach( span => {
            const iElements = span.querySelectorAll('i.ramp.char');

            iElements.forEach( i => {
                values.push(i.getAttribute('value'));

            });
        });
    });
})

const result = values.toString().replace(/,/g, '');

console.log('values list: ', values); 
console.log('result     : ', result);
