interface Action {
  label: string;
  timestamp: number;
}

export function debugDelayInit() {
  let timeoutId: null | NodeJS.Timeout = null;
  let actions: Action[] = [];

  return {
    add(label: string, log = true) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      const timestamp = new Date().getTime();
      if (log) {
        const lastAction = actions[actions.length - 1];
        if (lastAction) {
          const diff = timestamp - lastAction.timestamp;
          console.log(`${label} --- DELAY AFTER LAST ACTION --- ${lastAction.label}:${diff}`);
        } else console.log('FIRST ACTION ---', label);
      }
      actions.push({ label, timestamp });
      timeoutId = setTimeout(() => {
        this.clear();
      }, 3000);
    },
    clear() {
      actions = [];
    },
    actions() {
      return actions;
    },
  };
}

export const debugDelay = debugDelayInit();
