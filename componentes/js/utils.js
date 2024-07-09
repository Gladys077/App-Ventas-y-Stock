
export function isValidDate(dateString) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(dateString)) return false;
    const [, day, month, year] = dateString.match(regex);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() == year && (date.getMonth() + 1) == parseInt(month) && date.getDate() == parseInt(day);
};

export function formatDateInput(e) {
    let input = e.target;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    let formattedValue = '';
    
    if (value.length > 0) {
        let day = value.slice(0, 2);
        if (parseInt(day) > 31) day = '31';
        formattedValue += day;
    }
    if (value.length > 2) {
        let month = value.slice(2, 4);
        if (parseInt(month) > 12) month = '12';
        formattedValue += '/' + month;
    }
    if (value.length > 4) {
        formattedValue += '/' + value.slice(4, 8);
    }
    
    input.value = formattedValue;
}