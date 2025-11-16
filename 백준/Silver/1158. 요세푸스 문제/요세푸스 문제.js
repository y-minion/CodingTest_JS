const fs = require("fs");

let [N, K] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => Number(el));

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class RotateList {
  constructor() {
    this.head = null;
    this.curNode = null;
    this.movedArr = [];
    this.size = 0;
  }

  add(data) {
    const newNode = new Node(data);

    //리스트 비어있을경우
    if (!this.head) {
      this.head = newNode;
    } else if (!this.curNode.next) {
      newNode.prev = this.curNode;
      this.curNode.next = newNode;
    } else {
      newNode.prev = this.curNode;
      newNode.next = this.curNode.next;

      this.curNode.next.prev = newNode;
      this.curNode.next = newNode;
    }

    this.curNode = newNode;
    this.size++;
  }

  delete() {
    this.movedArr.push(this.curNode.data);
    if (this.size === 1) {
      this.head = null;
    } else {
      this.curNode.prev.next = this.curNode.next;
      this.curNode.next.prev = this.curNode.prev;
      this.curNode = this.curNode.next;
    }
    this.size--;
  }

  init(number) {
    const arr = Array.from({ length: number }, (_, i) => i + 1);

    arr.forEach((num) => {
      this.add(num);
      if (num === number) {
        this.curNode.next = this.head; //원형 연결
        this.head.prev = this.curNode;
      }
    });
  }

  move(k) {
    let count = 1;
    while (count < k) {
      this.curNode = this.curNode.next;
      count++;
    }
  }

  printMoved() {
    console.log(`<${this.movedArr.join(", ")}>`);
  }
}

function sol(n, k) {
  const rotateList = new RotateList();

  //리스트 초기화
  rotateList.init(n);

  rotateList.curNode = rotateList.head; //curNode초기화

  while (rotateList.size > 0) {
    rotateList.move(k);
    rotateList.delete();
  }
  rotateList.printMoved();
}

sol(N, K);
