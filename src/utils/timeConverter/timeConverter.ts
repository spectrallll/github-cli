const timeConverter = (ISOString: string): string => {
  const date = new Date(ISOString);
  const arr = date.toDateString().split(" ");
  return `${arr[2]} ${arr[1]} ${arr[3]}`;
};

export default timeConverter;
