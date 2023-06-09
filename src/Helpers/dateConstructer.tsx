export const dateConstructer = (rawdate: any) => {
  let dateObj = new Date(rawdate);
  let options: any = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  let date = dateObj.toLocaleDateString('en-US', options);
  return date;
};
