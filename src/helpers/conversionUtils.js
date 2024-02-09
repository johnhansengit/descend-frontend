const ft2cm = (feet, inches) => {
    return Math.round((feet * 30.48) + (inches * 2.54));
};

const cm2ft = (cm) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
};

const ft2m = (feet) => {
    return Math.round(feet * 0.3048);
}

const m2ft = (m) => {
    return Math.round(m / 0.3048);
}

const lbs2kg = (lbs) => {
    return Math.round(lbs * 0.453592);
}

const kg2lbs = (kg) => {
    return Math.round(kg / 0.453592);
}

const bar2psi = (bar) => {
    return Math.round(bar * 14.5038);
}

const psi2bar = (psi) => {
    return Math.round(psi / 14.5038);
}

export {
    ft2cm,
    cm2ft,
    ft2m,
    m2ft,
    lbs2kg,
    kg2lbs,
    bar2psi,
    psi2bar
}
