export function loadFromLocalStorage() {
    try {
      const serialisedCount = localStorage.getItem("runnerJoiningRunCount");
      if (serialisedCount === null) return undefined;
      let dataFromLocalStorage = JSON.parse(serialisedCount);
      return dataFromLocalStorage;
    } catch (e) {
      console.warn(e);
      return undefined;
    }
}

export function saveToLocalStorage(count) {
  try {
    const serialisedCount = JSON.stringify(count);
    localStorage.setItem("runnerJoiningRunCount", serialisedCount);
  } catch (e) {
    console.warn(e);
  }
}