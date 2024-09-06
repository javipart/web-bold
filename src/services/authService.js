const mockEmail = 'test@bold.co';
const mockPassword = 'b0ld123*';

export const authenticate = (email, password) => {
  return new Promise((resolve, reject) => {
    if (email === mockEmail && password === mockPassword) {
      resolve(true);
    } else {
      reject('Invalid login data');
    }
  });
};
