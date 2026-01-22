const formattedDate = (date: string, location = 'en-US') => {
  return new Date(date).toLocaleDateString(location, {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

export default formattedDate;