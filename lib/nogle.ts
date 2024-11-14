const getGSheet = async (spreadsheetId: string, sheetId: string) => {
  const response = await fetch(
    `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&id=${spreadsheetId}&gid=${sheetId}`,
  );

  const data = await response.text();

  const rows = data.split("\n").map((row) => row.split(","));
  const [header, ...rowsWithoutHeader] = rows;

  return rowsWithoutHeader;
};

export { getGSheet };