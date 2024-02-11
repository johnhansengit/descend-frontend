export const ft2cm = (feet, inches) => {
    return Math.round((feet * 30.48) + (inches * 2.54));
};

export const cm2ft = (cm) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
};

export const ft2m = (feet) => {
    return Math.round(feet * 0.3048);
}

export const m2ft = (m) => {
    return Math.round(m / 0.3048);
}

export const lbs2kg = (lbs) => {
    return Math.round(lbs * 0.453592);
}

export const kg2lbs = (kg) => {
    return Math.round(kg / 0.453592);
}

export const bar2psi = (bar) => {
    return Math.round(bar * 14.5038);
}

export const psi2bar = (psi) => {
    return Math.round(psi / 14.5038);
}

export const C2F = (celsius) => {
    return Math.round(celsius * 9/5 + 32);
}

export const F2C = (fahrenheit) => {
    return Math.round((fahrenheit - 32) * 5/9);
}