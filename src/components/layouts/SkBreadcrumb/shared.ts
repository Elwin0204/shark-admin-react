function copyMenuChildren(menu: App.Menu): App.Menu[] {
  if (!menu.children) return [];

  return menu.children.map(child => {
    const newChild = { ...child };

    // 如果子节点有 children，则递归处理并重命名属性
    if (child.children) {
      newChild._children = copyMenuChildren(child);
      delete newChild.children; // 移除原来的 children 属性
    }

    return newChild;
  });
}

function copyMenuWithOneLevelChildren(menu: App.Menu): App.Menu {
  const newMenu = { ...menu };
  if (menu.children) {
    newMenu.children = menu.children.map(child => {
      const { children: _, ...rest } = child;
      return { ...rest };
    });
    newMenu._children = copyMenuChildren(menu);
  }
  return newMenu;
}

function findMenuItem(pathname: string, menus: App.Menu[], breadcrumbs: App.Menu[]) {
  for (const item of menus) {
    if (pathname.startsWith(item.key)) {
      // 使用辅助函数拷贝对象以避免修改原始数据，并且只保留一层 children
      const newItem = copyMenuWithOneLevelChildren(item);
      breadcrumbs.push(newItem);

      // 如果完全匹配或者还有子路径，则继续查找子菜单
      if (pathname === item.key || item.children && pathname !== item.key) {
        if (item.children) {
          findMenuItem(pathname, item.children, breadcrumbs);
        }
        return;
      }
    } else if (item.children) {
      // 如果当前项没有匹配但有子菜单，尝试在子菜单中查找
      findMenuItem(pathname, item.children, breadcrumbs);
    }
  }
}

export function getBreadcrumbs(pathname: string, menus: App.Menu[]): App.Menu[] {
  const breadcrumbs: App.Menu[] = [];

  // 开始查找并构建面包屑
  findMenuItem(pathname, menus, breadcrumbs);

  return breadcrumbs;
}

export function findLastLevelKey(key: string, breadcrumbs: App.Menu[]): string | null {
  // 辅助函数：递归查找最后一层第一个子节点的 key
  function getLastLevelFirstChildKey(menuItem: App.Menu): string | null {
    if (!menuItem._children || menuItem._children.length === 0) {
      // 如果没有 _children 或者 _children 为空，返回当前项的 key
      return menuItem.key;
    }
    // 否则，返回第一项 _children 的最后一层第一个子节点的 key
    return getLastLevelFirstChildKey(menuItem._children[0]);
  }

  // 辅助函数：递归查找与 key 匹配的节点
  function findMatchingNode(breadcrumbs: App.Menu[]): App.Menu | null {
    for (const breadcrumb of breadcrumbs) {
      if (breadcrumb.key === key) {
        // 找到匹配的节点后，返回它
        return breadcrumb;
      }
      if (breadcrumb._children && breadcrumb._children.length > 0) {
        // 如果有 _children 并且不为空，尝试在 _children 中查找
        const foundNode = findMatchingNode(breadcrumb._children);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null;
  }

  // 首先查找与 key 匹配的节点
  const matchingNode = findMatchingNode(breadcrumbs);

  if (matchingNode) {
    // 如果找到了匹配的节点，获取最后一层第一个子节点的 key
    return getLastLevelFirstChildKey(matchingNode);
  } else {
    // 如果没有找到匹配的 key，返回 null
    return null;
  }
}