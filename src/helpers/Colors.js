const colors = [
    { name: "red", hexCode: "#f7a4a4" },
    { name: "yellow", hexCode: "#fffbc1" },
    { name: "blue", hexCode: "#b8e8fc" },
    { name: "green", hexCode: "#b6e2a1" },
    { name: "purple", hexCode: "#b1afff" },
];

export const getRandColor = () => {
    const min = Math.ceil(0);
    const max = Math.floor(colors.length - 1);
    const randIdx = Math.floor(Math.random() * (max - min + 1)) + min;

    return colors[randIdx];
};
