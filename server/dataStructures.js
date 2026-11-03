/**
 * Data Structures Implementation Module for HumanNet
 * 
 * 1. Arrays: Skill Catalog collection & vectorized search indices
 * 2. Queues (FIFO): Learning requests processing buffer
 * 3. Stacks (LIFO): Undo / Redo operations history for actions
 * 4. Linked Lists: Direct sequence traversal of active mentorship chains
 * 5. Recursion: Hierarchical tree navigation & filtering of category taxonomies
 */

// 1. STACK: LIFO structure for user action undo
class UndoStack {
  constructor(limit = 20) {
    this.stack = [];
    this.limit = limit;
  }

  push(action) {
    if (this.stack.length >= this.limit) {
      this.stack.shift();
    }
    this.stack.push({
      ...action,
      timestamp: new Date().toISOString()
    });
  }

  pop() {
    return this.stack.pop() || null;
  }

  peek() {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
  }

  size() {
    return this.stack.length;
  }

  toArray() {
    return [...this.stack].reverse();
  }
}

// 2. QUEUE: FIFO structure for incoming learning requests
class RequestQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(request) {
    this.queue.push({
      ...request,
      enqueuedAt: new Date().toISOString()
    });
  }

  dequeue() {
    return this.queue.shift() || null;
  }

  peek() {
    return this.queue.length > 0 ? this.queue[0] : null;
  }

  size() {
    return this.queue.length;
  }

  getAll() {
    return [...this.queue];
  }
}

// 3. LINKED LIST: Chain of mentorship nodes
class ConnectionNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class ConnectionLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(data) {
    const newNode = new ConnectionNode(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = newNode;
    }
    this.size++;
  }

  toArray() {
    const result = [];
    let curr = this.head;
    while (curr) {
      result.push(curr.data);
      curr = curr.next;
    }
    return result;
  }

  fromArray(arr) {
    this.head = null;
    this.size = 0;
    arr.forEach(item => this.append(item));
    return this;
  }
}

// 4. RECURSION: Category Tree Navigation
function traverseCategoryTree(node, targetId = null, collector = []) {
  if (!node) return null;

  // Visit current node
  collector.push({
    id: node.id,
    name: node.name,
    badge: node.badge || null,
    count: node.count || 0
  });

  if (targetId && node.id === targetId) {
    return node;
  }

  // Recursive step over children
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      const found = traverseCategoryTree(child, targetId, collector);
      if (targetId && found) return found;
    }
  }

  return targetId ? null : collector;
}

function countTotalSkillsRecursive(node) {
  if (!node) return 0;
  let count = node.count || 0;
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      count += countTotalSkillsRecursive(child);
    }
  }
  return count;
}

function filterCategoriesRecursive(node, query) {
  if (!node) return null;
  const q = query.toLowerCase();
  const isMatch = node.name.toLowerCase().includes(q);

  let filteredChildren = [];
  if (node.children && node.children.length > 0) {
    filteredChildren = node.children
      .map(child => filterCategoriesRecursive(child, q))
      .filter(Boolean);
  }

  if (isMatch || filteredChildren.length > 0) {
    return {
      ...node,
      children: filteredChildren.length > 0 ? filteredChildren : undefined
    };
  }

  return null;
}

module.exports = {
  UndoStack,
  RequestQueue,
  ConnectionLinkedList,
  traverseCategoryTree,
  countTotalSkillsRecursive,
  filterCategoriesRecursive
};
