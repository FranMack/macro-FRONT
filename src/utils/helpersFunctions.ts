export function hideEmail(email: string) {
  if (email.length > 3) {
    const array = email.split("@");
    const user = array[0];
    const domain = "@" + array[1];
    const hideEmail = `${user.slice(0, 3)}***********${domain}`;
    return hideEmail;
  }

  if (email.length < 3 && email.length > 0) {
    const array = email.split("@");
    const user = array[0];
    const domain = array[1];
    const hideEmail = `${user.slice(0, 1)}***********${domain}`;
    return hideEmail;
  }
}
