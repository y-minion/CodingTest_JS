const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// let input = `abc\n9\nL\nL\nL\nL\nL\nP x\nL\nB\nP y`;

// input = input.trim().split("\n");

class Node {
  constructor(data) {
    this.data = data;
    this.prv = null;
    this.nxt = null;
  }
}

class List {
  constructor() {
    const dummy = new Node("");

    this.head = dummy;
    this.pos = this.head; // 커서 위치
  }

  print() {
    let res = "";
    let cur = this.head;
    while (cur) {
      res += cur.data;
      cur = cur.nxt;
    }
    console.log(res);
  }

  moveLft() {
    if (!this.pos.prv) return;
    this.pos = this.pos.prv;
  }

  moveRgt() {
    if (!this.pos.nxt) return;
    this.pos = this.pos.nxt;
  }

  delete() {
    const curNode = this.pos;
    //공백
    if (!curNode.prv) return;

    //끝자리
    if (!curNode.nxt) {
      curNode.prv.nxt = null;
      this.pos = curNode.prv;
      return;
    }
    curNode.prv.nxt = curNode.nxt;
    curNode.nxt.prv = curNode.prv;
    this.pos = curNode.prv;
  }

  add(data) {
    const curNode = this.pos;
    const node = new Node(data);
    //아무 것도 없을떄,커서가 끝자리일경우
    if ((!curNode.prv && !curNode.nxt) || !curNode.nxt) {
      curNode.nxt = node;
      node.prv = curNode;
    } else {
      node.nxt = curNode.nxt;
      node.prv = curNode;

      curNode.nxt.prv = node;
      curNode.nxt = node;
    }
    this.pos = node;
    return;
  }

  init(str) {
    if (!str) return;
    [...str].forEach((char) => {
      this.add(char);
    });
  }
}

function sol(input) {
  const list = new List();
  const str = input[0];
  list.init(str);

  input.forEach((el, idx) => {
    if (idx < 2) return;
    if (el === "L") {
      list.moveLft();
    } else if (el === "D") {
      list.moveRgt();
    } else if (el === "B") {
      list.delete();
    } else {
      const [_, char] = el.split(" ");
      list.add(char);
    }
  });

  list.print();
}

sol(input);
