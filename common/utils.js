function commonUtils() {
  const utils = {
    addOneHrs: (date, increamentHrs) => {
      return new Date(new Date(date).getTime() + increamentHrs * 3600 * 1000);
    },
    formatDate: (date) => {
      const dateObj = new Date(date);
      return `${dateObj.getFullYear()}-${
        dateObj.getMonth() + 1
      }-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
    },
  };
  return utils;
}

module.exports = commonUtils;
