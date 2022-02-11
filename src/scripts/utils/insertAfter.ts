export const insertAfter = (newNode: Node, existingNode: Node): void => {
  const parentNode = existingNode.parentNode;
  if (parentNode) parentNode.insertBefore(newNode, existingNode.nextSibling);
};
