export const generateCode = () => {
  const mainString =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let code = "";

  for (let i = 0; i < 6; i++) {
    let randomIndex = Math.floor(Math.random() * mainString.length);
    code += mainString[randomIndex];
  }

  return code;
};
