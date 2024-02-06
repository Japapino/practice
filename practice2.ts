class MinStack {
  stack: number[];
  minStack: number[];

  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val: number): void {
    this.stack.push(val);

    if (
      this.minStack.length == 0 ||
      this.minStack[this.minStack.length - 1] >= val
    ) {
      this.minStack.push(val);
    }
  }

  pop(): void {
    const top = this.stack.pop();
    if (top === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}

function groupAnagrams(strs: string[]): string[][] {
  let table = new Map<string, string[]>();

  strs.forEach((s: string) => {
    let sortedWord: string = s.split("").sort().join("");

    if (!table[sortedWord]) {
      table[sortedWord] = [s];
    } else {
      table[sortedWord].push(s);
    } 

  });

  return Object.values(table);
}
