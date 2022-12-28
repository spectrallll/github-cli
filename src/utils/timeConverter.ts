const timeConverter = (ISOString: string | Date): string => {
  const date = typeof ISOString === "string" ? new Date(ISOString) : ISOString;
  const arr = date.toDateString().split(" ");
  return `${arr[2]} ${arr[1]} ${arr[3]}`;
};

export default timeConverter;
