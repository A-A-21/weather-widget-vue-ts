function getItemLocalStorage(itemName: string): string[] | [] {
  const storagesItem: string | null = localStorage.getItem(itemName);
  if (!storagesItem) return [];
  const state = JSON.parse(storagesItem);
  return state;
}

function setItemLocalStorage(itemName: string, payload: string[]): void {
  localStorage.setItem(itemName, JSON.stringify(payload));
}

export {
  getItemLocalStorage, setItemLocalStorage,
};
