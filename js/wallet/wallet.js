

function round_to(precision, value) {
    /* https://explorer.duinocoin.com */
    power_of_ten = 10 ** precision;
    return Math.round(value * power_of_ten) / power_of_ten;
};

function scientific_prefix(value) {
    value = parseFloat(value);
    if (value / 1000000000 > 0.5)
        value = round_to(2, value / 1000000000) + " G";
    else if (value / 1000000 > 0.5)
        value = round_to(2, value / 1000000) + " M";
    else if (value / 1000 > 0.5)
        value = round_to(2, value / 1000) + " k";
    else
        value = round_to(2, value) + " ";
    return value;
};
